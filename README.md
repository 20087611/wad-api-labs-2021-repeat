<<<<<<< HEAD
# Assignment 2 - Web API.

Name: Daijie Liu

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + 4 new API routes, including multiple parameterised URLs
 + Mongo and Mongoose integration
 + React integration(GET and POST data to API)
 + Basic Authentication and protected routes
 + Error handling middleware

## Installation Requirements
Get code from GitHub Repo
```bat
https://github.com/20087611/wad-api-labs-2021-repeat.git
```

open a terminal in __movies-api__ folder.  
followed by installation `npm install` to load required packages.  
`npm start` to run the server side of the project.  

## API Configuration
Before running the API, creating an ``.env`` file in the root folder of __movies-api__ and put related variables in it.
```bat
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
seedDb=True
secret=YourJWTSecret
TMDB_KEY=YourTMDBKey
```

## API Design
An overview of the web API design. 

|  | GET | POST | PUT | DELETE |
| -- | -- | -- | -- | -- |
| /api/movies |Get a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A |
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A |
| /api/movies/tmdb/upcoming | Get a list of upcoming movies from TMDB | N/A | N/A | N/A |
| /api/movies/tmdb/nowPlaying | Get a list of now playing movies from TMDB | N/A | N/A | N/A |
| /api/movies/tmdb/popular | Get a list of the current popular movies on TMDB | N/A | N/A | N/A |
| /api/movies/tmdb/topRated | Get a list of top rated movies on TMDB | N/A | N/A | N/A |
| /api/users | Get all users | Register or authenticate a user | N/A | N/A |
| /api/users/{userid} | N/A | N/A | Update a user | N/A |
| /api/users/{username}/favourites | Get favorites of a user | Add a movie to favorites of a user | N/A | N/A |
| /api/users/{username}/likes | Get like persons of a user | Add a person to likes list | N/A | N/A |
| /api/users/{username}/watchlist | Get watchlist of a user | Add a tv to watchlist of a user | N/A | N/A |
| /api/persons | Get a list of popular persons from TMDB | N/A | N/A | N/A |
| /api/persons/{personid} | Get person details by id | N/A | N/A | N/A |
| /api/tvs | Get a list of popular tvs from TMDB | N/A | N/A | N/A |
| /api/tvs/{tvid} | Get tv details by id | N/A | N/A | N/A |
| /api/genres | Get all genres | N/A | N/A | N/A |
| /api/genres/{genreid} | Get genre by id | N/A | N/A | N/A |
| /api/keywords | Get all keywords | N/A | N/A | N/A |
| /api/keywords/{keywordid} | Get keyword by id | N/A | N/A | N/A |
| /api/companies | Get all companies | N/A | N/A | N/A |
| /api/companies/{companyid} | Get company by id | N/A | N/A | N/A |

## Security and Authentication
Public routes
+ /api/users
+ /api/genres
+ /api/keywords
+ /api/companies

Protected routes, can only be accessed when user has logged in.
+ /api/movies
+ /api/persons
+ /api/tvs

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 
This is the link of React App repo from GitHub.  
```bat
git clone https://github.com/20087611/wad2-moviesApp-repeat.git
```
Add the following code to `package.json` file to listen to port 8080
```bat
"proxy":"http://localhost:8080"
```
Then get data from `localhost:8080/` instead of directly from TMDB.
~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

## Independent learning

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  
=======
# Web App Dev 2: Web API Labs
 
>>>>>>> ebc789caba6d2762dc74e36897d541cf22ef95ae
