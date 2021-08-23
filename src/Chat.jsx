import React from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Messages from './Messages';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import db from './Firebase';
import firebase from 'firebase';

function Chat() {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
        //     db.collection('channels')
        //         .doc(channelId)
        //         .collection('messages')
        //         .orderBy('timestamp', 'desc')
        //         .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data()))
        //         );
        // }
        db.collection('channels')
          .doc(channelId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
        }
        console.log("messages: ",messages)
    }, [channelId,user]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user,
        })
        setInput('');
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
                {messages.map((message)=> (
                    <>
                    <Messages
                    timestamp={message.timestamp}
            message={message.message}
            user={message.user}
                    />
                    <h6>{console.log("sbfkjasdkjfakjsdnfjk",message)}</h6>
                    </>
                ))
            }
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input
                        disabled={!channelId}
                        type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={`Message ${channelName}`} />
                    <button type="submit"
                        disabled={!channelId}
                        onClick={sendMessage} classNzame="chat__inputButton">Send Message</button>
                </form>
                <div className="chat__InputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat;