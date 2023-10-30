import express from "express";

const router = express.Router();
const MIN_BET_AMOUNT = 0;
const MAX_BET_AMOUNT = 1000000;

export default function (Bet) {
  // Place a dice bet
  router.post("/", async (req, res) => {
    try {
      let { target, is_under, bet_amount, user_uuid } = req.body;

      target = parseFloat(target);

      // TODO: Check if the user has enough balance to place the bet
      if (target < 2 || target > 98) {
        res.status(400).json({ error: "Range must be between 2 and 98" });
      }

      if (bet_amount < MIN_BET_AMOUNT || bet_amount > MAX_BET_AMOUNT) {
        res.status(400).json({
          error: `Bet amount must be between ${MIN_BET_AMOUNT} and ${MAX_BET_AMOUNT}`,
        });
      }
      if (typeof is_under !== "boolean") {
        res.status(400).json({ error: "is_under must be a boolean" });
      }

      // TODO: Replace by an enum somewhere in the code
      const game_id = 1;

      // TODO: Replace this line by a call to the random.org API

      const result = parseFloat((Math.random() * 100).toFixed(2));
      const multiplier = is_under
        ? (100 / target).toFixed(2)
        : (100 / (100 - target)).toFixed(2);

      const betData = {
        user_uuid: user_uuid,
        game_id: game_id,
        bet_amount: bet_amount,
        multiplier:
          (is_under && result < target) || (!is_under && result > target)
            ? multiplier
            : 0,
        win: (is_under && result < target) || (!is_under && result > target),
        data: {
          target: target,
          is_under: is_under,
          result: result,
        },
      };

      const bet = await Bet.create(betData);

      res.json(bet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all bets
  router.get("/bets", async (req, res) => {
    try {
      const bets = await Bet.findAll();
      res.json(bets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a bet by its id
  router.get("/:id", async (req, res) => {
    try {
      const bet = await Bet.findOne({ where: { id: req.params.id } });
      if (!bet) {
        res.status(404).json({ error: "Bet not found" });
        return;
      }
      res.json(bet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
