-- The table that references the other must be dropped first

drop table if exists users;

create table users(
    user_id serial primary key,
    username varchar(40) not null,
    password text not null,
    email text not null
)

insert into users(username, password, email)
values
('Destiny', 'djones', 'djones5713@gmail.com');



