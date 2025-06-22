// server/prisma/clear-database.ts

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// 它会加载项目根目录下的 .env 文件
dotenv.config(); 

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to clear the database...');

  const deletedStreamRecords = await prisma.streamRecord.deleteMany({});
  console.log(`- Deleted ${deletedStreamRecords.count} stream records.`);

  // 2. Delete all Song entries.
  // These records depend on Artists, so they are deleted next.
  const deletedSongs = await prisma.song.deleteMany({});
  console.log(`- Deleted ${deletedSongs.count} songs.`);

  // 3. Finally, delete all Artist entries.
  // These are at the top of this dependency chain.
  const deletedArtists = await prisma.artist.deleteMany({});
  console.log(`- Deleted ${deletedArtists.count} artists.`);

  console.log('\nDatabase has been successfully cleared!');
}

// Execute the main function and handle potential errors.
main()
  .catch((e) => {
    console.error('An error occurred while clearing the database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure the database connection is closed.
    await prisma.$disconnect();
  });
