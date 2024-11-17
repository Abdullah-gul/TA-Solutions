import express, { Request, Response, Router } from "express";
import axios from "axios";

const router: Router = express.Router();
const API_URL = "https://api.freecurrencyapi.com/v1";

interface CurrencyQuery {
  from: string;
  to: string;
  amount: string; 
}

router.get("/list", async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/latest`, {
      params: { apikey: process.env.API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching currency list:", error);
    res.status(500).json({ error: "Failed to fetch currency list" });
  }
});

router.get(
  "/convert",
  async (req: Request<{}, {}, {}, CurrencyQuery>, res: Response): Promise<void> => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      res
        .status(400)
        .json({ error: "Missing required query parameters (from, to, amount)" });
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/latest`, {
        params: {
          apikey: process.env.API_KEY,
          base_currency: from,
          currencies: to,
        },
      });

      const conversionRate = response.data.data[`${to}`];
      if (!conversionRate) {
        res.status(400).json({ error: `Invalid target currency: ${to}` });
        return;
      }

      const convertedAmount = parseFloat(amount) * conversionRate;
      res.json({ convertedAmount });
    } catch (error) {
      console.error("Error during currency conversion:", error);
      res.status(500).json({ error: "Conversion failed" });
    }
  }
);

export default router;
