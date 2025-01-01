import * as fs from 'node:fs';
import * as path from 'node:path';
import { Platform, ServiceCategory, ServiceType } from '@prisma/client';

interface InputService {
  id: string;
  thirdPartyServiceId: number;
  name: string;
  platform: string;
  type: string;
  category: string;
  description: string;
  basePrice: number;
  pricePerUnit: number;
  minQuantity: number;
  maxQuantity: number;
  features: string[];
  quality: string;
  speed: number;
  retention: string;
  startTime: number;
  guaranteeDays: number;
  supportsCancel: boolean;
  supportsRefill: boolean;
  supportsDripFeed: boolean;
  isActive: boolean;
  validCountries: string[];
  source?: string;
}

interface RootData {
  OTHER: InputService[];
  INSTAGRAM: InputService[];
  FACEBOOK: InputService[];
  YOUTUBE: InputService[];
  TIKTOK: InputService[];
  TWITTER: InputService[];
  SPOTIFY: InputService[];
  TWITCH: InputService[];
  TELEGRAM: InputService[];
  DISCORD: InputService[];
  GOOGLE: InputService[];
  LINKEDIN: InputService[];
  PINTEREST: InputService[];
  REDDIT: InputService[];
  SNAPCHAT: InputService[];
  SOUNDCLOUD: InputService[];
  VIMEO: InputService[];
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalServices: number;
    platformCounts: Record<string, number>;
    typeCounts: Record<string, number>;
    categoryCounts: Record<string, number>;
    averagePrice: number;
    priceRange: { min: number; max: number };
  };
}

// Type for dynamic field access
type DynamicService = {
  [key: string]: unknown;
} & InputService;

// Helper function to clean special characters from strings
function cleanString(str: string): string {
  if (!str) return '';
  // Remove special characters and normalize
  return str
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toUpperCase();
}

// Helper function to map non-standard platforms to our schema
function mapPlatform(platform: string): string {
  if (!platform) return 'OTHER';

  const cleanPlatform = cleanString(platform);

  // Direct mapping for standard platforms
  const standardPlatforms = [
    'INSTAGRAM',
    'FACEBOOK',
    'YOUTUBE',
    'TWITTER',
    'SPOTIFY',
    'TIKTOK',
    'LINKEDIN',
    'GOOGLE',
    'TELEGRAM',
    'DISCORD',
    'SNAPCHAT',
    'TWITCH',
    'WEBSITE_TRAFFIC',
    'REVIEWS',
    'OTHER',
  ];

  if (standardPlatforms.includes(cleanPlatform)) {
    return cleanPlatform;
  }

  // Map specific platforms to WEBSITE_TRAFFIC
  const websiteTrafficPlatforms = [
    'KWAI',
    'LIKEE',
    'LINE',
    'MEDIUM',
    'MIXCLOUD',
    'OKRU',
    'PODCAST',
    'QUORA',
    'REVERBNATION',
    'RUTUBE',
    'RUMBLE',
    'SHAZAM',
    'SHOPEE',
    'PINTEREST',
    'REDDIT',
    'SOUNDCLOUD',
    'VIMEO',
  ];

  if (websiteTrafficPlatforms.some((p) => cleanPlatform.includes(p))) {
    return 'WEBSITE_TRAFFIC';
  }

  // Map review-related platforms to REVIEWS
  const reviewPlatforms = ['MAPS', 'REVIEW', 'RATING', 'TRUSTPILOT', 'YELP'];

  if (reviewPlatforms.some((p) => cleanPlatform.includes(p))) {
    return 'REVIEWS';
  }

  return 'OTHER';
}

