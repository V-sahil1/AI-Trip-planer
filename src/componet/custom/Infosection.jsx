import { GetPlaceDetails } from "@/Service/GlobalApi";
import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
function Infosection({ trip }) {
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then(resp =>
      console.log(resp.data)
    );
  };
  return (
    <>
      <div>
        <img
          src="/placeholder.jpg"
          className="h-[340px] w-full rounded-xl object-cover"
          alt=""
        />

        <div className="flex justify-between items-center">
          <div className="my-6 flex flex-col gap-2">
            <h2 className="font-bold text-2xl ">
              {trip?.userSelection?.location?.label}{" "}
            </h2>
            <div className="flex  gap-3">
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md  ">
                🗓️ {trip.userSelection?.noOfDays} Day{" "}
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md  ">
                💰 {trip.userSelection?.Budget} Budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 rounded-full text-xs md:text-md  ">
                😊 Traveler {trip.userSelection?.traveler}{" "}
              </h2>
            </div>
          </div>
          <button className="text-[30px] flex items-center justify-center border w-[48px] h-[40px] bg-gray-900 text-[#FFFDD0] rounded-xl ">
            {" "}
            <IoIosSend />
          </button>
        </div>
      </div>
    </>
  );
}

export default Infosection;
