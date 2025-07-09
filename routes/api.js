/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

let books = [];
let counter = -1;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let id = req.body._id;
      for (let i = 0; i < books.length; i++) {
        if (Number(id) === books[i]._id) {
          return res.json([{"_id": books[i]._id, "title": books[i].book_title, "commentcount": books[i].commentcount }]);
        }
      }
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      let newBook = {
        'commentcount': 0,
        'title': title,
        '_id': counter++
      };
      return res.json(newBook);

    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
