-- The table that references the other must be dropped first

drop table if exists users;

create table users(
    user_id serial primary key,
    username varchar(40) not null unique,
    password text not null,
    email text not null unique
)

insert into users(username, password, email)
values
('Destiny', 'djones', 'djones5713@gmail.com');



drop table if exists locations;

create table locations(
    location_id serial primary key,
    name varchar(50) not null,
    image_url text not null,
    description text not null
);


insert into  locations(name, image_url, description)
values

('Honolulu, Hawaii', 'https://imgur.com/Qsc6Siw','Beyond Honolulu, Oahu’s landscape includes rainforests,steep ridges, waterfalls and pineapple and sugarcane fields. Ringing the island are scenic villages and beaches such as Hanauma Bay, Kailua Beach, Makaha Beach and Waimea Bay. The North Shore is a quiet, laid-back area where visitors can sample a Hawaiian plate lunch and some shave ice before hitting one of its prime surfing and snorkeling spots.')
('Oahu, Hawaii', 'https://imgur.com/3vBSB9T','Oahu is a U.S. island in the Central Pacific, part of the Hawaiian island chain and home to the state capital, Honolulu. Highlights of the city include historic Chinatown and the Punchbowl, a crater-turned-cemetery. Waikiki is an iconic beach, dining and nightlife area.');