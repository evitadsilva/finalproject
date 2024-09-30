import Artist from "../models/Artist.js";
import Event from "../models/Event.js";

export const createArtist = async (req,res,next)=>{
    
    const newArtist = new Artist(req.body)
    try{
        const savedArtist = await newArtist.save()
        res.status(200).json(savedArtist)
    }
    catch(err){
        next(err);
    }
}

export const updateArtist = async (req,res,next)=>{
    try{
        const updateArtist = await Artist.findByIdAndUpdate(
            req.params.id ,
            {$set: req.body} ,
            {new:true} )
        res.status(200).json(updateArtist)
    }
    catch(err){}
        next(err);
}

export const updateArtistAvailability = async (req, res, next) => {
    try {
      await Event.updateOne(
        { "tickets._id": req.params.id },
        {
          $push: {
            "tickets.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Event status has been updated.");
    } catch (err) {
      next(err);
    }
  };

export const deleteArtist = async (req,res,next)=>{
    try{
        await Artist.findByIdAndDelete( req.params.id )
       res.status(200).json("artist has been deleted.")
   }
   catch(err){
        next(err);
    }
}

export const getArtist = async (req,res,next)=>{
    try{
        const artist = await Artist.findById( req.params.id )
        res.status(200).json(artist)
    }
    catch(err){
        next(err);
    }
}

export const getArtists = async (req,res,next)=>{
    const {min, max, ...others} = req.query;
    try{
        const artists = await Artist.find({ ...others, 
            cheapestPrice: {$gt:min | 1 , $lt:max || 999}, 
        }).limit(4);
        res.status(200).json(artists);
    }
    catch(err){
        next(err);
    }
};

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Artist.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err);
    }
}

export const countByType = async (req,res,next)=>{
    try{
        const bollywoodCount = await Artist.countDocuments({genre:"bollywood"});
        const classicalCount = await Artist.countDocuments({genre:"classical"});
        const rockCount = await Artist.countDocuments({genre:"rock"});
        const popCount = await Artist.countDocuments({genre:"pop"});
        const othersCount = await Artist.countDocuments({genre:"others"});

        res.status(200).json([
            { genre:"bollywood", count: bollywoodCount },
            { genre:"classical", count: classicalCount },
            { genre:"rock", count: rockCount },
            { genre:"pop", count: popCount },
            { genre:"others", count: othersCount }
        ])
    }
    catch(err){
        next(err);
    }
};

export const getArtistEvents = async (req, res, next) => {
    try {
      const artist = await Artist.findById(req.params.id);
      const list = await Promise.all(
        artist.events.map((event) => {
          return Event.findById(event);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

