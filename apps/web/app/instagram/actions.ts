'use server';

import { InstagramClient } from '@repo/database/lib/instagram-client';

export async function getInstagramUserId(username: string) {
  try {
    if (!username) {
      return { error: 'Username is required' };
    }

    const client = new InstagramClient();
    const userId = await client.getUserIdFromUsername(username);

    if (!userId) {
      return { error: 'User ID not found' };
    }

    return { userId };
  } catch (error) {
    console.error('Error fetching Instagram user ID:', error);
    return { error: (error as Error).message };
  }
}
