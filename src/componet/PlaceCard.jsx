import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCard({ place }) {


  return (
    <>
      <div className="shadow-md border w-full h-full rounded-xl p-3 mt-3 flex hover:scale-110 transition-all hover:shadow-md ">
        
        <img
          src="https://random.imagecdn.app/500/150"
          alt=""
          className="w-[140px] sm:w-[150px] rounded-xl h-[300px] sm:h-[140px] "
        />
       
        <div className="pl-3  font-bold text-lg">
        <h2 className="pb-1 " >{place.place_name}</h2>
        <p className="text-sm text-gray-500">{place.place_details}</p>
        <h2 className="mt-2 ">
        🕖 {place.time_travel}</h2>
        <h2 className=" font-medium text-md text-orange-500 flex ">
            <h2 className="text-black ">Best Time : </h2>   {place.best_time_to_visit}</h2>

        <Link to={'https://www.google.com/maps/search/?api=1&query='+place.place_name} target='_blank'   > 
        <button className='text-[17px] border flex justify-center items-center gap-2 w-[110px] h-[35px] bg-black text-gray-300 '><FaMapLocationDot className="text-gray-200" />Navigate</button>
        </Link>
        </div>
        
        
      </div>
    </>
  );
}

export default PlaceCard;
