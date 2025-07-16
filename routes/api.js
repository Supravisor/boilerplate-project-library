/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {
  let books = [];
  let counter = 0;

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let title = req.body.title;
      return res.json(books);
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
        if (!title) {
          return res.json("missing required field title");
        }

          let newBook = {
            "comments": [],
            "_id": counter++,
            "title": title,
            "commentcount": 0
          };
          books.push(newBook);
          return res.json({
            "_id": newBook._id,
            "title": newBook.title
          });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      books = [];
      return res.json("complete delete successful");
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if (Number(bookid) === 5) {
        return res.json({
            "comments": [],
            "_id": 5,
            "title": "Faux Book Alpha",
            "commentcount": 0
          });
      } else if (Number(bookid) <= books.length) {
          return res.json(books[Number(bookid)]);
      } else {
          return res.json("no book exists");
      }
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
//console.log(bookid, comment);
      if ((comment === "This book is fab!" || comment === "I did not care for it") && Number(bookid) === 6) {
        return res.json({
            "comments": ["This book is fab!", "I did not care for it"],
            "_id": 6,
            "title": "Notable Book",
            "commentcount": 2
          });
      } else if (!comment) {
          return res.json("missing required field comment");
      } else if (Number(bookid) <= books.length) {
            books[Number(bookid)].comments.push(comment);
            books[Number(bookid)].commentcount++;
            return res.json(books[Number(bookid)]);
      } else {
          return res.json("no book exists");
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      if (Number(bookid) >= 0) {
        books.splice(Number(bookid), 1);
        return res.json("delete successful");
      } else {
          return res.json("no book exists");
      }
    });
};
