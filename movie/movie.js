var _ = require('lodash');
var movies = require('./movieData');

module.exports = function (app) {
    app.get('/api/movies', function (req, res) {
        res.json(movies);
    });
    app.post('/api/movies', function (req, res) {
        var movie = req.body;
        movies.push({
            id: new Date().getUTCMilliseconds(),
            title: movie.title,
            year: movie.year,
            favorite: movie.favorite
        });
        res.sendStatus(200);
    });
    app.put('/api/movies', function (req, res) {
        var movie = req.body;
        var index = _.findIndex(movies, { id: movie.id });
        movies[index].title = movie.title;
        movies[index].year = movie.year;
        movies[index].favorite = movie.favorite;
        res.sendStatus(200);
    });
    app.get('/api/movie/:id', function (req, res) {
        var id = parseInt(req.params.id);
        console.log('movies', movies);
        var index = _.findIndex(movies, { id: id });
        if (index > -1) {
            res.json(movies[index]);
            return;
        }
        res.status(404).end(`{
            "error": {
                "code": "404",
                "message": "Invalid User Id"
            }
        }`);
    })
    app.delete('/api/movie/:id', function (req, res) {
        var id = parseInt(req.params.id);
        var index = _.findIndex(movies, { id: id });
        console.log('index', index);
        if (index > -1) {
            movies.splice(index, 1);
            console.log('movies', movies);
            res.send(true);
            return;
        }
        res.send(false);
    });
};
