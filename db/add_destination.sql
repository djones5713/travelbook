insert into users_destinations ( user_id, date, destination_id)
values ( $1, $2, $3);




select * from users_destinations
join destinations
on destinations.destination_id = users_destinations.destination_id
where users_destinations.user_id = $1;
