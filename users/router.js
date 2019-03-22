// Moduels 
const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();


// Here goes the middleware stuff


const capitalize = (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ message: 'Name required for this request' });
    }
    const firstLetter = name[0];
    if (firstLetter.toUpperCase() === firstLetter) {
      next();
    } else {
      res.status(400).json({ message: 'Name must be capitalized.' });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: 'There was an error processing this request',
      err
    });
  }
};


// Crud Time

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: 'The users information could not be retrieved.'
    });
  }
});

// Get


router.get('/:id', async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'The user information could not be retrieved.'
    });
  }
});





// Post


router.post('/', capitalize, async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        errorMessage: 'Name Please Oops'
      });
    }
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the user to the database'
    });
  }
});


// Put

router.put('/:id', capitalize, async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      errorMessage: 'Check again your missing a name'
    });
  }
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      const updatedUser = await Users.getById(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res
        .status(404)
        .json({ error: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'The user information could not be modified.'
    });
  }
});





// Delete


router.delete('/:id', async (req, res) => {
  try {
    const maybeUser = await Users.getById(req.params.id);
    if (maybeUser) {
      await Users.remove(req.params.id);
      return res.status(200).json(maybeUser);
    } else {
      return res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error User has been removed'
    });
  }
});






// Get


router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);

    if (posts) {
      res.status(200).json(posts);
    } else {
      res
        .status(404)
        .json({ message: 'The posts with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'The post information could not be retrieved.'
    });
  }
});

// Last Exporting

module.exports = router;