insert into users_destinations ( user_id, date, destination_id, country, image_url)
values ( $1, $2, $3, $4, $5);

select * from users_destinations where user_id = $1;
