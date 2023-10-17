// controllers/BetController.js

import express from 'express';

const router = express.Router();

export default function (Bet) {
  // Create a bet
  router.post('/', async (req, res) => {
    try {
      const bet = await Bet.create(req.body);
      res.json(bet);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Get all bets
  router.get('/', async (req, res) => {
    try {
      const bets = await Bet.findAll();
      res.json(bets);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Get a specific bet by ID
  router.get('/:id', async (req, res) => {
    try {
      const bet = await Bet.findOne({ where: { id: req.params.id } });
      res.json(bet);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Update a bet by ID
  router.put('/:id', async (req, res) => {
    try {
      const bet = await Bet.findOne({ where: { id: req.params.id } });
      bet.update(req.body);
      res.json(bet);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  // Delete a bet by ID
  router.delete('/:id', async (req, res) => {
    try {
      const bet = await Bet.findOne({ where: { id: req.params.id } });
      bet.destroy();
      res.json(bet);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    }
  });

  return router;
}