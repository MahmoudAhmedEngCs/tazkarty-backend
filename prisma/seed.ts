
import bcrypt from "bcrypt";
import { prisma } from "../src/infrastructure/database/prisma";


const teams = [
  {
    name: "Al Ahly",
    logo: "https://example.com/logos/al-ahly.png",
    stadiumName: "Cairo Stadium",
  },
  {
    name: "Zamalek",
    logo: "https://example.com/logos/zamalek.png",
    stadiumName: "Cairo Stadium",
  },
  {
    name: "Pyramids FC",
    logo: "https://example.com/logos/pyramids.png",
    stadiumName: "Pyramids Stadium",
  },
  {
    name: "Al Masry",
    logo: "https://example.com/logos/al-masry.png",
    stadiumName: "Borg El Arab Stadium",
  },
  {
    name: "Ismaily",
    logo: "https://example.com/logos/ismaily.png",
    stadiumName: "Ismailia Stadium",
  },
  {
    name: "Future FC",
    logo: "https://example.com/logos/future.png",
    stadiumName: "Al Salam Stadium",
  },
  {
    name: "ENPPI",
    logo: "https://example.com/logos/enppi.png",
    stadiumName: "Petro Sport Stadium",
  },
  {
    name: "Ceramica Cleopatra",
    logo: "https://example.com/logos/ceramica.png",
    stadiumName: "Cairo Stadium",
  },
  {
    name: "Smouha",
    logo: "https://example.com/logos/smouha.png",
    stadiumName: "Alexandria Stadium",
  },
  {
    name: "Al Ittihad",
    logo: "https://example.com/logos/al-ittihad.png",
    stadiumName: "Alexandria Stadium",
  },
];

const stadiums = [
  "Cairo Stadium",
  "Pyramids Stadium",
  "Borg El Arab Stadium",
  "Ismailia Stadium",
  "Al Salam Stadium",
  "Petro Sport Stadium",
  "Alexandria Stadium",
];

const sectionTemplates = [
  { name: "A", price: 150 },
  { name: "B", price: 200 },
  { name: "VIP", price: 500 },
];

const seatsPerSection = 20;

async function main() {
  console.log("🌱 Seeding database...");

  // -------------------------
  // Stadiums
  // -------------------------

  for (const stadiumName of stadiums) {
    await prisma.stadium.upsert({
      where: {
        name: stadiumName,
      },
      update: {},
      create: {
        name: stadiumName,
      },
    });
  }

  // -------------------------
  // Teams
  // -------------------------

  for (const team of teams) {
    await prisma.team.upsert({
      where: {
        name: team.name,
      },
      update: {
        logo: team.logo,
        stadium_name: team.stadiumName,
      },
      create: {
        name: team.name,
        logo: team.logo,
        stadium_name: team.stadiumName,
      },
    });
  }

  // -------------------------
  // Sections + Seats
  // -------------------------

  for (const stadiumName of stadiums) {
    for (const section of sectionTemplates) {
      await prisma.section.upsert({
        where: {
          stadium_name_name: {
            stadium_name: stadiumName,
            name: section.name,
          },
        },
        update: {
          price: section.price,
        },
        create: {
          stadium_name: stadiumName,
          name: section.name,
          price: section.price,
        },
      });

      for (let i = 1; i <= seatsPerSection; i++) {
        const seatName = `${section.name}${i}`;

        await prisma.seat.upsert({
          where: {
            stadium_name_section_name_name: {
              stadium_name: stadiumName,
              section_name: section.name,
              name: seatName,
            },
          },
          update: {},
          create: {
            stadium_name: stadiumName,
            section_name: section.name,
            name: seatName,
          },
        });
      }
    }
  }

  // -------------------------
  // Users
  // -------------------------

  const passwordHash = await bcrypt.hash("Password123!", 12);

  const user1 = await prisma.user.upsert({
    where: {
      phone_number: "01011111111",
    },
    update: {},
    create: {
      name: "Demo User",
      phone_number: "01011111111",
      password: passwordHash,
      role: "USER",
    },
  });

  const user2 = await prisma.user.upsert({
    where: {
      phone_number: "01111111111",
    },
    update: {},
    create: {
      name: "Demo User 2",
      phone_number: "01111111111",
      password: passwordHash,
      role: "USER",
    },
  });

  // -------------------------
  // Matches
  // -------------------------

  const now = new Date();

  const matchesData = [
    {
      match_datetime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
      home_team_name: "Al Ahly",
      away_team_name: "Zamalek",
      stadium_name: "Cairo Stadium",
    },
    {
      match_datetime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
      home_team_name: "Pyramids FC",
      away_team_name: "Al Masry",
      stadium_name: "Pyramids Stadium",
    },
    {
      match_datetime: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000),
      home_team_name: "Ismaily",
      away_team_name: "Future FC",
      stadium_name: "Ismailia Stadium",
    },
    {
      match_datetime: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
      home_team_name: "ENPPI",
      away_team_name: "Smouha",
      stadium_name: "Petro Sport Stadium",
    },
    {
      match_datetime: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      home_team_name: "Al Ittihad",
      away_team_name: "Ceramica Cleopatra",
      stadium_name: "Alexandria Stadium",
    },

    // Past matches
    {
      match_datetime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      home_team_name: "Al Ahly",
      away_team_name: "Pyramids FC",
      stadium_name: "Cairo Stadium",
    },
    {
      match_datetime: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      home_team_name: "Zamalek",
      away_team_name: "Al Masry",
      stadium_name: "Cairo Stadium",
    },
  ];

  const matches = [];

  for (const matchData of matchesData) {
    const match = await prisma.football_match.create({
      data: matchData,
    });

    matches.push(match);
  }

  // -------------------------
  // Demo tickets
  // -------------------------

  await prisma.ticket.create({
    data: {
      user_id: user1.id,
      match_id: matches[0].id,
      seat_name: "A1",
      section_name: "A",
      stadium_name: "Cairo Stadium",
    },
  });

  await prisma.ticket.create({
    data: {
      user_id: user2.id,
      match_id: matches[0].id,
      seat_name: "A2",
      section_name: "A",
      stadium_name: "Cairo Stadium",
    },
  });

  await prisma.ticket.create({
    data: {
      user_id: user1.id,
      match_id: matches[1].id,
      seat_name: "VIP1",
      section_name: "VIP",
      stadium_name: "Pyramids Stadium",
    },
  });

  console.log("✅ Seed completed successfully");
  console.log(`👤 Demo User: ${user1.phone_number}`);
  console.log(`🔑 Demo Password: Password123!`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });