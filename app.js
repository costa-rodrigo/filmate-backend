let dotenv = require('dotenv').config();
let express = require('express');
let app = express();
let path = require('path');

const axios = require('axios');

app.use(express.static('public'));

app.use(express.json());

// parse the body of the request
app.use(express.urlencoded({extended:true}));


app.set('port', process.env.PORT || 8080);

let server = app.listen(app.settings.port, () => {
console.log('Server ready on ', app.settings.port);
});

const apiKey = process.env.API_KEY;

// initializing default genre id = 'action'
let genreId = '28';

// initializing default mood
let moodName = '';

// base url to retrieve the movies
let url= `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_providers=8&watch_region=CA`

// sets the quality/size of the poster. Can also be set to 'original'
let poster="http://image.tmdb.org/t/p/w500"

// get all the available genres endpoint
app.get('/genres', (req,res)=>{

    let url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

    axios.get(url_genres)
        .then(results=>{

            let genresArray = results.data.genres;
            res.status(200).send(genresArray);
        })
        .catch(error => console.log('Error', error));
});

// get movies endpoint
app.get('/movies', (req,res)=>{
    
    axios.get(url)
        .then(results=>{

            let moviesArray = []
            let posterPath = ""
            let movie_id = ""

            results.data.results.forEach(async resultsArray=> {

                posterPath = `${poster}` + resultsArray.poster_path;
                movie_id = resultsArray.id;

                moviesArray.push ({
                    backdrop_path: resultsArray.backdrop_path,
                    id: movie_id,
                    genre_ids: resultsArray.genre_ids,
                    title: resultsArray.title,
                    overview: resultsArray.overview,
                    release_date: resultsArray.release_date,
                    vote_average: resultsArray.vote_average,
                    poster_path: posterPath
                });

            });
            res.status(200).send(moviesArray);
        })
        .catch(error => console.log('Error', error));
})

// get movies by genre endpoint
app.post('/movies', (req,res)=>{
    genreId = req.body;
    url= `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_providers=8&watch_region=CA`
    axios.get(url)
        .then(results=>{
            let moviesArray = []
            let posterPath = ""
            let movie_id = ""
            results.data.results.forEach(resultsArray=> {
                 posterPath = `${poster}` + resultsArray.poster_path;
                 moviesArray.push ({
                    backdrop_path: resultsArray.backdrop_path,
                    id: movie_id,
                    genre_ids: resultsArray.genre_ids,
                    title: resultsArray.title,
                    overview: resultsArray.overview,
                    release_date: resultsArray.release_date,
                    vote_average: resultsArray.vote_average,
                    poster_path: posterPath
                 });
             });
             res.status(200).send(moviesArray);
        })
        .catch(error => console.log('Error', error));
})

// get movies by mood endpoint
app.post('/mood', (req,res)=>{
    moodName = req.body;

    if (moodName == 'happy') {
        genreId = '35|14'
    } else if (moodName == 'dateNight') {
        genreId = '18|10749'
    } else if (moodName == 'adrenalineRush') {
        genreId = '28|12'
    } else if (moodName == 'artsy') {
        genreId = '10402'
    } else if (moodName == 'hiTech') {
        genreId = '878'
    } else if (moodName == 'inspiring') {
        genreId = '18|10752'
    } else if (moodName == 'forTheKids') {
        genreId = '10751'
    } else if (moodName == 'curiousMysteries') {
        genreId = '53|80'
    }

    url= `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_providers=8&watch_region=CA`
    axios.get(url)
        .then(results=>{
            let moviesArray = []
            let posterPath = ""
            let movie_id = ""
            results.data.results.forEach(resultsArray=> {
                 posterPath = `${poster}` + resultsArray.poster_path;
                 moviesArray.push ({
                    backdrop_path: resultsArray.backdrop_path,
                    id: movie_id,
                    genre_ids: resultsArray.genre_ids,
                    title: resultsArray.title,
                    overview: resultsArray.overview,
                    release_date: resultsArray.release_date,
                    vote_average: resultsArray.vote_average,
                    poster_path: posterPath
                 });
             });
             res.status(200).send(moviesArray);
        })
        .catch(error => console.log('Error', error));
})

app.get('/*', (req,res)=>{
   res.status(404).sendFile(path.join(__dirname, 'public/pages', '404.html'));
});