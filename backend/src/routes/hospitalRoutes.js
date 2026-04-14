import express from "express";
import { createBooking, getSnapshot } from "../services/hospitalService.js";

const router = express.Router();

router.get("/snapshot", (_request, response) => {
  response.json(getSnapshot());
});

router.post("/bookings", (request, response) => {
  try {
    const result = createBooking(request.body);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

export default router;
