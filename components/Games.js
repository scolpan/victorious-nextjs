import React, {useState} from 'react'
import { useContext } from 'react'
import { VictoriousContext } from '../context/VictoriousContext'
//import { test } from '../context/VictoriousContext'
import fire from '../assets/fire.png'
//import btc from "../assets/btc.png"
//import usdt from "../assets/usdt.png"
import gainers from "../assets/gainers.png"
import recent from "../assets/recent.png"
import ReactSwitch from 'react-switch'
import BettingCard from './BettingCard'


const styles = {
    gameWrapper: `mx-auto max-w-screen-2xl`,
    h1: `text-3xl text-white`,
    flexCenter: `flex items-center justify-center pb-[50px]`,
}



const Games = () => {
    const [checked, setChecked] = useState(false)

    const {
        isAuthenticated,
        bets,

    } = useContext(VictoriousContext) 
    
    const gameBetData = bets.sort((a,b) => a.StartTimeRaw - b.StartTimeRaw || b.LeagueId - a.LeagueId); // b - a for reverse sort


    //console.log(betPrice);


  return (
    <div className='text-white'>
        <div className={styles.gameWrapper}>
            <div className='flex justify-around'>
                <h1 className={styles.h1}>Available Games</h1>

{/*
                <div className='flex'>
                    <p className='text-gray-400 '>Highlights &nbsp;</p>
                    <ReactSwitch checked={checked} onChange={() => {setChecked(!checked)}} />
                </div>

*/}
            </div>

            <br />


            <div className={styles.flexCenter}>

                <BettingCard title='Games' icon={fire} gameData={gameBetData} />
                
            </div>

        </div>

    </div>
  )
}

export default Games
