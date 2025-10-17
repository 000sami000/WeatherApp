import { Coordinates } from "@/api/types";

import { useEffect,useState } from "react";


interface GeolocationState{
    coordinates:Coordinates|null;
    error:string|null;
    isLoading:boolean;
}

export function useGeolocation(){

    const [locationData,setlocationData]=useState<GeolocationState>({
        coordinates:null,
        error:null,
        isLoading:true,
    });


    const getLocation=()=>{
        setlocationData((prev)=>({...prev,isLoading:true,error:null}))
    
   
    if(!navigator.geolocation){
    setlocationData({
        coordinates:null,
    error:"Geolocation is not supprted by your browser",
    isLoading:false
    });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position)=>{
        setlocationData({
            coordinates:{
                lat:position.coords.latitude,
                lon:position.coords.longitude,
            },
            error:null,
            isLoading:false
        })
    },(error)=>{
        let errMessage:string;
        switch(error.code){
            case error.PERMISSION_DENIED:
                errMessage="Location permission denied. Please enable location access";
            break;
            case error.POSITION_UNAVAILABLE:
                errMessage="Location information is unavailable.";
                break;
            case error.TIMEOUT:
                errMessage="Location request timed out.";
                break;
            default:
                errMessage="An unknown error occurred.";
               
        }
        setlocationData({
            coordinates:null,
            error:errMessage,
            isLoading:false
        })
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }
  );

}
useEffect(()=>{

    getLocation();
},[])

return{
    ...locationData,getLocation
}
}