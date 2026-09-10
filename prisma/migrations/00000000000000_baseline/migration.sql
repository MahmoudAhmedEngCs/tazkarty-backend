-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "football_match" (
    "id" SERIAL NOT NULL,
    "match_datetime" TIMESTAMP(6) NOT NULL,
    "home_team_name" VARCHAR(100) NOT NULL,
    "away_team_name" VARCHAR(100) NOT NULL,
    "stadium_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "football_match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "name" VARCHAR(10) NOT NULL,
    "section_name" VARCHAR(100) NOT NULL,
    "stadium_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("stadium_name","section_name","name")
);

-- CreateTable
CREATE TABLE "section" (
    "stadium_name" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("stadium_name","name")
);

-- CreateTable
CREATE TABLE "stadium" (
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "stadium_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "team" (
    "name" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "stadium_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "match_id" INTEGER NOT NULL,
    "seat_name" VARCHAR(10) NOT NULL,
    "section_name" VARCHAR(100) NOT NULL,
    "stadium_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_unique_check" ON "ticket"("match_id", "stadium_name", "section_name", "seat_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- AddForeignKey
ALTER TABLE "football_match" ADD CONSTRAINT "football_match_away_team_name_fkey" FOREIGN KEY ("away_team_name") REFERENCES "team"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "football_match" ADD CONSTRAINT "football_match_home_team_name_fkey" FOREIGN KEY ("home_team_name") REFERENCES "team"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "football_match" ADD CONSTRAINT "football_match_stadium_name_fkey" FOREIGN KEY ("stadium_name") REFERENCES "stadium"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_stadium_name_section_name_fkey" FOREIGN KEY ("stadium_name", "section_name") REFERENCES "section"("stadium_name", "name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_stadium_name_fkey" FOREIGN KEY ("stadium_name") REFERENCES "stadium"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_stadium_name_fkey" FOREIGN KEY ("stadium_name") REFERENCES "stadium"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "football_match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_stadium_name_section_name_seat_name_fkey" FOREIGN KEY ("stadium_name", "section_name", "seat_name") REFERENCES "seat"("stadium_name", "section_name", "name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
