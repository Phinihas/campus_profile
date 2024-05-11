import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import developer from "../images/developer.png"
import { auth, database, googleProvider } from '../firebase/setup';
import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


function Signin() {

  const navigate = useNavigate()

  const [username,setUsername]=useState("")
  const [designation,setDesignation]=useState("")

  const addUser=async()=>{
    const userRef=doc(database,"Users",auth.currentUser?.uid)
    try{
      await setDoc(userRef,{
        username:username,
        email:auth.currentUser?.email,
        designation:designation,
        profile_image:auth.currentUser?.photoURL
      })
    }
    catch(err){
      console.error(err)
    }
  }

  const signInWithGoogle=async()=>{
    !username && toast.warning("Please enter username")
    try{
      username && await signInWithPopup(auth,googleProvider)
      username && addUser()
      navigate("/main")
    }
    catch(err){
      console.error(err)
    }

  }

  return (
    <div>
      <Grid container>
        <Grid item xs={6} sx={{paddingLeft:"80px",paddingTop:"15px"}}>
        <ToastContainer autoClose={2000}  position='top-right'/>
          <img style={{ width: "130px" }} src="https://img.freepik.com/premium-vector/cp-logo-design_731343-184.jpg?w=740" alt="Logo" />
      
            <h2 style={{ fontWeight: "100", fontSize: "60px", color: "#FF5733" }}>We can have connection with people</h2>
            <label style={{color:"grey",fontSize:"15px"}}>Enter Username</label><br />
            <TextField onChange={(e)=>setUsername(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))} variant='outlined' label="username" sx={{ width: "400px", mt: "5px" }} /><br />
            <label style={{color:"grey",fontSize:"15px"}}>Enter Designation</label><br />
            <TextField onChange={(e)=>setDesignation(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))} variant='outlined' label="Designation" sx={{ width: "400px", mt: "5px" }} /><br />
            
            <Button onClick={signInWithGoogle} size='large' variant='contained' sx={{ width: "400px", borderRadius: "50px" ,mt: "25px" }}>Signin</Button>

         
        </Grid>
        <Grid item xs={6}>
          <img style={{width:"500px"}} src={"https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1807.jpg?w=740"}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signin;
