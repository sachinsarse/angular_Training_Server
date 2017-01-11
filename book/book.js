var _ = require('lodash');
var books = require('./bookData');

module.exports = function (app) {
    app.get('/api/books', function (req, res) {
        res.json(books);
    });
    app.post('/api/books', function (req, res) {
        var book = req.body;
        books.push({
            id: new Date().getUTCMilliseconds(),
            title: book.title,
            year: book.year,
            favorite: book.favorite
        });
        res.sendStatus(200);
    });
    app.put('/api/books', function (req, res) {
        var book = req.body;
        var index = _.findIndex(books, { id: book.id });
        if (index > -1) {
            books[index].title = book.title;
            books[index].year = book.year;
            books[index].favorite = book.favorite;
            res.sendStatus(200);
            return;
        }
        res.status(404).end(`{
            "error": {
                "code": "404",
                "message": "Something is wrong"
            }
        }`);
    });
    app.get('/api/book/:id', function (req, res) {
        var id = parseInt(req.params.id);
        console.log('books', books);
        var index = _.findIndex(books, { id: id });
        if (index > -1) {
            res.json(books[index]);
            return;
        }
        res.status(404).end(`{
            "error": {
                "code": "404",
                "message": "Something is wrong"
            }
        }`);
    })
    app.delete('/api/book/:id', function (req, res) {
        var id = parseInt(req.params.id);
        var index = _.findIndex(books, { id: id });
        console.log('index', index);
        if (index > -1) {
            books.splice(index, 1);
            console.log('books', books);
            res.sendStatus(200);
            return;
        }
        res.status(404).end(`{
            "error": {
                "code": "404",
                "message": "Something is wrong"
            }
        }`);
    });
};
