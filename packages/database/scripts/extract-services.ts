import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

enum Platform {
  INSTAGRAM = 'INSTAGRAM',
  TIKTOK = 'TIKTOK',
  YOUTUBE = 'YOUTUBE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  THREADS = 'THREADS',
}

enum ServiceType {
  FOLLOWERS = 'FOLLOWERS',
  LIKES = 'LIKES',
  COMMENTS = 'COMMENTS',
  VIEWS = 'VIEWS',
  SHARES = 'SHARES',
  GROWTH_PACKAGE = 'GROWTH_PACKAGE',
  SUBSCRIBERS = 'SUBSCRIBERS',
}

enum ServiceCategory {
  PREMIUM_SERVICES = 'PREMIUM_SERVICES',
  GROWTH_PACKAGES = 'GROWTH_PACKAGES',
  STORY_SERVICES = 'STORY_SERVICES',
  ENGAGEMENT_SERVICES = 'ENGAGEMENT_SERVICES',
}

interface RawService {
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

interface ProcessedService {
  service: number;
  name: string;
  description: string;
  type: string;
  rate: string;
  min: string;
  max: string;
  features: {
    dripfeed: boolean;
    refill: boolean;
    refillDays?: number;
    startTime?: string;
    speed?: string;
    quality?: string;
  };
  platform: Platform;
  serviceType: ServiceType;
  category: ServiceCategory;
}

function processRawData(rawData: any) {
  const services: RawService[] = [];

  // Process Instagram services
  if (rawData.data.Instagram) {
    for (const [serviceType, serviceData] of Object.entries(
      rawData.data.Instagram
    )) {
      if (serviceData.plans) {
        for (const plan of serviceData.plans) {
          for (const [typeKey, typeData] of Object.entries(plan.types)) {
            if (typeData.disabled === '0') {
              services.push({
                service: `instagram_${serviceType.toLowerCase()}_${typeData.name.toLowerCase()}_${plan.count}`,
                name: `Instagram ${serviceType} - ${typeData.name}`,
                type: typeData.name === 'Premium' ? 'Premium' : 'Default',
                rate: typeData.price,
                min: plan.count,
                max: plan.count,
                dripfeed: false,
                refill: true,
                cancel: false,
                category: serviceType,
              });
            }
          }
        }
      }
    }
  }

  // Process YouTube services
  if (rawData.data.YouTube) {
    for (const [serviceType, serviceData] of Object.entries(
      rawData.data.YouTube
    )) {
      if (serviceData.plans) {
        for (const plan of serviceData.plans) {
          for (const [typeKey, typeData] of Object.entries(plan.types)) {
            if (typeData.disabled === '0') {
              services.push({
                service: `youtube_${serviceType.toLowerCase()}_${typeData.name.toLowerCase()}_${plan.count}`,
                name: `YouTube ${serviceType} - ${typeData.name}`,
                type: typeData.name === 'Premium' ? 'Premium' : 'Default',
                rate: typeData.price,
                min: plan.count,
                max: plan.count,
                dripfeed: false,
                refill: true,
                cancel: false,
                category: serviceType,
              });
            }
          }
        }
      }
    }
  }

  return services;
}

// Read the raw data
const rawData = JSON.parse(
  readFileSync(join(__dirname, '../data.json'), 'utf-8')
);
const services = processRawData(rawData);

// Write the processed services
writeFileSync(
  join(__dirname, '../services.json'),
  JSON.stringify({ services }, null, 2)
);

console.log('Services extracted and processed successfully!');
