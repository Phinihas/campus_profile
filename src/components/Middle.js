import React, { useEffect, useRef } from 'react'
import profile from "../images/profile.png"
import { Grid, TextField, Button } from '@mui/material';
import image from "../images/image.png"
import calendar from "../images/calendar.png"
import article from "../images/article.png"
import steve from "../images/steve.jpg"
import { Card, CardContent, CardMedia,  Typography } from '@mui/material'
import Post from './Post';
import { collection, doc, getDocs } from 'firebase/firestore'
import { auth, database } from '../firebase/setup'
import { useState } from 'react'
import Filepost from './Filepost'

function Middle({userData}) {
  const postRef = useRef(null)
  const filePostRef = useRef(null)

  const [posts,setPost]=useState([])


  const getPost=()=>{
    setTimeout(async()=>{
        const  postDocument=doc(database,"Users",`${auth.currentUser?.uid}`)
        const postRef=collection(postDocument,"Posts")
    try{
        const data=await getDocs(postRef)
        const filteredData=data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
        }))
        console.log(filteredData)
        setPost(filteredData)
    } 
    catch(err){
        console.error(err)
    }
  },1000)
    }
    
  useEffect(()=>{
    getPost()
  },[posts])


    return (
    <div>
        <div style={{backgroundColor:"white",padding:"15px",borderRadius:"10px"}}>
            <img style={{width:"55px",borderRadius:"40px"}} src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? profile}/>
            <TextField onClick={()=>postRef.current?.click()} variant='outlined' label="Start a post" style={{width:"450px",marginLeft:"20px"}} InputProps={{sx:{borderRadius:"150px"}}}/><br></br>
            <Post ref={postRef}/> 
            <Filepost ref={filePostRef}/>
            <img onClick={()=>filePostRef.current?.click()} style={{width:"30px",marginLeft:"20px"}} src={image}/>Media 
            <img  style={{width:"30px",marginLeft:"140px"}} src={calendar}/>Event
            <img  style={{width:"30px",marginLeft:"90px"}} src={article}/>Write Article
        </div>
        <div style={{paddingTop:"20px"}}>
            {posts.map((post)=>{
                    
            return <Card sx={{mt:"10px"}}>
                <CardContent>
                    <div style={{display:"flex"}}>
                        <img src={post.profile_image ?? profile }style={{width:"40px",borderRadius:"70px"}}/>
                        <div style={{marginLeft:"10px"}}>
                            <Typography>{post.username}</Typography>
                            <Typography sx={{color:"#BFBFBF"}}>{post.destination}</Typography>
                        </div>
                    </div>  
                    <h5>{post.textPost}</h5>
                </CardContent>
                {post.filePost && <CardMedia
                component="img"
                height={250}
                image={post.filePost ?? steve}>

                </CardMedia>}
            </Card>
            })}
        </div>
    </div>
  )
}

export default Middle