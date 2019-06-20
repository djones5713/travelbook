select * from users_destinations where user_id = $1;

join destinations
on destinations.destination_id = users_destinations.destination_id
where users_destinations.user_id = $1;