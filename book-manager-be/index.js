const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

app.get('/books',(req,res) => {

    fs.readFile('./books.json',(err,data) => {
        if(err){
            return res.status(404).send('Unable to read file');
        }
        else{
            data = JSON.parse(data);
            if(req.query.author){
                data = data.filter(book => book.author.includes(req.query.author));
            }

            if(req.query.name){
                data = data.filter(book => book.name.includes(req.query.name));
            }

            return res.send(data);
        }
    });

})

app.post('/books',(req,res) => {
    const { body } = req;

    if(!body.name) return res.status(400).send('Book name is required.');
    if(!body.description) return res.status(400).send('Book description is required.');
    if(!body.author) return res.status(400).send('Book author is required.');
    if(!body.copies && isNaN(body.copies)) return res.status(400).send('Number of copies is required.');

    fs.readFile('./books.json', (err,data) => {
        if(err){
            return res.status(404).send('Unable to read file');
        }

        if(JSON.parse(data).find(book => (book.name === body.name && book.author === body.author))){
            return res.status(400).send('Book with same name and author already exists');
        }     
        else {
            let bookList = JSON.parse(data);
            const book = {
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                name: body.name,
                description: body.description,
                author: body.author,
                copies: parseInt(body.copies)
            }

            bookList.push(book);

            fs.writeFile('./books.json', JSON.stringify(bookList), (err) => {
                if(err) return res.status(500).send('Unable to save in file');
                else return res.send("Success");
            });
        }

    })
})

app.put('/books',(req,res) => {

    const { body } = req;
    if(!body.id) return res.status(400).send('Book id is required.');
    if(!body.name) return res.status(400).send('Book name is required.');
    if(!body.description) return res.status(400).send('Book description is required.');
    if(!body.author) return res.status(400).send('Book author is required.');
    if(!body.copies && isNaN(body.copies)) return res.status(400).send('Number of copies is required.');

    fs.readFile('./books.json', (err,data) => {
        if(err){
            return res.status(404).send('Unable to read file');
        }

        if(!JSON.parse(data).find(book => book.id === body.id)){
            return res.status(404).send('Book you are trying to edit does not exists.');
        }
        else {

            let booksList = JSON.parse(data);
            let bookIndex = booksList.findIndex((book => book.id === body.id));
            booksList[bookIndex].name = body.name;
            booksList[bookIndex].author = body.author;
            booksList[bookIndex].copies = body.copies;
            booksList[bookIndex].description = body.description;

            fs.writeFile('./books.json', JSON.stringify(booksList), (err) => {
                if(err) return res.status(500).send('Error Occurred');
                else return res.send("Success");
            })
        }
    });

})

app.delete('/books/:id', (req,res) => {

    fs.readFile('./books.json', (err,data) => {
        if(err){
            return res.status(404).send('Unable to read file');
        }

        if(!JSON.parse(data).find(book => book.id === req.params.id)){
            return res.status(404).send('Book you are trying to delete does not exists.');
        }      
        else{
            let booksList = JSON.parse(data);
            let bookIndex = booksList.findIndex((book => book.id === req.params.id));
            booksList.splice(bookIndex,1);
            fs.writeFile('./books.json', JSON.stringify(booksList), (err) => {
                if(err) return res.status(500).send('Error Occurred');
                else return res.send("Success");
            })
        }

    })

})


const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Listening on port ${port}....`))