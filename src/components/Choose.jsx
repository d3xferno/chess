import { useContext } from "react"
import { chessContext } from "../context/context"

export default function Choose(){
    const {setShow,setExchange,turn} = useContext(chessContext)
    return (
        <div className="choose">
            <img src={`${turn[0]}_PAWN.svg`} onClick={
                ()=>{
                    setExchange(turn[0]+"_PAWN")
                    setShow(false)
                }
            }/>
            <img src={`${turn[0]}_BISHOP.svg`} onClick={
                ()=>{
                    setExchange(turn[0]+"_BISOP")
                    setShow(false)
                }
            }/>
            <img src={`${turn[0]}_KNIGHT.svg`} onClick={
                ()=>{
                    setExchange(turn[0]+"_KNIGHT")
                    setShow(false)    
                }}/>
            <img src={`${turn[0]}_QUEEN.svg`} onClick={
                ()=>{
                    setExchange(turn[0]+"_QUEEN")
                    setShow(false)    
                }}/>
            <img src={`${turn[0]}_ROOK.svg`} onClick={
                ()=>{
                    setExchange(turn[0]+"_ROOK")
                    setShow(false)
                }}/>
        </div>
    )
}
