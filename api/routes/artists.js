import express from "express";
import { countByCity, countByType, createArtist, deleteArtist, getArtist, getArtistEvents, getArtists, updateArtist } from "../controllers/artist.js";
import Artist from "../models/Artist.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE 
router.post("/", verifyAdmin , createArtist);

//UPDATE
router.put("/:id", verifyAdmin ,updateArtist);

//DELETE
router.delete("/:id", verifyAdmin , deleteArtist);

//GET
router.get("/find/:id", getArtist);

//GET ALL
router.get("/", getArtists);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/event/:id", getArtistEvents);


export default router;