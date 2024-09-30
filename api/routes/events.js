import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent, updateEventAvailability } from "../controllers/event.js";

const router = express.Router();

//CREATE
router.post("/:artistid", verifyAdmin, createEvent);

//UPDATE
router.put("/:id", verifyAdmin, updateEvent);
router.put("/availability/:id", updateEventAvailability);

//DELETE
router.delete("/:id/:artistid", verifyAdmin, deleteEvent);

//GET
router.get("/:id", getEvent);

//GET ALL
router.get("/", getEvents);


export default router;