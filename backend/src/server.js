import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
   origin: "https://healthcare-kappa-sage.vercel.app",
    credentials: true
}));
app.use(express.json());

import requestRoutes from "./routes/request.routes.js";

app.use("/api/requests", requestRoutes);

app.get("/", (req, res) => {
  res.send("Smart Health Backend Running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});