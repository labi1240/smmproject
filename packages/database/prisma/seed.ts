// prisma/seed.ts

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  type DeliverySpeed,
  Platform,
  PrismaClient,
  type Retention,
  type ServiceCategory,
  ServiceType,
  type StartTime,
  type TargetInputType,
} from '@prisma/client';

const prisma = new PrismaClient();

// Define interfaces matching your seed data structure
interface Welcome {
  name: string;
  description: string;
  features: string[];
  basePrice: number;
  type: string;
  platform: string;
  category: string;
  deliverySpeed: string;
  targetInputType: string;
  thirdPartyServiceId: number;
  createdAt: string;
  updatedAt: string;
  servicePlans: ServicePlan[];
  supportsCancel: boolean;
  supportsRefill: boolean;
  supportsDripFeed: boolean;
  isActive: boolean;
  country: Country | null;
}

interface ServicePlan {
  count: number;
  price: number;
  captchaRequired: boolean;
  deliverySpeed: string;
  disabled: boolean;
  discount: boolean;
  guaranteeDays: number | null;
  guaranteePrice: number | null;
  duration: number;
  startTime: string;
  retention: string;
}

interface Country {
  connect: Connect;
}

interface Connect {
  iso2: string;
}

// Enhanced helper function to transform enum values with debugging
function transformEnumValue(value: string, enumType: string): string | null {
  if (!value) return null;

  switch (enumType) {
    case 'Platform': {
      const transformed = Platform[value as keyof typeof Platform];
      console.log(`Transforming Platform: '${value}' -> '${transformed}'`);
      return transformed || null;
    }
    case 'ServiceType': {
      const transformed = ServiceType[value as keyof typeof ServiceType];
      console.log(`Transforming ServiceType: '${value}' -> '${transformed}'`);
      return transformed || null;
    }
    case 'ServiceCategory': {
      const categoryMap: { [key: string]: string } = {
        ENGAGEMENT_SERVICES: 'ENGAGEMENT_SERVICES',
        PREMIUM_SERVICES: 'PREMIUM_SERVICES',
        GROWTH_PACKAGES: 'GROWTH_PACKAGES',
        STORY_SERVICES: 'STORY_SERVICES',
        AUTO_SERVICES: 'AUTO_SERVICES',
        LIVE_STREAM_SERVICES: 'LIVE_STREAM_SERVICES',
        AUTO_ENGAGEMENT: 'AUTO_ENGAGEMENT',
        MONETIZATION_SERVICES: 'MONETIZATION_SERVICES',
        SHORTS_SERVICES: 'SHORTS_SERVICES',
        LIVE_SERVICES: 'LIVE_SERVICES',
      };
      const transformed = categoryMap[value];
      console.log(
        `Transforming ServiceCategory: '${value}' -> '${transformed}'`
      );
      return transformed || null;
    }
    case 'DeliverySpeed': {
      const speedMap: { [key: string]: string } = {
        INSTANT: 'INSTANT',
        GRADUAL: 'GRADUAL',
        PREMIUM_INSTANT: 'PREMIUM_INSTANT',
        PREMIUM_GRADUAL: 'PREMIUM_GRADUAL',
      };
      const transformed = speedMap[value];
      console.log(`Transforming DeliverySpeed: '${value}' -> '${transformed}'`);
      return transformed || null;
    }
    case 'TargetInputType': {
      const inputTypeMap: { [key: string]: string } = {
        USERNAME: 'USERNAME',
        LINK: 'LINK',
      };
      const transformed = inputTypeMap[value];
      console.log(
        `Transforming TargetInputType: '${value}' -> '${transformed}'`
      );
      return transformed || null;
    }
    case 'StartTime': {
      const timeMap: { [key: string]: string } = {
        '0 minutes': 'The0Minutes',
        '5 minutes': 'The5Minutes',
        '10 minutes': 'The10Minutes',
        '15 minutes': 'The15Minutes',
        '30 minutes': 'The30Minutes',
        '60 minutes': 'The60Minutes',
        '1 minutes': 'The1Minutes',
        '120 minutes': 'The120Minutes',
        '1440 minutes': 'The1440Minutes',
        '180 minutes': 'The180Minutes',
        '240 minutes': 'The240Minutes',
        '300 minutes': 'The300Minutes',
        '360 minutes': 'The360Minutes',
        '480 minutes': 'The480Minutes',
        '540 minutes': 'The540Minutes',
        '600 minutes': 'The600Minutes',
        '720 minutes': 'The720Minutes',
        '1080 minutes': 'The1080Minutes',
        '2160 minutes': 'The2160Minutes',
        '2880 minutes': 'The2880Minutes',
        '4320 minutes': 'The4320Minutes',
        '4440 minutes': 'The4440Minutes',
        '5760 minutes': 'The5760Minutes',
      };
      const transformed = timeMap[value];
      console.log(`Transforming StartTime: '${value}' -> '${transformed}'`);
      return transformed || null;
    }
    case 'Retention': {
      const retentionMap: { [key: string]: string } = {
        Standard: 'Standard',
        Monthly: 'Monthly',
        '~1 Min': 'The1Min',
      };
      const transformed = retentionMap[value];
      console.log(`Transforming Retention: '${value}' -> '${transformed}'`);
      return transformed || null;
    }
    default:
      console.warn(`Unknown enum type: '${enumType}' with value: '${value}'`);
      return null;
  }
}

