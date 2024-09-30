import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    photos:{
        type:[String],
        required:true
    },

    events:{
        type:[String]
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type: Boolean,
        default:false
    },
    availability: {
        type: String,
        required: true
    },
    
});

export default mongoose.model("Artist", ArtistSchema)