// controllers/MessageController.js

import express from "express";

import { Server } from "socket.io";

const router = express.Router();

export default function (Message, User, io) {
  // Create a message
  router.post("/", async (req, res) => {

    try {
      const { user_uuid, message } = req.body;

      if (!user_uuid || !message) {
        return res.status(400).send("Missing fields");
      }

      if (message.length > 140) {
        return res
          .status(400)
          .send("Message too long, should be 140 characters maximum");
      }

      const newMessage = {
        user_uuid,
        message,
      };

      const response = await Message.create(newMessage);

      if (!response) {
        return res.status(500).send("An error occurred");
      }

      const user = await User.findOne({ where: { uuid_user: user_uuid } });

      if (!user) {
        return res.status(404).send("User not found");
      }

      newMessage.user = user;

      io.emit("newMessage", newMessage);

      res.status(201).json(response);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  });

  // Get all messages
  router.get("/", async (req, res) => {
    try {
      let { orderBy, direction, limit } = req.query;

      const order = [];

      orderBy = orderBy || "createdAt";
      direction = direction || "DESC";

      order.push([orderBy, direction]);

      const limitInt = limit ? parseInt(limit, 10) : 100;

      const messages = await Message.findAll({
        order,
        limit: limitInt,
      });

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
