import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "This route is not defined." });
});

const PORT = 4000;
app.listen(PORT, () => `Server listening at http://localhost:${PORT}`);
