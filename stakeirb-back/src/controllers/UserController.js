// controllers/UserController.js

import express from "express";

const router = express.Router();

export default function (User) {
  // Create a user
  router.post("/register", async (req, res) => {
    const { username, email, hashedPassword } = req.body;
    try {
      const user = await User.create({
          username,
          email,
          password: hashedPassword,
      });
      res.status(200).send(user);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Get all users
  router.get("/", async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Get a specific user by UUID
  router.get("/:uuid_user", async (req, res) => {
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
  router.put("/:uuid_user", async (req, res) => {
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
  router.delete("/:uuid_user", async (req, res) => {
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

  //Log a user
  router.post('/login', async (req, res) => {
    const { email, hashedPassword: password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });
      if (user !== null) {
        res.status(200).send(user);
      } else {
        res.status(403).send('Connexion impossible');
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
}
