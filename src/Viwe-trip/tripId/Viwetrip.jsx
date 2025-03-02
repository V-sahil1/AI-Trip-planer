import HotelDetails from "@/componet/custom/HotelDetails";
import Infosection from "@/componet/custom/Infosection";
import Footer from "@/componet/Footer";
import PlacesTovVsit from "@/componet/PlacesTovVsit";
import { db } from "@/Service/FierbaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Viwetrip() {
  const { tripId } = useParams();
  const[trip,setTrip]=useState( [])
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);
  const GetTripData = async () => {
    //research

    const docRef = doc(db, "AItrip", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document :", docSnap.data());
      setTrip(docSnap.data())
    } else {
      console.log("No Such Document");
      toast("No trip Found"); 
    }
  };

  return <div className="p-10 md:px-20 lg:px-44 xl:px-56 "  >
    {/* Information Section */}
    <Infosection trip = {trip}/>
    {/* recommended Hotels */}
    <HotelDetails trip = {trip}/>
    {/* Daily plan */}
    <PlacesTovVsit trip ={trip}/>
    {/* footer */}
    <Footer trip={trip}/>

  </div>;
}

export default Viwetrip;
