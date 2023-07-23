//Create web server
var express = require('express');
var router = express.Router();

// Include the model (defined above as a class)
var Comment = require('../models/comment');

// GET request handler for /comments
router.get('/', function(req, res, next) {
    // Get all comments
    Comment.find(function(err, comments) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // Load the comments.ejs view
            res.render('comments', {
                comments: comments,
                title: 'Comments'
            });
        }
    });
});

// GET request handler for /comments/add
router.get('/add', function(req, res, next) {
    // Load the add.ejs view
    res.render('add', {
        title: 'Add a New Comment'
    });
});

// POST request handler for /comments/add
router.post('/add', function(req, res, next) {
    // Create a new comment using the Comment model and the data sent in the POST
    Comment.create({
        name: req.body.name,
        comment: req.body.comment
    }, function(err, Comment) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // Load the comments.ejs view
            res.redirect('/comments');
        }
    });
});

// GET request handler for /comments/delete
router.get('/delete/:_id', function(req, res, next) {
    // Use the Comment model to delete the selected comment
    Comment.remove({ _id: req.params._id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // Reload the comments.ejs view
            res.redirect('/comments');
        }
    });
});

// GET request handler for /comments/edit
router.get('/edit/:_id', function(req, res, next) {
    // Use the Comment model to find the selected comment
    Comment.findById(req.params._id, function(err, comment) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // Load the edit.ejs view
            res.render('edit', {
                comment: comment,
                title: 'Edit a Comment'
            });
        }
    });
});

// POST request handler for /comments/edit
router.post('/edit/:_