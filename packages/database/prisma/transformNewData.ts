import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  DeliverySpeed,
  Platform,
  ServiceCategory,
  ServiceType,
  TargetInputType,
} from '@prisma/client';

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
}

interface TransformedService {
  id: string;
  name: string;
  description: string;
  features: string[];
  basePrice: number;
  type: ServiceType;
  platform: Platform;
  category: ServiceCategory;
  deliverySpeed: DeliverySpeed;
  targetInputType: TargetInputType;
  thirdPartyServiceId: number;
  minQuantity: number;
  maxQuantity: number;
  guaranteeDays: number;
  supportsCancel: boolean;
  supportsRefill: boolean;
  supportsDripFeed: boolean;
  isActive: boolean;
}

// Helper function to map speed to DeliverySpeed enum
function mapSpeedToDeliverySpeed(
  speed: number,
  quality: string
): DeliverySpeed {
  if (quality.toLowerCase().includes('premium')) {
    return speed > 10000
      ? DeliverySpeed.PREMIUM_GRADUAL
      : DeliverySpeed.PREMIUM_INSTANT;
  }
  return speed > 10000 ? DeliverySpeed.GRADUAL : DeliverySpeed.INSTANT;
}

// Helper function to validate and map platform
function validatePlatform(platform: string): Platform {
  const validPlatform = platform as keyof typeof Platform;
  if (Object.keys(Platform).includes(validPlatform)) {
    return Platform[validPlatform];
  }
  // Map non-standard platforms to OTHER
  if (['VIMEO', 'REDDIT', 'SOUNDCLOUD'].includes(platform)) {
    console.warn(`Mapping platform ${platform} to OTHER`);
    return Platform.OTHER;
  }
  console.warn(`Unknown platform: ${platform}, defaulting to OTHER`);
  return Platform.OTHER;
}

// Helper function to validate and map service type
function validateServiceType(type: string): ServiceType {
  try {
    return ServiceType[type as keyof typeof ServiceType];
  } catch (e) {
    console.warn(`Unknown service type: ${type}, defaulting to VIEWS`);
    return ServiceType.VIEWS;
  }
}

// Helper function to validate and map category
function validateCategory(category: string): ServiceCategory {
  try {
    return ServiceCategory[category as keyof typeof ServiceCategory];
  } catch (e) {
    console.warn(
      `Unknown category: ${category}, defaulting to ENGAGEMENT_SERVICES`
    );
    return ServiceCategory.ENGAGEMENT_SERVICES;
  }
}

// Main transformation function
function transformService(service: InputService): TransformedService {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    features: service.features,
    basePrice: service.basePrice,
    type: validateServiceType(service.type),
    platform: validatePlatform(service.platform),
    category: validateCategory(service.category),
    deliverySpeed: mapSpeedToDeliverySpeed(service.speed, service.quality),
    targetInputType: TargetInputType.LINK, // Default to LINK as most services require URLs
    thirdPartyServiceId: service.thirdPartyServiceId,
    minQuantity: service.minQuantity,
    maxQuantity: service.maxQuantity,
    guaranteeDays: service.guaranteeDays,
    supportsCancel: service.supportsCancel,
    supportsRefill: service.supportsRefill,
    supportsDripFeed: service.supportsDripFeed,
    isActive: service.isActive,
  };
}

// Main function to read and transform data
async function transformData() {
  try {
    console.log('Starting transformation of new data format...');

    // Read the services data file
    const filePath = path.join(__dirname, '../smm_data.json');
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
    const outputPath = path.join(__dirname, '../transformed-new-data.json');
    console.log(`Writing output to: ${outputPath}`);
    fs.writeFileSync(outputPath, JSON.stringify(groupedServices, null, 2));

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