// Helper function to map non-standard service types to our schema
function mapServiceType(type: string): string {
  if (!type) return 'VIEWS';

  const cleanType = cleanString(type);

  // Direct mapping for standard types
  const standardTypes = [
    'LIKES',
    'FOLLOWERS',
    'VIEWS',
    'COMMENTS',
    'SUBSCRIBERS',
    'AUTO_LIKES',
    'AUTO_LIKES_SUBS',
    'SHARES',
    'GROWTH_PACKAGE',
    'LIVE_STREAM_VIEWS',
    'LIVE_STREAM_LIKES',
    'LIVE_STREAM_SHARES',
    'LIVE_STREAM_COMMENTS',
    'BATTLE_POINTS',
    'SAVES',
    'DOWNLOADS',
    'PRE_PREMIERE_VIEWS',
    'RAV_MTS_VIEWS',
    'SHORTS_VIEWS',
    'SHORTS_LIKES',
    'MONETIZED_VIEWS',
    'LIVE_VIEWS',
    'PK_BATTLE_POINTS',
  ];

  if (standardTypes.includes(cleanType)) {
    return cleanType;
  }

  // Map specific types to standard ones
  const typeMap: Record<string, string> = {
    PLAYS: 'VIEWS',
    STREAMS: 'VIEWS',
    WATCH_TIME: 'VIEWS',
    UPVOTES: 'LIKES',
    DOWNVOTES: 'LIKES',
    REACTIONS: 'LIKES',
    MEMBERS: 'FOLLOWERS',
    FANS: 'FOLLOWERS',
    INSTALLS: 'VIEWS',
    RATINGS: 'LIKES',
    VOTES: 'LIKES',
    MESSAGES: 'COMMENTS',
    REVIEWS: 'COMMENTS',
    TRAFFIC: 'VIEWS',
    LISTENERS: 'VIEWS',
    OTHER: 'VIEWS',
  };

  return typeMap[cleanType] || 'VIEWS';
}

// Helper function to map categories
function mapCategory(category: string): string {
  if (!category) return 'ENGAGEMENT_SERVICES';

  const cleanCategory = cleanString(category);

  const categoryMap: Record<string, string> = {
    AUTO_SERVICES: 'AUTO_SERVICES',
    ENGAGEMENT_SERVICES: 'ENGAGEMENT_SERVICES',
    GROWTH_PACKAGES: 'GROWTH_PACKAGES',
    LIVE_STREAM_SERVICES: 'LIVE_STREAM_SERVICES',
    PREMIUM_SERVICES: 'PREMIUM_SERVICES',
    STORY_SERVICES: 'STORY_SERVICES',
    MONETIZATION_SERVICES: 'MONETIZATION_SERVICES',
    SHORTS_SERVICES: 'SHORTS_SERVICES',
    LIVE_SERVICES: 'LIVE_SERVICES',
    AUTO_ENGAGEMENT: 'AUTO_SERVICES',
  };

  return categoryMap[cleanCategory] || 'ENGAGEMENT_SERVICES';
}

function validatePlatform(platform: string): boolean {
  const mappedPlatform = mapPlatform(platform);
  return Object.keys(Platform).includes(mappedPlatform);
}

function validateServiceType(type: string): boolean {
  const mappedType = mapServiceType(type);
  return Object.keys(ServiceType).includes(mappedType);
}

function validateCategory(category: string): boolean {
  const mappedCategory = mapCategory(category);
  return Object.keys(ServiceCategory).includes(mappedCategory);
}

