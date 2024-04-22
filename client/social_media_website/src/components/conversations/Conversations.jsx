import React, { useEffect, useState } from 'react'
import "./conversations.css"
import axios from 'axios';

export default function Conversations({ conversation, currentUser }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId)
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [currentUser, conversation])

  return (
    <div className='conversation'>
      {user && user.profilePicture ? (
        <img src={PF + "person/" + user.profilePicture} className='conversationImg' alt="" />
      ) : (
        <img src={PF + "person/noAvatar.jpg"} className='conversationImg' alt="" />
      )}
      <span className='conversationName'>{user ? user.username : ''}</span>
    </div>
  )

}
