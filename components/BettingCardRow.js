import { VictoriousContext } from '../context/VictoriousContext'
import React, { useContext, useEffect } from 'react'
import BetModal from './BetModal'
import { generateKey } from 'crypto'
import Popup from 'reactjs-popup'

const styles = {
    bettingCardRow: `flex items-center justify-between mb-4 text-[0.93rem]`,
}

const BettingCardRow = ({globalBetId, gameId, sportId, sportIcon, leagueIcon, 
                         homeTeam, awayTeam, startTime, betPrice, paidOut,
                         winningsPaid }) => {
  
    const { 
      //placeBet,
      setIsLoading,
      setDisable
     } = useContext(VictoriousContext)


    return (
    <div className={styles.bettingCardRow}>
        
        <div className='w-full flex'>
    
            <div className='flex text-base'>{leagueIcon}</div> &nbsp;&nbsp; {sportIcon}
            &nbsp;
            &nbsp;
            <Popup onClose={() => {
                setIsLoading(false)
                setDisable(false)
                //console.log('close')
              }} trigger=
            {
              <p className='font-bold cursor-pointer hover:opacity-60'>
                  {homeTeam} - {awayTeam}
              </p>
            } modal>
            {close => (
              <BetModal 
                homeTeam={homeTeam} 
                awayTeam={awayTeam} 
                sportId={sportId}
                globalBetId={globalBetId}
                gameId={gameId}
                close={close} 
                betPrice={betPrice}
                paidOut={paidOut}
                winningsPaid={winningsPaid}
                //placeBet={placeBet} 
                //globalBet={globalBet}
                //betParticipants={betParticipants}
              />  
            )} 
            </Popup>
            <div className='mx-5'>
                <span className='text-gray-400'>{startTime}</span>
            </div>
            {/* <Popup onClose={() => {
                setIsLoading(false)
                setDisable(false)
                //console.log('close')
              }} trigger={<button className="rounded px-5 ml-auto ont-bold bg-blue-500" 
            >Bet</button>} modal>
            {close => (
              <BetModal 
                homeTeam={homeTeam} 
                awayTeam={awayTeam} 
                sportId={sportId}
                globalBetId={globalBetId}
                gameId={gameId}
                close={close} 
                betPrice={betPrice}
                winningsPaid={winningsPaid}
                //placeBet={placeBet} 
                //globalBet={globalBet}
                //betParticipants={betParticipants}
              />  
            )}          
            </Popup> */}

        </div>

    </div>

  )
}

export default BettingCardRow