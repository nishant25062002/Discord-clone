import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {login, logout, selectUser} from "./features/userSlice";
import Login from './Login';
import { auth } from './Firebase';

function App() {
  const dispatch=useDispatch();
const user = useSelector(selectUser);

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
      if(authUser){
       dispatch(
         login({
           uid:authUser.uid,
           photo:authUser.photoURL,
           email:authUser.email,
           displayName:authUser.displayName,
         })
       )
      }else{
          dispatch(
            logout()
          );
      }
    })
  },[dispatch])

  return (
    <div className="App">
     {user ?(<> 
     <Sidebar/>
     <Chat/></>):
     (<>
     <h6>Login please</h6>
     <Login/>
     </>)
     }
    </div>
  );
}

export default App;