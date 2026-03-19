import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { register } from "./Controller/auth/registerController.js";
import { login } from "./Controller/auth/loginController.js";
import { logout } from "./Controller/auth/logoutController.js";
import { createTask, deleteTask, getTasks, updateTask } from "./Controller/TaskController.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/logout", logout);

app.post("/api/tasks", createTask);
app.get("/api/tasks", getTasks);
app.delete("/api/tasks/:id", deleteTask);
app.put("/api/tasks/:id", updateTask);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
