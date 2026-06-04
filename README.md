# 📚 Inkwell — Personal Book Management App

A simple Node.js web app to track your reading list.

---

## Tech Stack

- **Node.js + Express** — server
- **MongoDB + Mongoose** — database
- **EJS** — templating
- **Vanilla CSS** — styling



## Setup

1. **Install dependencies**
   
   npm install express mongoose ejs


2. **Make sure MongoDB is running locally**
   
   mongodb
  

3. **Start the server**

   node index.js
   

4. **Open in browser**

   http://localhost:3000
   

---

## Features

- Add books with title, author, genre, status, rating, and review
- View stats — total books, average rating, most read genre
- Filter books by genre and status
- Click any book to edit its details
- Delete books from the edit page



Project Structure


├── index.js          # Express server & routes
├── app.js            # Mongoose model
├── views/
│   ├── index.ejs     # Add book form
│   ├── insights.ejs  # Stats, filters, book library
│   └── edit.ejs      # Edit / delete a book
└── public/           # Static assets




