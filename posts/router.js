// Helplers/ Modulers


const express = require('express');

const Posts = require('../data/helpers/postDb');

const router = express.Router();

// End points but using api posts
router.get('/', async (req, res) => {


    try {
    const posts = await Posts.get();
    res.status(200).json(posts);



} catch (error) {
    res.status(500).json({
      error: 'The posts information could not be retrieved.'
    });
  }
});

// Get

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);


    if (post) {
      res.status(200).json(post);
    } else {

        res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }


} catch (error) {
    res.status(500).json({
      error: 'The post information could not be retrieved.'
    });
  }
});

// Post

router.post('/', async (req, res) => {
  try {

    if (!req.body.user_id || !req.body.text) {



        return res.status(400).json({
        errorMessage: 'Missing User_ID and text post'
      });
    }





    const post = await Posts.insert(req.body);


    res.status(201).json(post);
 


} catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});


// Put

router.put('/:id', async (req, res) => {
  if (!req.body.user_id || !req.body.text) {
    return res
   
    .status(400)
    
      .json({
    
        errorMessage: 'Please provide user_id and text for the post.'
    
    });
  }
  
  
  try {
  
    const post = await Posts.update(req.params.id, req.body);
   
    if (post) {
   
        const newPost = await Posts.getById(req.params.id);
    
        res.status(200).json(newPost);
    } else {
      res
   
      .status(404)
  
  
        .json({ error: 'The post with the specified ID does not exist.' });
  
  
  
    }
  } catch (error) {
    res.status(500).json({
      error: 'The post information could not be modified.'
    });
  }
});




router.delete('/:id', async (req, res) => {
  try {
    const thePost = await Posts.getById(req.params.id);
    if (thePost) {
  
        await Posts.remove(req.params.id);
  
  
  
        return res.status(200).json(thePost);
 
 
    } else {
  
  
  
  
        return res
       
        .status(404)
       

        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
  
    res.status(500).json({
    
    
        message: 'Post Removed Not working'
    });
  }
});
// exporting

module.exports = router;