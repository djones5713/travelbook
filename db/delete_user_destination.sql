delete from users_destinations 
where id = $1;

select * from users_destinations
join destinations
on destinations.destination_id = users_destinations.destination_id
where users_destinations.user_id = $2;


