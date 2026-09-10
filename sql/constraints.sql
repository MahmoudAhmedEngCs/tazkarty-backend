--constraint team home_away_check CHECK (home_team_name <> away_team_name)
alter table football_match
    add constraint team_home_away_check CHECK (home_team_name <> away_team_name);



--constraint ticket_unique_check UNIQUE (match_id, stadium_name, section_name, seat_name)
alter table ticket
    add constraint ticket_unique_check UNIQUE (match_id, stadium_name, section_name, seat_name);

  