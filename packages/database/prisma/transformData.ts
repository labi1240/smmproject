import * as fs from 'node:fs';
import * as path from 'node:path';

// Define our own enums to avoid Prisma dependency
const Platform = {
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
  YOUTUBE: 'YOUTUBE',
  TWITTER: 'TWITTER',
  SPOTIFY: 'SPOTIFY',
  TIKTOK: 'TIKTOK',
  LINKEDIN: 'LINKEDIN',
  GOOGLE: 'GOOGLE',
  TELEGRAM: 'TELEGRAM',
  DISCORD: 'DISCORD',
  SNAPCHAT: 'SNAPCHAT',
  TWITCH: 'TWITCH',
  PINTEREST: 'PINTEREST',
  REDDIT: 'REDDIT',
  SOUNDCLOUD: 'SOUNDCLOUD',
  VIMEO: 'VIMEO',
  WEBSITE_TRAFFIC: 'WEBSITE_TRAFFIC',
  REVIEWS: 'REVIEWS',
  OTHER: 'OTHER',
} as const;

const ServiceType = {
  LIKES: 'LIKES',
  FOLLOWERS: 'FOLLOWERS',
  VIEWS: 'VIEWS',
  COMMENTS: 'COMMENTS',
  SUBSCRIBERS: 'SUBSCRIBERS',
  AUTO_LIKES: 'AUTO_LIKES',
  AUTO_VIEWS: 'AUTO_VIEWS',
  SHARES: 'SHARES',
  PLAYS: 'PLAYS',
  SAVES: 'SAVES',
  FAVORITES: 'FAVORITES',
  RETWEETS: 'RETWEETS',
  WEBSITE_HITS: 'WEBSITE_HITS',
  APP_INSTALLS: 'APP_INSTALLS',
  REVIEWS_RATINGS: 'REVIEWS_RATINGS',
  GROWTH_PACKAGE: 'GROWTH_PACKAGE',
  LIVE_STREAM_VIEWS: 'LIVE_STREAM_VIEWS',
  LISTENERS: 'LISTENERS',
  TRAFFIC: 'TRAFFIC',
  OTHER: 'OTHER',
} as const;

const ServiceCategory = {
  PREMIUM_SERVICES: 'PREMIUM_SERVICES',
  GROWTH_PACKAGES: 'GROWTH_PACKAGES',
  STORY_SERVICES: 'STORY_SERVICES',
  ENGAGEMENT_SERVICES: 'ENGAGEMENT_SERVICES',
  AUTO_SERVICES: 'AUTO_SERVICES',
  LIVE_STREAM_SERVICES: 'LIVE_STREAM_SERVICES',
  OTHER: 'OTHER',
} as const;

interface CountryData {
  name: string;
  iso2: string;
  phone_code: string;
  flag: string;
}

interface InputService {
  service: string;
  name: string;
  type: string;
  rate: string;
  min: string;
  max: string;
  dripfeed: boolean;
  refill: boolean;
  cancel: boolean;
  category: string;
}

interface TransformedService {
  id: string;
  thirdPartyServiceId: number;
  name: string;
  platform: (typeof Platform)[keyof typeof Platform];
  type: (typeof ServiceType)[keyof typeof ServiceType];
  category: (typeof ServiceCategory)[keyof typeof ServiceCategory];
  description: string;
  basePrice: number;
  pricePerUnit: number;
  minQuantity: number;
  maxQuantity: number;
  features: string[];
  quality: string;
  speed: string;
  retention: string;
  startTime: string;
  guaranteeDays: number;
  supportsCancel: boolean;
  supportsRefill: boolean;
  supportsDripFeed: boolean;
  isActive: boolean;
  targetedCountries: string[];
  source?: string;
}

// Load and parse Country.json data
const countryData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../Country.json'), 'utf-8')
) as CountryData[];

// Create a map of country names for faster lookup
const countryNameMap = new Map(
  countryData.map((country: CountryData) => [
    country.name.toLowerCase(),
    country.name,
  ])
);

