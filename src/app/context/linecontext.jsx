"use client"


import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { liff} from '@line/liff';

  
  export const LineLiffContext = createContext({
    liffObject: [],
    profileUser:[]
  });
  
  export const LineliffContextProvider = ({ children }) => {
    const [liffObject, setLiffObject] = useState();
    const [profileUser,setProfileUser]= useState()

    const initializeLineLiff = async() =>{
       await liff.init({liffId:'2002369405-oY8nRVXL'
        }).then(()=>{
          setLiffObject(liff)
        })
        
      }
  
    const getProfile = async () => {
        liff.getProfile()
        .then((profile)=>{
          setProfileUser(profile)
        })
    };
  
    useEffect(() => {
      initializeLineLiff();
    }, []);
  
    useEffect(() => {
      if (!liffObject) return;
      getProfile();
    }, [liffObject]);
  
    return (
      <LineLiffContext.Provider value={{ liffObject, profileUser }}>
        {children}
      </LineLiffContext.Provider>
    );
  };
  
  export const useLineLiff = () => useContext(LineLiffContext);

