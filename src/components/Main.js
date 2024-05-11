import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Home from './Home'
import { auth, database, googleProvider } from '../firebase/setup';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore';

function Main() {
        const [userData,setUserData]=useState([])
    const getUser= ()=>{
        setTimeout(async()=>{
            try{
                const userDocument=doc(database,"Users",`${auth.currentUser?.uid}`)
                const data= await getDoc(userDocument)
                setUserData(data)
            }
            catch(err){
                console.log(err)
            }
        },1000)
        
    }

    useEffect(()=>{
        getUser()
    },[])

  return (
    <div>
        <Navbar userData={userData}/>
        <Home userData={userData}/>
    </div>
  )
}

export default Main