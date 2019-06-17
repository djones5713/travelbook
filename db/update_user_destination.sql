update users_destinations
set date= $2
where user_id = $1;

select * from users_destinations;