


## fontend 

## dependencies 
- axios 
- redux
- react-redux
- react-router-dom (BrowserRouter)
- react-incons/fa
- http-proxy-middleware
- redux-promise-middleware

## file-structure 
- src 
 - components/
 - TravelPage/
    - TravelPage.js
    - TravelPage.css
 - ExplorePage/
    - ExplorePage.js
    - ExplorePage.css
        - Header/ 
            - Header.js
            - Header.css
        - TravelCard/
           - TravelCard.js
           - TravelCard.css

  - Dashboard/
    - Dashboard.js
    - Dashboard.css
        Header/ 
            - Header.js
            - Header.css
        EventList/
            - EventsList.js
            - EventsList.css
        UserCard/
            - UserCard.js
            - UserCard.css
        Schedule/
            - Schedule.js
            - Schedule.css
 - App.js
 - Index.js 
 - reset.css
 - duck/
    - store.js
    - reducer.js

### Routes 

## Login Routes
- TravelBook => /
- How It Works => /howitworks

## User Routes
- Explore => /
- Dashboard => /dashboard
- catchAll => '*'

## Redux State 
```js
const initialState = {
    user: null,
    events: []
}

```
    
#backend 

#dependencies 
- express
- massive
- express-session
- bcrypt
- dotenv

# server file structure 
- server/
 - index.js
 - controller/ 
    - authController.js

# endpoints


**auth** 
- login => /api/travelbook/login
- register => /api/travelbook/register 
- userAccount => /api/travelbook/user

**places**

API_KEY =  FyCDzsojFp7SGmRdz2woR6AtWeX91xR81jGkAm8p

Travel Page 
- getAllPlaces => https://api.sygictravelapi.com/1.1/en/places/${id}
Travel Search 
- getAllTours =>  https://api.sygictravelapi.com/1.1/en/places/tours/viator
- getAllCategories => https://api.sygictravelapi.com/1.1/en/places/list?parents=city:1&categories=sightseeing&limit=10
User Dashboard 
- postUserPlaces => /api/travelbook/place/:id
- putUserPlace => /api/travelbook/place/:id
- deleteUserPlaces => /api/travelbook/place/:id


### database 

- users
```sql 

create table users(
    user_id serial primary key,
    username varchar(40) not null,
    password text not null,
    email text not null
)

```

```sql
create table events(
    event_id serial primary key,
    event text not null,
    user_id integer references users(user_id)
);

```

### dotenv

```text

SESSION_SECRET = 
SEVER_PORT = 
CONNECT_STRING = 

```


Notes: Travel Book Pro 
Book  && Pay for travel packages