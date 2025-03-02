import {
  SelectBudgeoptions,
  selectTravelesList,
  AI_PROMPT,
} from "@/constant/Options";
import { chatSession } from "@/Service/AImodel";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Service/FierbaseConfig";

function Createtrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormdata] = useState();
  const [Opendialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);  
  const navigater=useNavigate()

  const handleInputChange = (name, value) => {
    setFormdata({ ...formData, [name]: value });
  };

  const OnGeneratetrip = async () => {
    
    const user = localStorage.getItem("user");
    if (!user) {
      setOpendialog(true);
      return;
    }
    if (
      (formData?.noOfDays <= 0 && !formData?.location) ||
      !formData?.Budget ||
      !formData?.traveler
    ) {
      toast("Please fill all Details");

      return;
    } else if (formData?.noOfDays >= 31) {
      toast("Enter No Of Days less then 31");

      return;
    } else if (formData?.noOfDays <= 0) {
      toast(" Please Enter Valid  No Of days ");

      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )

      // reserch
      .replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.Budget)
      .replace("{totalDays}", formData?.noOfDays);
      // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };
  useEffect(() => {
    console.log(formData); 
  }, [formData]);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v2/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((r) => {
        console.log(r);
        localStorage.setItem("user", JSON.stringify(r.data));
        setOpendialog(false);
        OnGeneratetrip();
      });
  };
  
const SaveAiTrip= async (trip)=>{
  setLoading(true)
const user =JSON.parse(localStorage.getItem('user'))
 const docid =Date.now().toString()
  await setDoc(doc(db, "AItrip", docid), {
  
    userSelection:formData,
    tripDATA :JSON.parse(trip),
    useremail :user?.email,
    id:docid 
                
      
  });
  setLoading(false)
  navigater('/viwetrip/'+docid)


}
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="text-[35px] mb-2">Tell us your travel preferences 🏔️🌴</h2>
      <p className="">
    
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex  flex-col gap-7 ">
        <div>
          <h2 className="text-xl my-3 font-medium">
            what is destination of choice?{" "}
          </h2>
          <h2 className="text-xl my-3 font-medium ">
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </h2>
        </div>
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days are you planing your trip{" "}
          </h2>
          <input
            type="number"
            placeholder="ex.3 "
            className="border w-full h-[39px] hover:border-blue-300 rounded-[6px] px-3"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-8 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3  gap-5 mt-5">
          {SelectBudgeoptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("Budget", item.title)}
              className={`p-4 border rounded-lg hover:sheadow-lg cursor-pointer ${
                formData?.Budget == item.title && "shadow-lg border-black"
              }`}
            >
              <h2>{item.icon}</h2>

              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 text-sm text-gray-500>
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-8 font-medium">
          Who do your plan on traveling with on your next advanture ?
        </h2>
        <div className="grid grid-cols-3  gap-5 mt-5">
          {selectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.title)}
              className={`p-4 border rounded-lg hover:sheadow-lg cursor-pointe ${
                formData?.traveler == item.title && "shadow-lg border-black"
              }`}
            >
              <h2>{item.icons}</h2>

              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 text-sm text-gray-500>
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-end">
      
        <NavLink>
          <button
            onClick={OnGeneratetrip}
            className="text-[17px] border w-[190px] rounded-lg h-[40px] bg-black flex items-center justify-center text-[#FFFDD0] "
          >
            {loading? 
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin "/>:"Genrate Trip"}
            
            
          </button>
        </NavLink>
      </div>

      <Dialog open={Opendialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-lg mt-2">Sign In With Google</h2>
              <p>Sign in to the app securely using Google authentication.</p>
            </DialogDescription>
            <button
              onClick={login}
              className="text-[17px] flex items-center justify-center border w-[100%] h-[40px] bg-black text-[#FFFDD0] mt-5 gap-4"
            >
              <FcGoogle className=" h-7 w-7" />
              Sign In with Google
            </button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Createtrip;
