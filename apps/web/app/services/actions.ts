'use server';

import { database } from '@repo/database';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

const action = createSafeActionClient();

export const getServices = action.action(async () => {
  try {
    const services = await database.service.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { services };
  } catch (error) {
    return { error: 'Failed to fetch services' };
  }
});

export const filterServices = action
  .schema(
    z.object({
      platform: z.string().nullable(),
      type: z.string().nullable(),
    })
  )
  .action(async ({ platform, type }) => {
    try {
      const services = await database.service.findMany({
        where: {
          AND: [
            platform ? { platform: platform } : {},
            type ? { type: type } : {},
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { services };
    } catch (error) {
      return { error: 'Failed to filter services' };
    }
  });

export const createOrder = action
  .schema(
    z.object({
      serviceId: z.string(),
      quantity: z.number().min(1),
      targetUsername: z.string(),
    })
  )
  .action(async ({ serviceId, quantity, targetUsername }) => {
    try {
      const order = await database.order.create({
        data: {
          serviceId,
          quantity,
          targetUsername,
          status: 'PENDING',
        },
      });

      return { order };
    } catch (error) {
      return { error: 'Failed to create order' };
    }
  });
