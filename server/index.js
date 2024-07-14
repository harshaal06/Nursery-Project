import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { getHealth } from './controllers/health.js';
import { deletePlantId, getPlants, getPlantId, postPlant, putPlantId } from "./controllers/plant.js";

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URL);

    if (connect) {
        console.log(`MongoDB connected successfully ✅`);
      }
      else{
        console.log(`MongoDB not connected ❌`)
    }
}
connectDB();

app.get('/health', getHealth);

app.post('/plant', postPlant);
app.get('/plants', getPlants);
app.get("/plant/:id", getPlantId);
app.put("/plant/:id", putPlantId);
app.delete("/plant/:id", deletePlantId);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})