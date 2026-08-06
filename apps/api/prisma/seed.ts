import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Valeurs Pterodactyl placeholder (eggId/nestId/nodeId) — à remplacer par
// les vrais ids une fois le panel configuré (PTERODACTYL_PANEL_URL / PTERODACTYL_API_KEY).
const games = [
  {
    slug: 'minecraft-java',
    name: 'Minecraft (Java)',
    eggId: 1,
    nestId: 1,
    nodeId: 1,
    dockerImage: 'ghcr.io/pterodactyl/yolks:java_21',
    startup:
      'java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}',
    environment: { SERVER_JARFILE: 'server.jar', VANILLA_VERSION: 'latest' },
    ramMinGo: 2,
    cpuMinCores: 1,
    diskMinGo: 10,
    prix_unitaire_ram: 200,
    prix_unitaire_cpu: 300,
    prix_unitaire_disk: 20,
  },
  {
    slug: 'valheim',
    name: 'Valheim',
    eggId: 2,
    nestId: 2,
    nodeId: 1,
    dockerImage: 'ghcr.io/pterodactyl/yolks:source',
    startup: './valheim_server.x86_64 -name "{{SERVER_NAME}}" -port {{SERVER_PORT}}',
    environment: { SERVER_NAME: 'Mon serveur Valheim' },
    ramMinGo: 4,
    cpuMinCores: 2,
    diskMinGo: 15,
    prix_unitaire_ram: 200,
    prix_unitaire_cpu: 300,
    prix_unitaire_disk: 20,
  },
  {
    slug: 'rust',
    name: 'Rust',
    eggId: 3,
    nestId: 3,
    nodeId: 1,
    dockerImage: 'ghcr.io/pterodactyl/yolks:source',
    startup: './RustDedicated -batchmode +server.port {{SERVER_PORT}}',
    environment: { RUST_SERVER_NAME: 'Mon serveur Rust' },
    ramMinGo: 8,
    cpuMinCores: 4,
    diskMinGo: 25,
    prix_unitaire_ram: 200,
    prix_unitaire_cpu: 300,
    prix_unitaire_disk: 20,
  },
];

async function main() {
  for (const game of games) {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: game,
      create: game,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
