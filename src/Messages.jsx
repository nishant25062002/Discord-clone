import { Avatar } from '@material-ui/core';
import './Messages.css'
import React from 'react';

function Messages({timestamp,message,user}) {
    console.log("object",user && user)
    return (
        <>
            <div className="message">
                <Avatar src={user && user?.photo}/>
                <div className="message__info">
                    <h4>
                        {user && user.displayName}
                        <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
                    </h4>
                    <p>{message && message}</p>
                </div>
            </div>
        </>
    )
}

export default Messages;
