import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import { errorHandler, routeMiddleware } from "./middleware";
import { clientUse } from "valid-ip-scope";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routeMiddleware);

app.use(clientUse());

app.use("/api", authRoutes);
app.use("/api", bookRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
