import React, { useEffect, useState } from 'react'
import "./chatOnline.css"
import axios from 'axios';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get("/users/friends/" + currentId);
                setFriends(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getFriends();
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers])

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
            if(res.data == null){
                const postData = {
                    senderId:user._id,
                    receiverId:currentId
                }
                await axios.post('/conversations/',postData);
            }
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div className="chatOnlineFriend" key={o._id} onClick={() => handleClick(o)}>
                    <div className="chatOnlineImgContainer">

                        {o && o.profilePicture ? (
                            <img src={PF + "person/" + o.profilePicture} className='chatOnlineImg' alt="" />
                        ) : (
                            <img src={PF + "person/noAvatar.jpg"} className='chatOnlineImg' alt="" />
                        )}
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">
                        {o?.username}
                    </span>
                </div>
            ))}
        </div>
    )
}