// Helper function to extract platform from category
function extractPlatform(
  category: string
): (typeof Platform)[keyof typeof Platform] {
  const platformMap: Record<string, (typeof Platform)[keyof typeof Platform]> =
    {
      Instagram: Platform.INSTAGRAM,
      Facebook: Platform.FACEBOOK,
      Youtube: Platform.YOUTUBE,
      Twitter: Platform.TWITTER,
      'X.com': Platform.TWITTER,
      Spotify: Platform.SPOTIFY,
      TikTok: Platform.TIKTOK,
      LinkedIn: Platform.LINKEDIN,
      Google: Platform.GOOGLE,
      Telegram: Platform.TELEGRAM,
      Discord: Platform.DISCORD,
      Snapchat: Platform.SNAPCHAT,
      Twitch: Platform.TWITCH,
      Pinterest: Platform.PINTEREST,
      Reddit: Platform.REDDIT,
      SoundCloud: Platform.SOUNDCLOUD,
      Vimeo: Platform.VIMEO,
    };

  for (const [key, value] of Object.entries(platformMap)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return Platform.OTHER;
}

// Helper function to extract source from name
function extractSource(name: string): string | undefined {
  // Check for traffic source patterns
  const sourcePatterns = [
    /traffic from\s+([^[\]]+?)(?:\s+\[|$)/i,
    /traffic From\s+([^[\]]+?)(?:\s+\[|$)/i,
    /from\s+([^[\]]+?)(?:\s+\[|$)/i,
  ];

  for (const pattern of sourcePatterns) {
    const match = name.match(pattern);
    if (match) {
      const source = match[1].trim();
      // Clean up common suffixes
      return source
        .replace(/Devices$/, '')
        .replace(/Mobile$/, '')
        .trim();
    }
  }

  return undefined;
}

// Helper function to extract service type
function extractServiceType(
  name: string,
  category: string
): (typeof ServiceType)[keyof typeof ServiceType] {
  if (category.toLowerCase().includes('live stream')) {
    return ServiceType.LIVE_STREAM_VIEWS;
  }

  // Check for traffic type first
  if (name.toLowerCase().includes('traffic from')) {
    return ServiceType.TRAFFIC;
  }

  const typeMap: Record<
    string,
    (typeof ServiceType)[keyof typeof ServiceType]
  > = {
    Likes: ServiceType.LIKES,
    Views: ServiceType.VIEWS,
    Followers: ServiceType.FOLLOWERS,
    Comments: ServiceType.COMMENTS,
    Subscribers: ServiceType.SUBSCRIBERS,
    'Auto Likes': ServiceType.AUTO_LIKES,
    'Auto Views': ServiceType.AUTO_VIEWS,
    Shares: ServiceType.SHARES,
    Plays: ServiceType.PLAYS,
    Saves: ServiceType.SAVES,
    Listeners: ServiceType.LISTENERS,
  };

  for (const [key, value] of Object.entries(typeMap)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return ServiceType.OTHER;
}

// Helper function to extract category
function extractCategory(
  name: string,
  category: string
): (typeof ServiceCategory)[keyof typeof ServiceCategory] {
  if (category.toLowerCase().includes('live stream')) {
    return ServiceCategory.LIVE_STREAM_SERVICES;
  }
  if (
    name.toLowerCase().includes('premium') ||
    category.toLowerCase().includes('premium')
  ) {
    return ServiceCategory.PREMIUM_SERVICES;
  }
  if (
    name.toLowerCase().includes('growth') ||
    category.toLowerCase().includes('growth')
  ) {
    return ServiceCategory.GROWTH_PACKAGES;
  }
  if (
    name.toLowerCase().includes('story') ||
    category.toLowerCase().includes('story')
  ) {
    return ServiceCategory.STORY_SERVICES;
  }
  if (
    name.toLowerCase().includes('auto') ||
    category.toLowerCase().includes('auto')
  ) {
    return ServiceCategory.AUTO_SERVICES;
  }
  return ServiceCategory.ENGAGEMENT_SERVICES;
}

// Helper function to extract speed from name
function extractSpeed(name: string): { speed: string; startTime: string } {
  const speedMatch = name.match(/Speed:\s*([^\]]+)/i);
  const startTimeMatch = name.match(/Start Time:\s*([^\]]+)/i);

  return {
    speed: speedMatch ? speedMatch[1].trim() : 'Normal',
    startTime: startTimeMatch ? startTimeMatch[1].trim() : '0-24h',
  };
}

// Helper function to extract quality and retention
function extractQualityAndRetention(name: string): {
  quality: string;
  retention: string;
} {
  const quality = name.toLowerCase().includes('premium')
    ? 'Premium'
    : 'Standard';

  let retention = 'Standard';

  // Check for retention in name
  if (name.toLowerCase().includes('monthly')) {
    retention = 'Monthly';
  } else {
    const retentionMatch = name.match(/Retention:\s*([^\]]+)/i);
    if (retentionMatch) {
      retention = retentionMatch[1].trim();
    }
  }

  return { quality, retention };
}

// Helper function to calculate prices
function calculatePrices(
  rate: string,
  min: string
): { basePrice: number; pricePerUnit: number } {
  const price = Number.parseFloat(rate);
  const minQuantity = Number.parseInt(min);
  const pricePerUnit = price / minQuantity;
  return {
    basePrice: price,
    pricePerUnit,
  };
}

// Helper function to extract guarantee days
function extractGuaranteeDays(name: string): number {
  const lifetimeMatch = name.toLowerCase().includes('lifetime');
  if (lifetimeMatch) return 365; // Lifetime guarantee

  const daysMatch = name.match(/(\d+)\s*days?/i);
  return daysMatch ? Number.parseInt(daysMatch[1]) : 0;
}

// Helper function to extract targeted countries
function extractTargetedCountries(name: string): string[] {
  const nameLower = name.toLowerCase();

  // Check for worldwide/mixed indicators first
  if (
    nameLower.includes('worldwide') ||
    nameLower.includes('global') ||
    nameLower.includes('international') ||
    nameLower.includes('mixed') ||
    nameLower.includes('ww]')
  ) {
    return ['WORLDWIDE'];
  }

  // Create a map of flag emojis to country names
  const flagToCountry = new Map(
    countryData.map((country) => [country.flag, country.name])
  );

  // Match pattern: flag emoji followed by country name in brackets
  // Example: 🇬🇭Instagram Followers [GHANA] or [🇬🇭 GHANA]
  const extractedCountries = new Set<string>();
  const flagPattern = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
  const flags = [...name.matchAll(flagPattern)].map((m) => m[0]);

  for (const flag of flags) {
    const countryName = flagToCountry.get(flag);
    if (countryName) {
      // Only add the country if its name (case-insensitive) appears in brackets after the flag
      const bracketPattern = new RegExp(
        `\\${flag}[^\\[]*\\[([^\\]]+?)(?:\\s*(?:RAV™|RAV|Max|Speed|Start Time|Refill):|\\])`,
        'i'
      );
      const bracketMatch = name.match(bracketPattern);
      if (bracketMatch) {
        const bracketContent = bracketMatch[1].trim();
        if (bracketContent.toLowerCase() === countryName.toLowerCase()) {
          extractedCountries.add(countryName.toUpperCase());
        }
      }
    }
  }

  // If no country found, assume worldwide
  return extractedCountries.size > 0
    ? Array.from(extractedCountries)
    : ['WORLDWIDE'];
}

// Helper function to find country match from Country.json
function findCountryMatch(text: string): string | undefined {
  const cleanText = text.toLowerCase().trim();

  // Direct match
  const directMatch = countryNameMap.get(cleanText);
  if (directMatch) {
    return directMatch;
  }

  // Handle special cases and variations
  const specialCases: Record<string, string> = {
    usa: 'United States',
    us: 'United States',
    uk: 'United Kingdom',
    gb: 'United Kingdom',
    uae: 'United Arab Emirates',
    korea: 'South Korea',
    russia: 'Russia',
    saudi: 'Saudi Arabia',
    ksa: 'Saudi Arabia',
  };

  return specialCases[cleanText];
}

// Helper function to clean service names
function cleanServiceName(name: string): string {
  let cleanName = name;

  // Remove flag emojis first
  cleanName = cleanName.replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '');

  // Keep only the main name and first meaningful bracket content
  // Only keep brackets that contain package types, quality indicators, or target info
  const keepPatterns = [
    'MONTHLY PACKAGE',
    'STANDARD',
    'PRO',
    'LQ',
    'HQ',
    'All Pages',
    'PREMIUM',
    'BASIC',
    'ULTRA',
    'VIP',
  ];
  const keepRegex = new RegExp(
    `^([^[]+(?:\\[(${keepPatterns.join('|')})\\])?)`
  );
  const mainNameMatch = cleanName.match(keepRegex);
  if (mainNameMatch) {
    cleanName = mainNameMatch[1];
  } else {
    // If no special bracket content to keep, just take everything before the first bracket
    const simpleMatch = cleanName.match(/^[^[]+/);
    if (simpleMatch) {
      cleanName = simpleMatch[0];
    }
  }

  // Clean up multiple spaces and trim
  cleanName = cleanName.replace(/\s+/g, ' ').trim();

  return cleanName;
}

// Helper function to calculate final price with multipliers
function calculateFinalPrice(service: TransformedService): {
  basePrice: number;
  pricePerUnit: number;
} {
  let multiplier = 1.0;

  // Quality multipliers
  const qualityMultipliers: Record<string, number> = {
    Premium: 1.5,
    HQ: 1.3,
    Standard: 1.0,
    LQ: 0.8,
  };
  multiplier *= qualityMultipliers[service.quality] || 1.0;

  // Speed multipliers
  if (service.speed.toLowerCase().includes('instant')) multiplier *= 1.4;
  else if (service.speed.toLowerCase().includes('fast')) multiplier *= 1.2;
  else if (service.speed.toLowerCase().includes('slow')) multiplier *= 0.9;

  // Feature multipliers
  if (service.supportsRefill) multiplier *= 1.2;
  if (service.supportsDripFeed) multiplier *= 1.1;
  if (service.supportsCancel) multiplier *= 1.1;

  // Retention multipliers
  if (service.retention.toLowerCase().includes('lifetime')) multiplier *= 1.5;
  else if (service.retention.toLowerCase().includes('monthly'))
    multiplier *= 1.3;
  else if (service.guaranteeDays > 90) multiplier *= 1.2;
  else if (service.guaranteeDays > 30) multiplier *= 1.1;

  // Platform multipliers
  const platformMultipliers: Partial<Record<keyof typeof Platform, number>> = {
    INSTAGRAM: 1.2,
    YOUTUBE: 1.3,
    TIKTOK: 1.25,
    FACEBOOK: 1.15,
    TWITTER: 1.1,
    SPOTIFY: 1.2,
    LINKEDIN: 1.3,
  };
  multiplier *= platformMultipliers[service.platform] || 1.0;

  // Category multipliers
  const categoryMultipliers: Partial<
    Record<keyof typeof ServiceCategory, number>
  > = {
    PREMIUM_SERVICES: 1.4,
    GROWTH_PACKAGES: 1.3,
    AUTO_SERVICES: 1.2,
    LIVE_STREAM_SERVICES: 1.25,
  };
  multiplier *= categoryMultipliers[service.category] || 1.0;

  // Type multipliers
  const typeMultipliers: Partial<Record<keyof typeof ServiceType, number>> = {
    AUTO_LIKES: 1.3,
    AUTO_VIEWS: 1.25,
    COMMENTS: 1.4,
    LIVE_STREAM_VIEWS: 1.3,
    GROWTH_PACKAGE: 1.35,
  };
  multiplier *= typeMultipliers[service.type] || 1.0;

  // Quantity-based adjustments
  const quantityMultiplier =
    service.maxQuantity > 1000000
      ? 0.8
      : // Bulk discount for large quantities
        service.maxQuantity > 100000
        ? 0.9
        : service.maxQuantity > 10000
          ? 0.95
          : 1.0;
  multiplier *= quantityMultiplier;

  // Apply multiplier to base price and price per unit
  const finalBasePrice = service.basePrice * multiplier;
  const finalPricePerUnit = service.pricePerUnit * multiplier;

  return {
    basePrice: Number(finalBasePrice.toFixed(4)),
    pricePerUnit: Number(finalPricePerUnit.toFixed(6)),
  };
}

// Main transformation function
function transformService(service: InputService): TransformedService {
  const platform = extractPlatform(service.category);
  const type = extractServiceType(service.name, service.category);
  const category = extractCategory(service.name, service.category);
  const { basePrice, pricePerUnit } = calculatePrices(
    service.rate,
    service.min
  );
  const { speed, startTime } = extractSpeed(service.name);
  const { quality, retention } = extractQualityAndRetention(service.name);
  const guaranteeDays = extractGuaranteeDays(service.name);
  const source = extractSource(service.name);

  const features: string[] = [];
  if (service.dripfeed) features.push('Drip Feed Available');
  if (service.refill) features.push('Refill Guaranteed');
  if (service.cancel) features.push('Can Cancel');

  // Extract additional features from name
  const featureMatches = service.name.match(/\[(.*?)\]/g);
  if (featureMatches) {
    for (const match of featureMatches) {
      const feature = match.replace(/[[\]]/g, '').trim();
      if (!features.includes(feature)) {
        features.push(feature);
      }
    }
  }

  const targetedCountries = extractTargetedCountries(service.name);

  const result: TransformedService = {
    targetedCountries,
    id: `service_${service.service}`,
    thirdPartyServiceId: Number.parseInt(service.service),
    name: cleanServiceName(service.name),
    platform,
    type,
    category,
    description: `${quality} ${platform} ${type.toLowerCase()} service${
      source ? ` from ${source}` : ''
    } with ${speed} speed${
      targetedCountries.length > 0 && !targetedCountries.includes('WORLDWIDE')
        ? ` targeted for ${targetedCountries.join(', ')}`
        : ''
    }`,
    basePrice,
    pricePerUnit,
    minQuantity: Number.parseInt(service.min),
    maxQuantity: Number.parseInt(service.max),
    features,
    quality,
    speed,
    retention,
    startTime,
    guaranteeDays,
    supportsCancel: service.cancel,
    supportsRefill: service.refill,
    supportsDripFeed: service.dripfeed,
    isActive: true,
  };

  if (source) {
    result.source = source;
  }

  // Calculate final price with multipliers
  const finalPrices = calculateFinalPrice(result);
  result.basePrice = finalPrices.basePrice;
  result.pricePerUnit = finalPrices.pricePerUnit;

  return result;
}

// Main function to read and transform data
async function transformData() {
  try {
    console.log('Starting transformation...');

    // Read the services data file
    const filePath = path.join(__dirname, '../data.json');
    console.log(`Reading file from: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Input file not found at: ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    console.log('Successfully read input file');

    let services: InputService[];
    try {
      services = JSON.parse(rawData);
      console.log(`Parsed ${services.length} services from input`);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      throw new Error('Failed to parse input file as JSON');
    }

    // Transform each service
    console.log('Transforming services...');
    const transformedServices = services.map(transformService);
    console.log(
      `Successfully transformed ${transformedServices.length} services`
    );

    // Group services by platform for better readability
    console.log('Grouping services by platform...');
    const groupedServices = transformedServices.reduce(
      (acc, service) => {
        const platform = service.platform;
        if (!acc[platform]) {
          acc[platform] = [];
        }
        acc[platform].push(service);
        return acc;
      },
      {} as Record<string, TransformedService[]>
    );

    // Save transformed data
    const outputPath = path.join(__dirname, '../transformed-data.json');
    console.log(`Writing output to: ${outputPath}`);
    fs.writeFileSync(outputPath, JSON.stringify(groupedServices, null, 2));

    // Create a sample file with 2 services from each platform
    const sampleServices: Record<string, TransformedService[]> = {};
    for (const [platform, services] of Object.entries(groupedServices)) {
      sampleServices[platform] = services.slice(0, 2);
    }

    const samplePath = path.join(__dirname, '../transformed-data-sample.json');
    console.log(`Writing sample to: ${samplePath}`);
    fs.writeFileSync(samplePath, JSON.stringify(sampleServices, null, 2));

    const summary = `✅ Successfully transformed ${transformedServices.length} services\n📊 Services by platform:\n${Object.entries(
      groupedServices
    )
      .map(
        ([platform, services]) => `   ${platform}: ${services.length} services`
      )
      .join('\n')}`;

    console.log(summary);
    return transformedServices;
  } catch (error) {
    console.error('Error transforming data:', error);
    throw error;
  }
}

// Execute the transformation
transformData().catch(console.error);

export { transformData, transformService, type TransformedService };
