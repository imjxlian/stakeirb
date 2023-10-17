// controllers/UserController.js

import express from 'express';

const router = express.Router();

export default function (User) {
  // Create a user
  router.post('/', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Get all users
  router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Get a specific user by UUID
  router.get('/:uuid_user', async (req, res) => {
    try {
      const user = await User.findOne({ where: { uuid_user: req.params.uuid_user } });
      res.json(user);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Update a user by UUID
  router.put('/:uuid_user', async (req, res) => {
    try {
      const user = await User.findOne({ where: { uuid_user: req.params.uuid_user } });
      user.update(req.body);
      res.json(user);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Delete a user by UUID
  router.delete('/:uuid_user', async (req, res) => {
    try {
      const user = await User.findOne({ where: { uuid_user: req.params.uuid_user } });
      user.destroy();
      res.json(user);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  return router;
}