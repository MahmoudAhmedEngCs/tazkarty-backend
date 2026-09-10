-- =========================================
-- SEED DATA
-- =========================================

-- =========================================
-- 1. Stadiums
-- =========================================

INSERT INTO stadium (name)
VALUES
    ('Cairo Stadium'),
    ('Borg El Arab Stadium'),
    ('New Suez Stadium');


-- =========================================
-- 2. Sections
-- 3 sections for each stadium
-- =========================================

INSERT INTO section (stadium_name, name, price)
VALUES
    -- Cairo Stadium
    ('Cairo Stadium', 'VIP', 500.00),
    ('Cairo Stadium', 'A', 300.00),
    ('Cairo Stadium', 'B', 150.00),

    -- Borg El Arab Stadium
    ('Borg El Arab Stadium', 'VIP', 600.00),
    ('Borg El Arab Stadium', 'A', 350.00),
    ('Borg El Arab Stadium', 'B', 200.00),

    -- New Suez Stadium
    ('New Suez Stadium', 'VIP', 400.00),
    ('New Suez Stadium', 'A', 250.00),
    ('New Suez Stadium', 'B', 120.00);


-- =========================================
-- 3. Seats
-- Example:
-- Cairo Stadium + VIP + A1
-- Cairo Stadium + VIP + A2
-- =========================================

INSERT INTO seat (name, section_name, stadium_name)
VALUES

    -- Cairo Stadium
    ('A1', 'VIP', 'Cairo Stadium'),
    ('A2', 'VIP', 'Cairo Stadium'),
    ('A3', 'VIP', 'Cairo Stadium'),

    ('B1', 'A', 'Cairo Stadium'),
    ('B2', 'A', 'Cairo Stadium'),
    ('B3', 'A', 'Cairo Stadium'),

    ('C1', 'B', 'Cairo Stadium'),
    ('C2', 'B', 'Cairo Stadium'),
    ('C3', 'B', 'Cairo Stadium'),

    -- Borg El Arab Stadium
    ('A1', 'VIP', 'Borg El Arab Stadium'),
    ('A2', 'VIP', 'Borg El Arab Stadium'),
    ('A3', 'VIP', 'Borg El Arab Stadium'),

    ('B1', 'A', 'Borg El Arab Stadium'),
    ('B2', 'A', 'Borg El Arab Stadium'),
    ('B3', 'A', 'Borg El Arab Stadium'),

    ('C1', 'B', 'Borg El Arab Stadium'),
    ('C2', 'B', 'Borg El Arab Stadium'),
    ('C3', 'B', 'Borg El Arab Stadium'),

    -- New Suez Stadium
    ('A1', 'VIP', 'New Suez Stadium'),
    ('A2', 'VIP', 'New Suez Stadium'),
    ('A3', 'VIP', 'New Suez Stadium'),

    ('B1', 'A', 'New Suez Stadium'),
    ('B2', 'A', 'New Suez Stadium'),
    ('B3', 'A', 'New Suez Stadium'),

    ('C1', 'B', 'New Suez Stadium'),
    ('C2', 'B', 'New Suez Stadium'),
    ('C3', 'B', 'New Suez Stadium');


-- =========================================
-- 4. Teams
-- =========================================

INSERT INTO team (name, logo, stadium_name)
VALUES
    ('Al Ahly', 'al-ahly.png', 'Cairo Stadium'),
    ('Zamalek', 'zamalek.png', 'Borg El Arab Stadium'),
    ('Pyramids FC', 'pyramids.png', 'New Suez Stadium');


-- =========================================
-- 5. Users
-- =========================================

INSERT INTO "user" (name, password, phone_number)
VALUES
    ('Mahmoud', 'password123', '01000000001'),
    ('Ahmed', 'password456', '01000000002'),
    ('Omar', 'password789', '01000000003');


-- =========================================
-- 6. Matches
-- =========================================

-- Match 1
-- Al Ahly vs Zamalek
-- Cairo Stadium
INSERT INTO football_match (
    match_datetime,
    home_team_name,
    away_team_name,
    stadium_name
)
VALUES (
    '2026-09-01 20:00:00',
    'Al Ahly',
    'Zamalek',
    'Cairo Stadium'
);

-- Match 2
-- Zamalek vs Pyramids FC
-- Borg El Arab Stadium
INSERT INTO football_match (
    match_datetime,
    home_team_name,
    away_team_name,
    stadium_name
)
VALUES (
    '2026-09-10 19:00:00',
    'Zamalek',
    'Pyramids FC',
    'Borg El Arab Stadium'
);

-- Match 3
-- Pyramids FC vs Al Ahly
-- New Suez Stadium
INSERT INTO football_match (
    match_datetime,
    home_team_name,
    away_team_name,
    stadium_name
)
VALUES (
    '2026-09-20 21:00:00',
    'Pyramids FC',
    'Al Ahly',
    'New Suez Stadium'
);

INSERT INTO ticket (
    user_id,
    match_id,
    seat_name,
    section_name,
    stadium_name
)
VALUES
    (
        1,
        1,
        'A1',
        'VIP',
        'Cairo Stadium'
    ),
    (
        2,
        1,
        'A2',
        'VIP',
        'Cairo Stadium'
    ),
    (
        3,
        2,
        'A1',
        'VIP',
        'Borg El Arab Stadium'
    );

SELECT 'stadium' AS table_name, COUNT(*) FROM stadium
UNION ALL
SELECT 'section', COUNT(*) FROM section
UNION ALL
SELECT 'seat', COUNT(*) FROM seat
UNION ALL
SELECT 'team', COUNT(*) FROM team
UNION ALL
SELECT 'football_match', COUNT(*) FROM football_match
UNION ALL
SELECT 'user', COUNT(*) FROM "user";

