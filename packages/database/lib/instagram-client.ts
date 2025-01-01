interface CacheEntry {
  userId: string;
  timestamp: number;
}

interface InstagramClientConfig {
  /** Maximum number of retries for failed requests */
  maxRetries?: number;
  /** Delay between retries in milliseconds */
  retryDelay?: number;
  /** Cache duration in milliseconds (default: 1 hour) */
  cacheDuration?: number;
  /** Delay between requests in milliseconds (rate limiting) */
  requestDelay?: number;
}

/**
 * Extracts Instagram user ID from the page source of a user's profile
 * @param pageSource The HTML source of the Instagram profile page
 * @returns The user ID if found, null otherwise
 */
function extractUserIdFromPageSource(pageSource: string): string | null {
  try {
    // First try direct regex patterns that might contain the ID
    const directPatterns = [
      /"profile_id":"(\d+)"/,
      /profilePage_(\d+)/,
      /"id":"(\d+)"/,
      /instagram.com\/[^"]+"\s*,\s*"id"\s*:\s*"(\d+)"/,
      /"user_id":"(\d+)"/,
      /"user":{"id":"(\d+)"/,
    ];

    for (const pattern of directPatterns) {
      const match = pageSource.match(pattern);
      if (match) {
        console.log(`Debug: Found ID using pattern: ${pattern}`);
        return match[1];
      }
    }

    // If direct patterns fail, try finding script tags
    const scriptRegex =
      /<script type="application\/json"[^>]*>(.*?)<\/script>/g;
    let scriptMatch: RegExpExecArray | null = scriptRegex.exec(pageSource);

    while (scriptMatch) {
      const jsonContent = scriptMatch[1];
      try {
        const data = JSON.parse(jsonContent);
        console.log(
          'Debug: Parsing JSON content:',
          JSON.stringify(data).substring(0, 200)
        );

        // Look for ID in various JSON structures
        const possiblePaths = [
          data?.require?.[0]?.[2]?.[0]?.page_logging?.params?.profile_id,
          data?.require?.[0]?.[2]?.[0]?.initialRouteInfo?.params?.profile_id,
          data?.require?.[0]?.[2]?.[0]?.props?.user?.id,
          data?.require?.[0]?.[2]?.[0]?.props?.page_logging?.params?.profile_id,
          data?.props?.user?.id,
          data?.data?.user?.id,
          data?.graphql?.user?.id,
        ];

        for (const id of possiblePaths) {
          if (id) {
            console.log('Debug: Found ID in JSON structure');
            return id;
          }
        }
      } catch (error) {
        // Skip invalid JSON
      }
      scriptMatch = scriptRegex.exec(pageSource);
    }

    return null;
  } catch (error) {
    console.error('Error extracting user ID:', error);
    return null;
  }
}

/**
 * Sleep for a specified duration
 * @param ms Duration in milliseconds
 */
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class InstagramClient {
  private readonly baseUrl = 'https://www.instagram.com';
  private readonly cache: Map<string, CacheEntry> = new Map();
  private lastRequestTime = 0;

  private readonly config: Required<InstagramClientConfig>;

  constructor(config: InstagramClientConfig = {}) {
    this.config = {
      maxRetries: config.maxRetries ?? 3,
      retryDelay: config.retryDelay ?? 1000,
      cacheDuration: config.cacheDuration ?? 3600000, // 1 hour
      requestDelay: config.requestDelay ?? 1000, // 1 second
    };
  }

  /**
   * Validate Instagram username
   * @param username Username to validate
   * @throws Error if username is invalid
   */
  private validateUsername(username: string): void {
    if (!username) {
      throw new Error('Username cannot be empty');
    }

    if (username.length > 30) {
      throw new Error('Username is too long (max 30 characters)');
    }

    // Instagram username rules: letters, numbers, periods, and underscores
    if (!/^[a-zA-Z0-9._]{1,30}$/.test(username)) {
      throw new Error('Invalid username format');
    }
  }

  /**
   * Check if a cached result is still valid
   * @param entry Cache entry to check
   * @returns Whether the cache entry is still valid
   */
  private isCacheValid(entry: CacheEntry): boolean {
    const now = Date.now();
    return now - entry.timestamp < this.config.cacheDuration;
  }

  /**
   * Make a request with retry logic and rate limiting
   * @param username Instagram username
   * @returns Response text
   */
  private async makeRequest(username: string): Promise<string> {
    // Apply rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.config.requestDelay) {
      await sleep(this.config.requestDelay - timeSinceLastRequest);
    }

    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/${username}/`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            'Sec-Ch-Ua':
              '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"macOS"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
          },
          redirect: 'follow',
        });

        this.lastRequestTime = Date.now();

        if (!response.ok) {
          throw new Error(`Failed to fetch profile page: ${response.status}`);
        }

        return response.text();
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.config.maxRetries) {
          console.log(
            `Attempt ${attempt} failed, retrying in ${this.config.retryDelay}ms...`
          );
          await sleep(this.config.retryDelay);
        }
      }
    }

    throw lastError || new Error('All retry attempts failed');
  }

  /**
   * Get Instagram user ID from username
   * @param username Instagram username
   * @returns The user ID if found, null otherwise
   */
  async getUserIdFromUsername(username: string): Promise<string | null> {
    try {
      // Validate username
      this.validateUsername(username);

      // Check cache first
      const cached = this.cache.get(username);
      if (cached && this.isCacheValid(cached)) {
        console.log('Debug: Returning cached result');
        return cached.userId;
      }

      const pageSource = await this.makeRequest(username);

      const userId = extractUserIdFromPageSource(pageSource);
      if (userId) {
        // Cache the result
        this.cache.set(username, { userId, timestamp: Date.now() });
      }

      return userId;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      throw error; // Re-throw to let caller handle the error
    }
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    entries: Array<{ username: string; age: number }>;
  } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(
      ([username, entry]) => ({
        username,
        age: now - entry.timestamp,
      })
    );

    return {
      size: this.cache.size,
      entries,
    };
  }
}
