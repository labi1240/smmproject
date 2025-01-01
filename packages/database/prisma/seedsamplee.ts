import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  DeliverySpeed,
  Platform,
  PrismaClient,
  ServiceCategory,
  ServiceType,
  TargetInputType,
} from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to transform enum values
function transformEnumValue(
  value: string,
  enumType: string
):
  | Platform
  | ServiceType
  | ServiceCategory
  | DeliverySpeed
  | TargetInputType
  | string
  | null {
  if (!value) return null;

  switch (enumType) {
    case 'Platform': {
      // Convert to uppercase and ensure it matches the enum
      const platformValue = value.toUpperCase() as keyof typeof Platform;
      return Platform[platformValue];
    }
    case 'ServiceType': {
      // Convert to uppercase and ensure it matches the enum
      const typeValue = value.toUpperCase() as keyof typeof ServiceType;
      if (typeValue === 'OTHER') {
        return ServiceType.OTHER;
      }
      return ServiceType[typeValue];
    }
    case 'ServiceCategory': {
      // Convert to uppercase and ensure it matches the enum
      const categoryValue = value.toUpperCase() as keyof typeof ServiceCategory;
      return ServiceCategory[categoryValue];
    }
    case 'DeliverySpeed': {
      // Convert to uppercase and ensure it matches the enum
      const speedValue = value.toUpperCase() as keyof typeof DeliverySpeed;
      return DeliverySpeed[speedValue];
    }
    case 'TargetInputType': {
      // Convert to uppercase and ensure it matches the enum
      const inputTypeValue =
        value.toUpperCase() as keyof typeof TargetInputType;
      return TargetInputType[inputTypeValue];
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
      return timeMap[value] || null;
    }
    case 'Retention': {
      const retentionMap: { [key: string]: string } = {
        Standard: 'Standard',
        Monthly: 'Monthly',
        '~1 Min': 'The1Min',
      };
      return retentionMap[value] || null;
    }
    default:
      return value;
  }
}

async function main() {
  try {
    // Read country data
    const countriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../Country.json'), 'utf-8')
    );

    console.log('Seeding countries...');
    for (const country of countriesData) {
      await prisma.country.upsert({
        where: { iso2: country.iso2 },
        update: {},
        create: {
          name: country.name,
          iso2: country.iso2,
          phone_code: country.phone_code,
          flag: country.flag,
        },
      });
    }
    console.log('Countries seeded successfully');

    // Read service data from sample file
    const servicesData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../sample_data_for_seed.json'),
        'utf-8'
      )
    );

    console.log('Seeding services...');
    for (const serviceData of servicesData) {
      const { servicePlans, country, ...serviceDetails } = serviceData;
      const serviceId = `service-${serviceDetails.thirdPartyServiceId}`;

      // Convert dates from strings to Date objects and transform enum values
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

      // Log the transformed details for debugging
      console.log('Transformed service details:', {
        id: serviceId,
        type: transformedServiceDetails.type,
        platform: transformedServiceDetails.platform,
        category: transformedServiceDetails.category,
        deliverySpeed: transformedServiceDetails.deliverySpeed,
        targetInputType: transformedServiceDetails.targetInputType,
      });

      // Upsert Service
      const service = await prisma.service.upsert({
        where: { id: serviceId },
        update: {},
        create: {
          id: serviceId,
          ...transformedServiceDetails,
          country: country
            ? { connect: { iso2: country.connect.iso2 } }
            : undefined,
        },
      });

      // Upsert Service Plans
      if (servicePlans) {
        for (const plan of servicePlans) {
          const planId = `${service.id}-${plan.count}`;

          // Transform enum values for service plan
          const transformedPlan = {
            ...plan,
            deliverySpeed: transformEnumValue(
              plan.deliverySpeed,
              'DeliverySpeed'
            ),
            startTime: transformEnumValue(plan.startTime, 'StartTime'),
            retention: transformEnumValue(plan.retention, 'Retention'),
          };

          await prisma.servicePlan.upsert({
            where: { id: planId },
            update: {},
            create: {
              id: planId,
              service: { connect: { id: service.id } },
              count: transformedPlan.count,
              price: transformedPlan.price,
              captchaRequired: transformedPlan.captchaRequired,
              deliverySpeed: transformedPlan.deliverySpeed,
              disabled: transformedPlan.disabled || false,
              discount: transformedPlan.discount || false,
              guaranteeDays: transformedPlan.guaranteeDays || null,
              guaranteePrice: transformedPlan.guaranteePrice || null,
              duration: transformedPlan.duration || null,
              startTime: transformedPlan.startTime || null,
              retention: transformedPlan.retention || null,
            },
          });
        }
      }
    }
    console.log('Services seeded successfully');
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
