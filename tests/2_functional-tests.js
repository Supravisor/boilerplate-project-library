/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post( '/api/books' )
          .send( {
            "title": "New Book"
          } )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'title', 'Books in object should contain title');
            assert.property(res.body, '_id', 'Books in object should contain _id');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post( '/api/books' )
          .send( {
            "title": ""
          } )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.include(res.body, 'missing required field title', 'reponse should include a string');
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get( '/api/books' )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/2')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.include(res.body, 'no book exists', 'Book does not exist');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/0')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'comments', 'Books in object should contain comments');
            assert.property(res.body, '_id', 'Books in object should contain _id');
            assert.property(res.body, 'title', 'Books in object should contain title');
            assert.property(res.body, 'commentcount', 'Books in object should contain commentcount');
          done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post( '/api/books/0' )
          .send( {
            "comment": "Test comment"
          } )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'comments', 'Books in object should contain comments');
            assert.property(res.body, '_id', 'Books in object should contain _id');
            assert.property(res.body, 'title', 'Books in object should contain title');
            assert.property(res.body, 'commentcount', 'Books in object should contain commentcount');
            assert.include(res.body.comments, 'Test comment', 'Books in comments array should contain text');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post( '/api/books/0' )
          .send( {
            "comment": ""
          } )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.include(res.body, 'missing required field comment', 'Response should contain text');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
          .post( '/api/books/:1' )
          .send( {
            "comment": "Second comment",
          } )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.include(res.body, 'no book exists', 'Response should contain text');
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .delete( '/api/books/' )
          .send( {
            "_id": 0
          } )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.include(res.body, 'delete successful', 'Reponse should include a string');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
          .delete( '/api/books/:1' )
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.include(res.body, 'no book exists', 'Reponse should include a string');
            done();
          });
      });

    });

  });

});
