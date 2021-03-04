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

let genreId = ['28'];

let url= `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_providers=8&watch_region=CA`

let poster="http://image.tmdb.org/t/p/w500"

app.get('/genres', (req,res)=>{

    let url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`

    axios.get(url_genres)
        .then(results=>{

            let genresArray = results.data.genres;
            res.status(200).send(genresArray);
        })
        .catch(error => console.log('Error', error));
});

app.get('/movies', (req,res)=>{
    
    axios.get(url)
        .then(results=>{

            let moviesArray = []
            let posterPath = ""
            let movie_id = ""

            results.data.results.forEach(resultsArray=> {

                posterPath = `${poster}` + resultsArray.poster_path;
                movie_id = resultsArray.id;
                let url_cast = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}&language=en-U`

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

app.get('/*', (req,res)=>{
   res.status(404).sendFile(path.join(__dirname, 'public/pages', '404.html'));
});