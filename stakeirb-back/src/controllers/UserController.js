// controllers/UserController.js

import express from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { jwtMiddleware } from '../jwt/jwtAuth.js';

const router = express.Router();

export default function (User) {

  // Get all users
  router.get("/profile", jwtMiddleware, async (req, res) => {
    // Get user uuid from token
    const uuid_user = req.uuid_user;

    try {
      const user = await User.findOne({
        where: { uuid_user },
      });
      res.status(200).json(user);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Get a specific user by UUID
  router.get("/:uuid_user", jwtMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({
        where: { uuid_user: req.params.uuid_user },
      });
      res.json(user);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Update a user by UUID
  router.put("/:uuid_user", jwtMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({
        where: { uuid_user: req.params.uuid_user },
      });
      user.update(req.body);
      res.json(user);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Delete a user by UUID
  router.delete("/:uuid_user", jwtMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({
        where: { uuid_user: req.params.uuid_user },
      });
      user.destroy();
      res.json(user);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  router.post("/register", async (req, res) => {
    const { username, email, hashedPassword } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ uuid_user: user.uuid_user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ accessToken: token });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("User already exists");
    }
  });

  router.post('/login', async (req, res) => {
    const { email, hashedPassword } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ message: 'User not found!' });
      if(!(hashedPassword === user.password)){
        return res.status(400).json({ message: 'Invalid password!' });
      }
      const privateUser = {
        uuid_user: user.uuid_user,
        username: user.username,
        email: user.email,
        balance: user.balance,
        pfp_url: user.pfp_url,
        rank_pts: user.rank_pts,
      };
      const token = jwt.sign({ user: privateUser }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ accessToken: token });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
}
