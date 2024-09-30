import express from "express";
import { getCheckedoutSession } from "../controllers/booking.js";
import {  verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

router.post(`/checkout-session/:artistId`, verifyToken, getCheckedoutSession)

export default router;