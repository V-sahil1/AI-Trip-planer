import { Scale } from 'lucide-react';
import React from 'react'
import { FcRating } from "react-icons/fc";
import { Link } from 'react-router-dom';
function HotelDetails({trip}) {
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=YOUR_PHOTO_REFERENCE_HERE&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY }`;
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-5'>            
                {trip?.tripDATA?.hotel_options.map((item,index)=>{
                    return (
                      <div key={index}>
                         <Link to={'https://www.google.com/maps/search/?api=1&query='+ item.hotel_name + item.hotel_address} target='_blank'>
                        <div key={index} className='hover:scale-110 transition-all'>
                        <img src="/placeholder.jpg" className='rounded-lg'/>
                        <h2 className='font-medium'>{item.hotel_name}</h2>
                        <h2 className='font-bold text-black-500 text-[16px] '>{item.price}</h2>
                        <h2 className='text-xs text-gray-500 flex items-center gap-1'> <FcRating className='' />{item.rating
                        }</h2>
                        <h2 className='text-xs text-gray-500 '>{item.hotel_address}</h2>
                        
                       
                    </div>
                    </Link>
                      </div>
                     
                    

                    )
                  

                })}
            
        </div>

    </div>
  )
}

export default HotelDetails