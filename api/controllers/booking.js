import User from '../models/User.js';
import Artist from '../models/Artist.js';
import Booking from '../models/Booking.js';
import Stripe from 'stripe';

export const getCheckedoutSession = async(req,res)=>{
    try{

        const artist = await Artist.findById(req.params.artistid)
        const updateUser = await User.findById(req.id)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        const ssession = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:'${process.env.CLIENT_SITE_URL}/checkout-success',
            cancel_url:'${req.protocol}://${req.get(`host`)}/artists/${artistid}',
            customer_email:User.email,
            client_reference_id:req.params.artistId,
            line_items:[
                {
                    price_data:{
                        currency:"rs",
                        unit_amount:artist.ticketPrice * 100,
                        product_data:{
                            name:artist.name,
                            description:artist.bio,
                            images:[artist.photo]
                        }
                    },
                    quantity:1
                }
            ]
        })
    
        const booking = new booking({
            artist:artist._id,
            user:user._id,
            ticketPrice:artist.ticketPrice,
            session:session.id
        })

        await booking.save()

        res.status(200).json({success:true, message:'Successfuly paid ',session})
    
    } catch(err){
        console.log(err);

        res.status(500).json({success:false, message:'Unsuccessfuly ',session})
    }


}
