"use client"

import { createContext,useContext,useState, useEffect} from "react"
import axios from "axios"
import Swal from 'sweetalert2'


const swal = require('sweetalert2')
export const SubjectContext = createContext({
    project: [],
})

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

export const SubjectProvider = ({children }) => {
    const [project, setProject] = useState([])
    const [subject, setSubject] = useState([])
    const [subjectID ,setSubjectID] = useState([])

    const getSubject= ()=> {
        client.get("/api/subject/")
        .then((res)=>{
            setSubject(res.data)
        })

    }
    
    
    useEffect(() => {
        getSubject()
      }, []);

      
      
    
      
      useEffect(() => {
        if (subject) {
          const ids = subject.map((e) => e.id);
          setSubjectID(ids);
        }
      }, [subject]); 
    

    return(
        <SubjectContext.Provider value={{subject,subjectID}}>
            {children}
        </SubjectContext.Provider>
    )
}

export const DataSubject = () => useContext(SubjectContext)