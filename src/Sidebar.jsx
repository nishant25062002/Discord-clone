import React, { useState } from 'react'
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import HeadsetIcon from '@material-ui/icons/Headset';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MicIcon from '@material-ui/icons/Mic';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './Firebase';
import { useEffect } from 'react';

function Sidebar() {

    const user=useSelector(selectUser);
    const [channels,setChannels]=useState([]);

    useEffect(()=>{
        db.collection('channels').onSnapshot(snapshot=>(
            setChannels(snapshot.docs.map(doc=>({
                id:doc.id,
                channel:doc.data(),
            })))
        ))
    })
   
    const handleChannel=()=>{
        const channelName=prompt('Enter channel name : ');

        if(channelName){
            db.collection('channels').add({
                channelName:channelName,
            })
        }
    }
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h4>Passion</h4>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                   {channels.map(({channel,id})=>(
                    <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
                   ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large" />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className="sidebar__profile">
                {/* <AccountCircleIcon /> */}
                <Avatar onClick={()=>auth.signout()} src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user?.displayName}</h3>
                    <p>{user?.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}
export default Sidebar;