import express from "express";
import { jwtMiddleware } from "../../jwt/jwtAuth.js";

const router = express.Router();
const MIN_BET_AMOUNT = 0;
const MAX_BET_AMOUNT = 1000000;

export default function (Bet, User) {
  // Place a dice bet
  router.post("/", jwtMiddleware, async (req, res) => {
    try {
      let { target, is_under, bet_amount } = req.body;
      let uuid_user = req.user.uuid_user;

      target = parseFloat(target);

      const user = await User.findOne({ where: { uuid_user: uuid_user } });

      if (!user) {
        return res.status(500).send("User not found");
      }

      if (user.balance < bet_amount) {
        return res.status(400).send("Not enough balance");
      }

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

      const game_id = 1;

      // TODO: Replace this line by a call to the random.org API
      const result = parseFloat((Math.random() * 100).toFixed(2));

      const multiplier = is_under
        ? (100 / target).toFixed(2)
        : (100 / (100 - target)).toFixed(2);

      const betData = {
        uuid_user: uuid_user,
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

      if (bet) {
        user.balance -= bet.bet_amount;
        user.balance += bet.win ? bet.bet_amount * bet.multiplier : 0;

        user.rank_pts += parseInt(bet.bet_amount);
        await user.save();
      }

      // Create a newBet that includes rank_pts and balance
      const newBet = {
        uuid_bet: bet.uuid_bet,
        uuid_user: bet.uuid_user,
        game_id: bet.game_id,
        bet_amount: bet.bet_amount,
        multiplier: bet.multiplier,
        win: bet.win,
        data: bet.data,
        rank_pts: user.rank_pts,
        balance: user.balance,
      };

      res.json(newBet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
