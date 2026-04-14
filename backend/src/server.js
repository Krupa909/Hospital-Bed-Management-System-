import cors from "cors";
import express from "express";
import hospitalRoutes from "./routes/hospitalRoutes.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/api", hospitalRoutes);

app.get("/", (_request, response) => {
  response.json({
    message: "Hospital Bed Booking backend is running.",
    apiBase: "/api",
  });
});

app.listen(port, () => {
  console.log(`Hospital backend running on http://localhost:${port}`);
});