async function main() {
  try {
    // Skip country seeding since they're already in the database
    console.log('Countries already seeded, skipping country creation...');

    // Read services data from JSON file
    const servicesDataPath = path.join(__dirname, '..', 'SMM_DATA_WW.json');
    const servicesData: Welcome[] = JSON.parse(
      fs.readFileSync(servicesDataPath, 'utf-8')
    );

    console.log('Seeding services...');
    for (const serviceData of servicesData) {
      const { servicePlans, country, ...serviceDetails } = serviceData;

      // Transform enum fields
      const transformedServiceDetails = {
        ...serviceDetails,
        createdAt: new Date(serviceDetails.createdAt),
        updatedAt: new Date(serviceDetails.updatedAt),
        type: transformEnumValue(serviceDetails.type, 'ServiceType'),
        platform: transformEnumValue(serviceDetails.platform, 'Platform'),
        category: transformEnumValue(
          serviceDetails.category,
          'ServiceCategory'
        ),
        deliverySpeed: transformEnumValue(
          serviceDetails.deliverySpeed,
          'DeliverySpeed'
        ),
        targetInputType: transformEnumValue(
          serviceDetails.targetInputType,
          'TargetInputType'
        ),
      };

      // Validate enum transformations
      if (
        !transformedServiceDetails.type ||
        !transformedServiceDetails.platform ||
        !transformedServiceDetails.category ||
        !transformedServiceDetails.deliverySpeed ||
        !transformedServiceDetails.targetInputType
      ) {
        console.warn(`Invalid enum value in service: ${serviceDetails.name}`);
        continue; // Skip this service
      }

      // First verify if the country exists in the database
      if (country) {
        const countryExists = await prisma.country.findUnique({
          where: { iso2: country.connect.iso2 },
        });
        if (!countryExists) {
          console.warn(
            `Country with iso2 ${country.connect.iso2} not found in database for service: ${serviceDetails.name}`
          );
          continue; // Skip this service if country doesn't exist
        }
      }

      // Upsert Service using thirdPartyServiceId as the unique identifier
      const service = await prisma.service.upsert({
        where: { thirdPartyServiceId: serviceDetails.thirdPartyServiceId },
        update: {},
        create: {
          name: transformedServiceDetails.name,
          description: transformedServiceDetails.description,
          features: transformedServiceDetails.features,
          basePrice: transformedServiceDetails.basePrice,
          type: transformedServiceDetails.type as ServiceType,
          platform: transformedServiceDetails.platform as Platform,
          category: transformedServiceDetails.category as ServiceCategory,
          deliverySpeed:
            transformedServiceDetails.deliverySpeed as DeliverySpeed,
          targetInputType:
            transformedServiceDetails.targetInputType as TargetInputType,
          supportsCancel: transformedServiceDetails.supportsCancel,
          supportsRefill: transformedServiceDetails.supportsRefill,
          supportsDripFeed: transformedServiceDetails.supportsDripFeed,
          isActive: transformedServiceDetails.isActive,
          thirdPartyServiceId: transformedServiceDetails.thirdPartyServiceId,
          createdAt: transformedServiceDetails.createdAt,
          updatedAt: transformedServiceDetails.updatedAt,
          country: country
            ? { connect: { iso2: country.connect.iso2 } }
            : undefined,
        },
      });

      // Upsert Service Plans
      for (const plan of servicePlans) {
        // Transform enum fields in ServicePlan
        const transformedPlan = {
          ...plan,
          deliverySpeed: transformEnumValue(
            plan.deliverySpeed,
            'DeliverySpeed'
          ),
          startTime: transformEnumValue(plan.startTime, 'StartTime'),
          retention: transformEnumValue(plan.retention, 'Retention'),
        };

        // Validate enum transformations
        if (
          !transformedPlan.deliverySpeed ||
          !transformedPlan.startTime ||
          !transformedPlan.retention
        ) {
          console.warn(
            `Invalid enum value in service plan for service: ${serviceDetails.name}`
          );
          continue; // Skip this service plan
        }

        await prisma.servicePlan.upsert({
          where: {
            serviceId_count: {
              serviceId: service.id,
              count: transformedPlan.count,
            },
          },
          update: {},
          create: {
            service: { connect: { id: service.id } },
            count: transformedPlan.count,
            price: transformedPlan.price,
            captchaRequired: transformedPlan.captchaRequired,
            deliverySpeed: transformedPlan.deliverySpeed as DeliverySpeed,
            disabled: transformedPlan.disabled,
            discount: transformedPlan.discount,
            guaranteeDays: transformedPlan.guaranteeDays,
            guaranteePrice: transformedPlan.guaranteePrice,
            duration: transformedPlan.duration,
            startTime: transformedPlan.startTime as StartTime | null,
            retention: transformedPlan.retention as Retention | null,
          },
        });
      }
    }
    console.log('Services seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
