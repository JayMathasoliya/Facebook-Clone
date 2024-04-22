import React, { useEffect, useState } from 'react'
import "./message.css"
import moment from "moment";
import axios from 'axios';


export default function Message({message, own}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sender, setSender] = useState(null);
  useEffect(()=>{

    const getSenderData = async ()=>{
      try{
        const res = await axios.get("/users?userId="+message.sender);
        setSender(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getSenderData();
    
  },[message]);

  return (
    <div className={own ? "message own" : "message"}>
    <div className="messageTop">
    {sender && sender.profilePicture ? (
      <img className="messageImg" src={PF + "person/" + sender.profilePicture} alt="" />
    ) : (
      <img className="messageImg" src={PF + "person/noAvatar.jpg"} alt="" />
    )}
      <p className="messageText">{message.text}</p>
    </div>
    <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
    </div>
  )
}
