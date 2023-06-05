import { useEffect, useRef, useState } from "react";
import { boardConfig } from "../../initialConfig";
import checkMove from "../../checkMove";
import { useContext } from "react";
import { chessContext } from "../context/context";
import { socket } from "../utils/socket";


export default function Board(){
    const [config,setConfig] = useState(boardConfig)
    const [start,setStart] = useState(null)
    const [move,setMove] = useState(null)
    const [cur,setCur] = useState(null)
    const [valid,setValid] = useState([])
    const [whiteScore,setWhiteScore] = useState(0)
    const [blackScore,setBlackScore] = useState(0)

    const {show,setShow,turn,setTurn,exchange,setExchange,rid} = useContext(chessContext)

    const score = {
        "QUEEN":9,
        "KING":10,
        "KNIGHT":3,
        "ROOK":5,
        "PAWN":1,
        "BISHOP":3,
        "":0
    }

    let audio = new Audio("promote.mp3")
    function playSound(){
        audio.play()
    }

    function Piece({color,val}){
        let src = config[val] && config[val]+".svg"
        function handleClick(){
            let res = checkMove(config[val],val,config)
            if(!start){
                if(turn===config[val][0]){
                    setStart(val)
                    setCur(config[val])
                }else{
                    return
                }
            }
            setValid(res)
            if(val===start){
                setValid([])
                setStart(null)
            }
            if(start){
                if(turn===cur[0] && valid.includes(val)){
                    setMove({piece:cur,from:start,to:val})
                    setCur(null)
                    setValid([])
                    playSound()
                }
                setStart(null)
            }
        }

        return(
            <div className={`piece piece-${color} ${val===start && 'selected'}`}
                onClick={handleClick}
            >
                {src && <img src={src} alt={val}/>}
                <div className={`overlap ${valid.includes(val)===false && 'hide'}`}></div>
            </div>
        )
    }    

    let squareNo = [];
    for(let i=8;i>=0;i--){
        const letters = ['A','B','C','D','E','F','G','H']
        for(let letter of letters){
            squareNo.push(letter+i);
        }
    }
    const pieces = [];
    let dir = 0;
    for(let i=0;i<64;i++){
        if(i%8)dir=1-dir;
        if(dir)pieces.push({color:"dark",val:squareNo[i]})
        else pieces.push({color:"light",val:squareNo[i]})
    }

    async function changeBoard(move){
        const {piece,from,to} = move
        const data = {piece,from,to,rid}
        socket.emit('move',JSON.stringify(data))
        let temp = turn
        if(piece==='B_PAWN' && to[1]==='1'){
            setTurn('BC')
            temp = 'BC'
            setShow(true)
        }
        if(piece==='W_PAWN' && to[1]==='8'){
            setTurn('WC')
            temp='WC'
            setShow(true)
        }
        let tempBoard = {...config}
        tempBoard[move.from] = ''
        tempBoard[move.to] = config[move.from]
        setConfig(tempBoard)
        socket.emit('change',JSON.stringify({rid,tempBoard}))
        console.log(rid)
        // if(temp.length===1)setTurn(turn==='W'?'B':'W')

    }

    useEffect(()=>{
        if(move){
            changeBoard(move)
        }
    },[move])


    useEffect(()=>{
        let cnt = {
            "B_QUEEN":1,"B_PAWN":8,"B_KNIGHT":2,"B_ROOK":2,"B_BISHOP":2,"B_KING":1,
            "W_QUEEN":1,"W_PAWN":8,"W_KNIGHT":2,"W_ROOK":2,"W_BISHOP":2,"W_KING":1,"":0,"B":0,"W":0
        }
        for(let i=0;i<squareNo.length;i++){
            cnt[config[squareNo[i]]]--;
        }
        let arr = ["_QUEEN","_PAWN","_KNIGHT","_ROOK","_BISHOP","_KING"]
        for(let i=0;i<6;i++){
            setBlackScore(blackScore+(score[arr[i].slice(1)]*cnt["B"+arr[i]]))
            setWhiteScore(whiteScore+(score[arr[i].slice(1)]*cnt["W"+arr[i]]))
        }
    },[config])

    useEffect(()=>{
        if(turn.length>1){
            let {piece,from,to} = move
            let tempBoard = {...config}
            tempBoard[to] = exchange
            setConfig(tempBoard)
            let data = {rid,tempBoard}
            socket.emit('change',JSON.stringify(data))
        }
    },[socket,exchange])

    useEffect(()=>{
        socket.on('move-log',msg=>{
          let data = JSON.parse(msg)
          if(data.piece[0]==='W'){
            setTurn('B')
            console.log(data)
          }else {
            setTurn('W')
            console.log(data)
          }
        })
        return ()=>{
          socket.off('move-log')
        }
      },[socket,turn])

      useEffect(()=>{
        socket.on('change-board',data => {setConfig(JSON.parse(data).tempBoard);console.log(JSON.parse(data).tempBoard);})
        return ()=>{
            socket.off('change-board')
        }
      },[socket,config])

    return(
        <>
            <div className="btn-game-menu">
                <button onClick={()=>window.location.reload()} className="btn-game">New Game</button>
                <div style={{display:"flex",justifyContent:"space-between",gap:"20px",color:"white"}}>
                    <p>Black:{blackScore}</p>
                    <p>White:{whiteScore}</p>
                </div>
                </div>
            <div className={`board${turn==='B'?'-rev':''}`}>
                {
                    pieces.map((piece,index)=>(
                        <Piece color={piece.color} val={piece.val} key={index}/>
                    ))
                }
            </div>
        </>
    )
}