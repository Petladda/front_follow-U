"use client"

import { createContext,useContext,useState,useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const swal = require('sweetalert2')
const AuthContext = createContext();

export const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadFinished, setLoadFinished] = useState(false);
  const [token,setToken] = useState(null)
  const router = useRouter()

  const submitRegister = (e) =>{
    
    e.preventDefault;
    client.post("/api/register",e
    ).then(function(res){
      if (res.status === 201){
        router.push("/login_users")
        swal.fire({
          title: "ลงทะเบียนเรียบร้อย เข้าสู่ระบบเลย!!! ",
          icon: "success",
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
      })
      }
    })
    
    
  }

  const submitlogin = (e) => {
    //console.log(e);
    e.preventDefault;
    client.post("/api/login",e
  
    ).then(async function(res) {
      
      
      localStorage.setItem("token",res.data.token)
      setToken(res.data.token)
      client.defaults.headers.common['Authorization'] = "Token "+ localStorage.getItem("token")

      await loadUserData()

      
           
      router.replace('/student/yourproject')

      swal.fire({
        title: "เข้าสู่ระบบเลยเรียบร้อย !!! ",
        icon: "success",
        toast: true,
        timer: 3000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    
    }).catch(function(error) {
      router.replace('/login_users')
      Swal.fire({
        icon: "error",
        text: "ข้อมูลไม่ถูกต้อง!",
        
      });
    });
  };

  const setUser = (user) => {
    localStorage.setItem('user',JSON.stringify(user))
    setCurrentUser(user)
  }

  const loadUserData = async () => {
    setLoadFinished(false)
    let token = localStorage.getItem("token",null)
    //console.log("authentication.jsx @ loadUserData : token", token)

    let localStorageUser = localStorage.getItem("user",null)
    if(localStorageUser != null){
      let user = JSON.parse(localStorageUser)
      setUser(user)
      setLoadFinished(true)
      setToken(token)
    }else {
      setUser(null)
      setLoadFinished(false)
      setToken(nulL)
    }
    

    if(token == null){
      setUser(null)
      setLoadFinished(true)
      router.replace("/login_users")
    }else {
      client.defaults.headers.common['Authorization'] = "Token "+ localStorage.getItem("token")
      let result = await client.get("/api/user")
      let user = result.data?.user ?? null
      console.log("authentication.jsx @ loadUserData : user = ",user)
      setUser(user)

      if(user == null){
        setLoadFinished(true)
        router.replace("/login_users")
      }
    }
    setLoadFinished(true)  
  }


  const submitlogout = (e) => {
    e.preventDefault;
    localStorage.removeItem("token")
    localStorage.clear();
    setToken(null)
    client.defaults.headers.common["Authorization"] = null;
    router.push("/login_users")
    swal.fire({
      title: "ออกจากระบบเสร็จสิ้น...",
      icon: "success",
      toast: true,
      timer: 3000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
  };


  useEffect(() => {
    loadUserData()
  }, []);



  return (
    <AuthContext.Provider value={{ client,currentUser, submitlogin, submitlogout,token ,submitRegister, loadFinished }}>
      
      {loadFinished ? children : <div></div>}
     
      
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);