import { InstagramClient } from '../lib/instagram-client';

/**
 * Example of how to use the Instagram client to get user IDs
 */
async function instagramExample() {
  // Initialize the client with custom configuration
  const client = new InstagramClient({
    maxRetries: 3, // Retry failed requests up to 3 times
    retryDelay: 1000, // Wait 1 second between retries
    cacheDuration: 3600000, // Cache results for 1 hour
    requestDelay: 1000, // Wait 1 second between requests
  });

  try {
    // Example 1: Basic usage with validation
    console.log('\nExample 1: Basic usage with validation');
    try {
      const invalidUsername = 'user@name'; // Invalid character @
      await client.getUserIdFromUsername(invalidUsername);
    } catch (error) {
      console.log(
        '✅ Validation caught invalid username:',
        (error as Error).message
      );
    }

    // Example 2: Single user lookup with caching
    const username = 'apple';
    console.log(
      `\nExample 2: Looking up @${username} twice to demonstrate caching`
    );

    console.log('First lookup (will fetch from Instagram):');
    const userId1 = await client.getUserIdFromUsername(username);
    console.log('Result:', { username, userId: userId1 });

    console.log('\nSecond lookup (should use cache):');
    const userId2 = await client.getUserIdFromUsername(username);
    console.log('Result:', { username, userId: userId2 });

    // Example 3: Batch processing with rate limiting
    const usernames = ['my50centamazonfba', 'instagram', 'meta'];
    console.log('\nExample 3: Batch processing with rate limiting');
    console.log(
      'Looking up multiple users (notice the delay between requests):'
    );

    const results = await Promise.all(
      usernames.map(async (username) => {
        try {
          const userId = await client.getUserIdFromUsername(username);
          return { username, userId, success: !!userId };
        } catch (error) {
          return {
            username,
            userId: null,
            success: false,
            error: (error as Error).message,
          };
        }
      })
    );

    for (const result of results) {
      if (result.success) {
        console.log(`✅ @${result.username} -> ${result.userId}`);
      } else {
        console.log(
          `❌ @${result.username} -> Failed: ${result.error || 'No ID found'}`
        );
      }
    }

    // Example 4: Cache statistics
    console.log('\nExample 4: Cache statistics');
    const stats = client.getCacheStats();
    console.log('Cache size:', stats.size);
    console.log('Cached entries:');
    for (const entry of stats.entries) {
      console.log(
        `- @${entry.username} (cached ${Math.round(entry.age / 1000)}s ago)`
      );
    }

    // Example 5: Error handling and retries
    console.log('\nExample 5: Error handling and retries');
    try {
      const nonexistentUser = 'this_user_does_not_exist_12345';
      const result = await client.getUserIdFromUsername(nonexistentUser);
      console.log(
        result ? `Found ID: ${result}` : '❌ User not found (as expected)'
      );
    } catch (error) {
      console.log('❌ Error handled:', (error as Error).message);
    }

    // Clear cache at the end
    console.log('\nClearing cache...');
    client.clearCache();
    console.log('Cache size after clearing:', client.getCacheStats().size);
  } catch (error) {
    console.error('❌ Error in example:', (error as Error).message);
  }
}

// Run the examples
console.log('🚀 Running Instagram Client Examples...');
instagramExample().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
