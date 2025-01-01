import { InstagramClient } from '../lib/instagram-client';

async function testInstagramClient() {
  const client = new InstagramClient();

  console.log('🔍 Fetching user ID for Instagram username: my50centamazonfba');
  const userId = await client.getUserIdFromUsername('my50centamazonfba');

  if (userId) {
    console.log('✅ Success! User ID found:');
    console.log('Username: my50centamazonfba');
    console.log('User ID:', userId);
  } else {
    console.log('❌ Could not find user ID for username: my50centamazonfba');
  }
}

// Run the test
testInstagramClient().catch((error) => {
  console.error('Error running test:', error);
});
