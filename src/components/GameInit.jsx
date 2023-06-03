import { useContext, useEffect, useState } from 'react';
import './../App.css'
import { socket } from '../utils/socket';
import { chessContext } from '../context/context';

function generateRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    let roomId = '';
    for (let i = 0; i < length; i++) {
      roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
}

export default function GameInit() {
    const [copy,setCopy] = useState(false)
    const {rid,setRid,setMenu}=useContext(chessContext)
    useEffect(()=>{
        if(copy){
            setTimeout(()=>setCopy(false),3000)
        }
    },[copy])

    function joinRoom(){
        socket.emit('joinRoom',rid)
        setMenu(true)
    }

  return (
    <div className='game-init'>
        <div className='links'>
            <p>Generate a Room ID and join a Room to start playing</p>
            <button onClick={()=>{navigator.clipboard.writeText(generateRoomId());setCopy(true);}}>Generate Room ID</button>
            {copy && <p style={{textAlign:'center'}}>Copied</p>}
            <input type='text' value={rid} onChange={(e)=>{setRid(e.target.value)}} placeholder='Enter Room Code'/>
            <button onClick={joinRoom}>Join Room</button>
        </div>
    </div>
  )
}
