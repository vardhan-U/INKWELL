const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Book = require('./app');   
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  res.render('index');
});

app.post('/addbook', async (req, res) => {
  try {
    const { author, title, genre, status, rating, review } = req.body;
    const newBook = new Book({
      Author: author,
      Title: title,
      Genre: genre,
      Status: status,
      rating,
      Review: review
    });
    await newBook.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding book');
  }
});

app.get('/insights', async (req, res) => {
  try {
    let query = {};
    
    if (req.query.Genre) {
      query.Genre = req.query.genre;
    }
    if (req.query.Status) {
      query.Status = req.query.status;
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    const allBooks = await Book.find({});
    const totalBooks = allBooks.length;

    const ratedBooks = allBooks.filter(book => book.rating != null);
    const averageRating = ratedBooks.length > 0
      ? (ratedBooks.reduce((sum, book) => sum + book.rating, 0) / ratedBooks.length).toFixed(2)
      : 'N/A';

    const genreCounts = allBooks.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {});

    let mostReadGenre = 'N/A';
    let maxCount = 0;
    for (const [genre, count] of Object.entries(genreCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostReadGenre = genre;
      }
    }

    res.render('insights', {
      insights: {
        totalBooks,
        averageRating,
        mostReadGenre
      },
      books,
      
      filterGenre: req.query.Genre || '',
      filterStatus: req.query.Status || ''
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading insights");
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.render('edit', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading book');
  }
});

app.post('/edit/:id', async (req, res) => {
  try {
    const { title, author, genre, status, rating, review } = req.body;
    await Book.findByIdAndUpdate(req.params.id, {
      Title: title,
      Author: author,
      Genre: genre,
      Status: status,
      rating: rating || null,
      Review: review
    });
    res.redirect('/insights');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating book');
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/insights');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting book');
  }
});


app.listen(3000);