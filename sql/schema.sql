-- =========================================
-- Stadium
-- =========================================

CREATE TABLE stadium (
    name VARCHAR(100) PRIMARY KEY
);


-- =========================================
-- Section
-- Section identity = (stadium_name, name)
-- =========================================

CREATE TABLE section (
    stadium_name VARCHAR(100),
    name VARCHAR(100),
    price NUMERIC(10, 2) NOT NULL,

    PRIMARY KEY (stadium_name, name),

    FOREIGN KEY (stadium_name)
        REFERENCES stadium(name)
);


-- =========================================
-- Seat
-- Seat identity = (stadium_name, section_name, name)
-- Example: Cairo Stadium + VIP + A15
-- =========================================

CREATE TABLE seat (
    name VARCHAR(10) NOT NULL,
    section_name VARCHAR(100) NOT NULL,
    stadium_name VARCHAR(100) NOT NULL,

    PRIMARY KEY (stadium_name, section_name, name),

    FOREIGN KEY (stadium_name, section_name)
        REFERENCES section(stadium_name, name)
);


-- =========================================
-- Team
-- =========================================

CREATE TABLE team (
    name VARCHAR(100) PRIMARY KEY,
    logo VARCHAR(255) NOT NULL,
    stadium_name VARCHAR(100) NOT NULL,

    FOREIGN KEY (stadium_name)
        REFERENCES stadium(name)
);


-- =========================================
-- Football Match
-- =========================================

CREATE TABLE football_match (
    id INT PRIMARY KEY,
    match_datetime TIMESTAMP NOT NULL,

    home_team_name VARCHAR(100) NOT NULL,
    away_team_name VARCHAR(100) NOT NULL,

    stadium_name VARCHAR(100) NOT NULL,

    FOREIGN KEY (home_team_name)
        REFERENCES team(name),

    FOREIGN KEY (away_team_name)
        REFERENCES team(name),

    FOREIGN KEY (stadium_name)
        REFERENCES stadium(name)
);


-- =========================================
-- User
-- =========================================

CREATE TABLE "user" (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL 
);


-- =========================================
-- Ticket
-- =========================================

CREATE TABLE ticket (
    id INT PRIMARY KEY,

    user_id INT NOT NULL,
    match_id INT NOT NULL,

    seat_name VARCHAR(10) NOT NULL,
    section_name VARCHAR(100) NOT NULL,
    stadium_name VARCHAR(100) NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES "user"(id),

    FOREIGN KEY (match_id)
        REFERENCES football_match(id),

    FOREIGN KEY (stadium_name, section_name, seat_name)
        REFERENCES seat(stadium_name, section_name, name),

);


ALTER TABLE football_match
ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE "user"
ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE ticket
ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

   DELETE FROM "user" u
WHERE NOT EXISTS (
    SELECT 1
    FROM ticket t
    WHERE t.user_id = u.id
);