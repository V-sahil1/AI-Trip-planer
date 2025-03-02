import React from "react";
import PlaceCard from "./PlaceCard";

function PlacesTovVsit({ trip }) {
  const dataToTransform = trip?.tripDATA?.itinerary;

  // Check if dataToTransform exists before transforming
  const transformedData = dataToTransform
  ? Object.entries(dataToTransform).map(([key, value]) => ({
      day: key.replace("day", "Day "),
      plan: Array.isArray(value.plan) ? value.plan.map((planItem) => ({
        ...planItem,
        theme: value.theme,
      })) : [], // Fallback to an empty array if value.plan is not an array
    }))
  : []; // Return an empty array if dataToTransform is falsy
// Default to an empty array if dataToTransform is undefined

  console.log(transformedData);

  return (
    <div className="my-9 w-full h-full">
      <h2 className="font-bold text-[30px]">Place to visit</h2>
      <div  >
      <div className="my-2" >
        {transformedData.map((item, index) => (
          <div key={index} className="my-4">
            <h2 className="font-medium text-[20px]"> Day {item.day}</h2>
            <div className=" ">
            {item.plan.map((place, index) => (
              <div key={index} >
                
                <div className="ml-4">
                  <PlaceCard place ={place}/>
                  </div>
                
              </div>
            ))}  
            </div>
           
          </div>
        ))}
      </div>
      </div>
     
    </div>
  );
}

export default PlacesTovVsit;
