import './App.css'
import Board from './components/Board'
import Choose from './components/Choose'
import { useContext,useEffect,useState } from 'react'
import { chessContext } from './context/context'
import { socket } from './utils/socket'
import GameInit from './components/GameInit'

function App() {
  const context = useContext(chessContext)
  const [show,setShow] = useState(false)
  const [turn,setTurn] = useState('W')
  const [exchange,setExchange] = useState('W_PAWN')
  const [menu,setMenu] = useState(false)
  const [rid,setRid] = useState('')

  return (
    <div className='app'>
      <chessContext.Provider value={
        {
          show,setShow,
          turn,setTurn,
          exchange,setExchange,
          menu,setMenu,
          rid,setRid
        }
        }>
      {
        menu
        ?
        <div className={`main`}>
          <div className='main-sub-div'>
            <Board/>
          </div>
          {show && <Choose color={turn}/>}
        </div>
        :
        <GameInit/> 
      }
      </chessContext.Provider>
    </div>
  )
}

export default App
