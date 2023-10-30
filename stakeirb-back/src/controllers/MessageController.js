// controllers/MessageController.js

import express from "express";

const router = express.Router();

export default function (Message) {
  // Create a message
  router.post("/", async (req, res) => {
    try {
      const message = await Message.create(req.body);
      res.json(message);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Get all messages
  router.get("/", async (req, res) => {
    try {
      const messages = await Message.findAll();
      res.json(messages);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Get a specific message by ID
  router.get("/:id", async (req, res) => {
    try {
      const message = await Message.findOne({ where: { id: req.params.id } });
      res.json(message);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Delete a message by ID
  router.delete("/:id", async (req, res) => {
    try {
      const message = await Message.findOne({ where: { id: req.params.id } });
      message.destroy();
      res.json(message);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  return router;
}