function validateService(
  service: DynamicService,
  platformKey: string
): string[] {
  const errors: string[] = [];

  // Required fields
  const requiredFields = [
    'id',
    'name',
    'platform',
    'type',
    'category',
    'description',
    'basePrice',
    'minQuantity',
    'maxQuantity',
    'features',
  ] as const;

  // Check required fields
  for (const field of requiredFields) {
    if (!service[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate types
  if (typeof service.basePrice !== 'number') {
    errors.push('basePrice must be a number');
  }

  // Get minQuantity, handling special characters
  let minQuantity = service.minQuantity;
  if (typeof minQuantity !== 'number') {
    // Try alternate field names
    const alternateFields = Object.keys(service).filter(
      (k) => k.replace(/[^\w]/g, '').toLowerCase() === 'minquantity'
    );
    for (const field of alternateFields) {
      const val = service[field];
      if (typeof val === 'number') {
        minQuantity = val;
        break;
      }
    }
  }

  const maxQuantity = service.maxQuantity;

  if (typeof minQuantity !== 'number') {
    errors.push('minQuantity must be a number');
  }
  if (typeof maxQuantity !== 'number') {
    errors.push('maxQuantity must be a number');
  }
  if (!Array.isArray(service.features)) {
    errors.push('features must be an array');
  }

  // Get platform, handling special characters
  let platform = service.platform;
  if (!platform) {
    // Try alternate field names
    const alternateFields = Object.keys(service).filter(
      (k) => k.replace(/[^\w]/g, '').toLowerCase() === 'platform'
    );
    for (const field of alternateFields) {
      const val = service[field];
      if (typeof val === 'string') {
        platform = val;
        break;
      }
    }
  }

  const mappedPlatform = mapPlatform(platform || '');
  if (!validatePlatform(mappedPlatform)) {
    errors.push(`Invalid platform: ${platform} (mapped to ${mappedPlatform})`);
  }

  // Get type, handling special characters
  let type = service.type;
  if (!type) {
    // Try alternate field names
    const alternateFields = Object.keys(service).filter(
      (k) => k.replace(/[^\w]/g, '').toLowerCase() === 'type'
    );
    for (const field of alternateFields) {
      const val = service[field];
      if (typeof val === 'string') {
        type = val;
        break;
      }
    }
  }

  const mappedType = mapServiceType(type || '');
  if (!validateServiceType(mappedType)) {
    errors.push(`Invalid service type: ${type} (mapped to ${mappedType})`);
  }

  // Get category, handling special characters
  let category = service.category;
  if (!category) {
    // Try alternate field names
    const alternateFields = Object.keys(service).filter(
      (k) => k.replace(/[^\w]/g, '').toLowerCase() === 'category'
    );
    for (const field of alternateFields) {
      const val = service[field];
      if (typeof val === 'string') {
        category = val;
        break;
      }
    }
  }

  const mappedCategory = mapCategory(category || '');
  if (!validateCategory(mappedCategory)) {
    errors.push(`Invalid category: ${category} (mapped to ${mappedCategory})`);
  }

  // Validate business rules
  if (
    typeof minQuantity === 'number' &&
    typeof maxQuantity === 'number' &&
    minQuantity > maxQuantity
  ) {
    errors.push('minQuantity cannot be greater than maxQuantity');
  }
  if (service.basePrice < 0) {
    errors.push('basePrice cannot be negative');
  }

  return errors;
}

async function validateData(): Promise<ValidationResult> {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalServices: 0,
      platformCounts: {},
      typeCounts: {},
      categoryCounts: {},
      averagePrice: 0,
      priceRange: {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY,
      },
    },
  };

  try {
    // Read the services data file
    const filePath = path.join(__dirname, '../smm_data.json');
    console.log(`Reading file from: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      result.errors.push(`Input file not found at: ${filePath}`);
      result.isValid = false;
      return result;
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    console.log('Successfully read file, size:', rawData.length, 'bytes');

    let data: RootData;
    try {
      data = JSON.parse(rawData);
      const totalServices = Object.values(data).reduce(
        (sum, arr) => sum + arr.length,
        0
      );
      console.log(
        'Successfully parsed JSON, found',
        totalServices,
        'services across',
        Object.keys(data).length,
        'platforms'
      );
    } catch (e) {
      console.error('JSON parse error:', e);
      result.errors.push('Failed to parse JSON file');
      result.isValid = false;
      return result;
    }

    let totalPrice = 0;
    let serviceCount = 0;

    // Validate each platform's services
    for (const [platformKey, services] of Object.entries(data)) {
      console.log(
        `\nValidating ${services.length} services for platform: ${platformKey}`
      );

      if (!Array.isArray(services)) {
        result.errors.push(
          `Invalid data structure: ${platformKey} is not an array`
        );
        result.isValid = false;
        continue;
      }

      result.stats.platformCounts[platformKey] = services.length;

      for (const [index, service] of services.entries()) {
        const serviceErrors = validateService(service, platformKey);
        if (serviceErrors.length > 0) {
          result.errors.push(
            `Service #${index + 1} in ${platformKey} (${service.id || 'unknown'}):`
          );
          result.errors.push(...serviceErrors.map((err) => `  - ${err}`));
          result.isValid = false;

          // Debug log for invalid service
          console.log('\nInvalid service:', {
            id: service.id,
            name: service.name,
            platform: service.platform,
            type: service.type,
            category: service.category,
            errors: serviceErrors,
          });
        }

        // Collect statistics
        result.stats.typeCounts[service.type] =
          (result.stats.typeCounts[service.type] || 0) + 1;
        result.stats.categoryCounts[service.category] =
          (result.stats.categoryCounts[service.category] || 0) + 1;

        totalPrice += service.basePrice;
        result.stats.priceRange.min = Math.min(
          result.stats.priceRange.min,
          service.basePrice
        );
        result.stats.priceRange.max = Math.max(
          result.stats.priceRange.max,
          service.basePrice
        );
        serviceCount++;
      }
    }

    result.stats.totalServices = serviceCount;
    result.stats.averagePrice = totalPrice / serviceCount;

    // Add warnings for potential issues
    const unusualPlatforms = Object.keys(result.stats.platformCounts).filter(
      (platform) => !validatePlatform(platform)
    );
    if (unusualPlatforms.length > 0) {
      result.warnings.push(
        `Found services with non-standard platforms: ${unusualPlatforms.join(', ')}`
      );
    }

    // Print summary
    console.log('\n=== Validation Summary ===');
    console.log(`Total Services: ${result.stats.totalServices}`);
    console.log('\nPlatform Distribution:');
    for (const [platform, count] of Object.entries(
      result.stats.platformCounts
    ).sort(([, a], [, b]) => b - a)) {
      console.log(`  ${platform}: ${count} services`);
    }

    console.log('\nService Type Distribution:');
    for (const [type, count] of Object.entries(result.stats.typeCounts).sort(
      ([, a], [, b]) => b - a
    )) {
      console.log(`  ${type}: ${count} services`);
    }

    console.log('\nCategory Distribution:');
    for (const [category, count] of Object.entries(
      result.stats.categoryCounts
    ).sort(([, a], [, b]) => b - a)) {
      console.log(`  ${category}: ${count} services`);
    }

    console.log('\nPrice Statistics:');
    console.log(`  Average Price: $${result.stats.averagePrice.toFixed(2)}`);
    console.log(
      `  Price Range: $${result.stats.priceRange.min.toFixed(2)} - $${result.stats.priceRange.max.toFixed(2)}`
    );

    if (result.errors.length > 0) {
      console.log(
        '\n❌ Validation Errors:',
        result.errors.length,
        'errors found'
      );
      for (const error of result.errors) {
        console.log(`  ${error}`);
      }
    }

    if (result.warnings.length > 0) {
      console.log('\n⚠️ Warnings:', result.warnings.length, 'warnings found');
      for (const warning of result.warnings) {
        console.log(`  ${warning}`);
      }
    }

    return result;
  } catch (error) {
    console.error('Unexpected error:', error);
    if (error instanceof Error) {
      result.errors.push(`Validation failed: ${error.message}`);
    } else {
      result.errors.push('Validation failed with unknown error');
    }
    result.isValid = false;
    return result;
  }
}

// Execute the validation
validateData().then((result) => {
  if (result.isValid) {
    console.log('\n✅ All services are valid and ready for transformation');
  } else {
    console.log(
      '\n❌ Validation failed. Please fix the errors before proceeding'
    );
    process.exit(1);
  }
});

export { validateData, type ValidationResult };
