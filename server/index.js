import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import dalleRoutes from "./routes/dallE.routes.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limig: "50mb" }));

app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello from Dall-E");
});

app.listen(8080, () => console.log("server started at port 8080"));
