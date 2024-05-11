
// import React, { useEffect, useState } from 'react'
// function Rightbar() {


//   const [news,setNews] = useState([]) 

//   const getNews=()=>{
//     fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=f8a4c531884342c59b77518510edb378")
//     .then(res => res.json())
//     .then(json => setNews(json))
//   }

//   useEffect(()=>{
//     getNews()
//   },[])
//   return (
//     <div style={{backgroundColor:"white",borderRadius:"15px",height:"400px",paddingTop:"5px",paddingLeft:"20px"}}>
//         <h4>CP News</h4>
//     </div>
//   )
// }

// export default Rightbar















import React, { useEffect, useState } from 'react'

function RightBar() {

  const [news,setNews] = useState([])

  const getNews = ()=>{
    fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=f8a4c531884342c59b77518510edb378")
    .then(res => res.json())
    .then(json => setNews(json.articles))
  }

  useEffect(()=>{
    getNews()
  },[])

  const newsList = news.slice(0,6)


  return (
    <div style={{borderRadius:"10px",backgroundColor:"white",height:"400px",paddingTop:"5px",paddingLeft:"20px"}}>
      <h4>News</h4>
      {newsList.map((eachNews)=>{
        return <>
        <li style={{marginTop:"10px"}}>{eachNews.title}</li>
        </>
      })}
    </div>
  )
}

export default RightBar