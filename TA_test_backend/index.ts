import express from "express";
import cors from "cors";
import currencyRoutes from "./routes/currency";
import dotenv from 'dotenv';  

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()
app.use(currencyRoutes);

const PORT : number =  parseInt(process.env.PORT || "5000");
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
