const express = require('express');
const Posts = require('../data/db');

const router = express.router();



//Post to /api/posts creates a post using the indo send inside the request
router.post('/', (req,res)=> {
    if(req.body.title && req.body.comments){
        Posts.insert(req.body)
        .then(({id}) => {
            Posts.findById(id)
            .then(post =>{
                res.status(201).json(post)
            })
            .catch( err => {
                res.status(500).json({errorMessage: 'cant save your post shit head'})
            })
        })
        .catch(err => {
            res.status(500).json({errorMessage:" we fucked something up our bad"})
        })
    }else{
        res.status(400).json({errorMessage:" i guess you should have added all this shit you were supposed to lazzy ass"})
    }
})



//Post /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request 
router.post('/:id/comments',(req,res)=>{
    if(req.body.text){
        Posts.insertComment({post_id: req.params.id, text: req.body.text})
            .then(({id})=> {
                Posts.findCommentById(id)
                .then(comment => {
                    res.status(201).json(comment)
                })
                .catch(err => {
                    res.status(500).json({errorMessage:'hey you fuck we couldnt save your shit my bad'})
                })
            })
            .catch(err => {
                res.status(404).json({errorMessage:'post isnt there idiot'})
            })
    }else{
        res.status(400).json({errorMessage:'must contain text'})
    }
})

//GET /api/posts Returns an array of all the post objects contained in the database.
router.get('/',(req,res) => {
    Posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({errorMessage:" couldnt find the damn posts"})
        })
})



//Get /api/posts/:id returns the post object with specified id
router.get('/:id',(req,res) => {
    Posts.findById(req.params.id)
        .then((posts) => {
            if(post.length > 0){
                res.status(200).json(posts)
            } else {
                res.status(404).json({errorMessage:'cant find your shitty post'})
            }
            
        })
        .catch(err => {
            res.status(500).json({errorMessage:" couldnt find the damn post you wanted "})
        })
})

//GET /api/posts/:id/comments   returns array of all of the comments on a specific post
router.get('/:id/comments',(req,res) => {
    Posts.findPostComments(req.params.id)
        .then((comments) => {
            if(comments.length > 0){
                res.status(200).json({comments})
            } else {
                res.status(404).json({errorMessage:'cant find your shitty comments you trash panda'})
            }
            
        })
        .catch(err => {
            res.status(500).json({errorMessage:" couldnt find the damn comments you wanted "})
        })
})


//DELETE /api/posts/:id   removes a specified post
router.delete('/:id', (req,res) => {
    const gotDeleted = Posts.findById(req.params.id)
    Posts.remove(req.params.id)
        .then(deletedItems => {
            if(deletedItems > 0){
                res.status(200).json(gotDeleted)
            }else{
                res.status(404).json({errorMessage:'there is nothing to delete'})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage:' couldnt delete it '})
        })
})

//PUT /api/posts/:id   updates the post with a specific id
router.put('/:id',(req,res) => {
    
})

module.exports = router;