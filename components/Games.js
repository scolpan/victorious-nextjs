import React, {useState} from 'react'
import { useContext } from 'react'
import { VictoriousContext } from '../context/VictoriousContext'
//import { test } from '../context/VictoriousContext'
import AmericanFootball from '../assets/svg/americanFootball'
import Soccer from '../assets/svg/soccer'
import Baseball from '../assets/svg/baseball'
import Hockey from '../assets/svg/hockey'
import Basketball from '../assets/svg/basketball'
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
    flexCenter: `flex items-center justify-center`,
}


//console.log(test);




const Games = () => {
    const [checked, setChecked] = useState(false)

    //const gameData = test;
    const {
        isAuthenticated,
        bets

    } = useContext(VictoriousContext) 
    
    const gameBetData = bets.sort((a,b) => a.GlobalBetId - b.GlobalBetId); // b - a for reverse sort

    //forceUpdate()

    //console.log(gameBetData);
    //if (Object.keys(globalBets).length > 0) {
        //console.log(globalBets)
        //gameData.push(globalBets)
    //}

/*
    const gameData = [

        {
            globalBetId: 1,
            sportId: 3,
            sportIcon: <Basketball />,
            homeTeam: "Boston Celtics",
            awayTeam: "Golden State Warriors",
            startTime: "May 29 7:00 PM EDT"
        },
    
        {
            globalBetId: 2,
            sportId: 4,
            sportIcon: <Hockey />,
            homeTeam: "Edmonton Oilers",
            awayTeam: "Tampa Bay Lightning",
            startTime: "May 29 7:00 PM EDT"
        },
    
        {
            globalBetId: 3,
            sportId: 5,
            sportIcon: <Soccer />,
            homeTeam: "Chicago Fire",
            awayTeam: "Toronto Football Club",
            startTime: "May 29 7:00 PM EDT"
        },
    
        {
            globalBetId: 4,
            sportId: 1,
            sportIcon: <AmericanFootball />,
            homeTeam: "New England Pats",
            awayTeam: "Buffalo Bills",
            startTime: "May 29 7:00 PM EDT"
        },
    
        {
            globalBetId: 5,
            sportId: 2,
            sportIcon: <Baseball />,
            homeTeam: "Toronto Blue Jays",
            awayTeam: "Chicago Red Sox",
            startTime: "May 29 7:00 PM EDT"
        }
    ]
*/

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

                <BettingCard title='Games' icon={fire} gameData = {gameBetData} />
                
            </div>

        </div>

    </div>
  )
}

export default Games
