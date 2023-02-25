import React, { useContext, useEffect, useState } from 'react'
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
    h2: `text-xl text-white`,
    flexCenter: `flex items-center justify-center pb-[50px]`,
}


const UserGames = () => {
    //const [checked, setChecked] = useState(false)

    const {
        //connected,
        chainId,
        isWeb3Enabled,
        globalBets,
        //getUserBets,
        userBets,

    } = useContext(VictoriousContext) 

    // useEffect(() => {

    //     getUserBets()
      
    // }, []);

    const gbFiltered = globalBets.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.GlobalBetId === value.GlobalBetId
        ))
    )


    //Returns true if bets match those of user, false otherwise.
    const checkBet = (bet) => {
        return userBets.includes(bet)
    }
    
    const gameBetData = gbFiltered
        .filter(bet => { return checkBet(bet.GlobalBetId) } )
        .sort((a,b) => b.StartTimeRaw - a.StartTimeRaw || 
                       b.LeagueId - a.LeagueId || 
                       a.GlobalBetId - b.GlobalBetId); // b - a for reverse sort


  return (
    <div className='text-white'>
        {

        !isWeb3Enabled ? (

            <div className={styles.gameWrapper}>
            <div className='flex justify-around'>

            <h1 className={styles.h2}>Not connected, please connect with Metamask.</h1>  

            </div>
        </div> ) :

        chainId != 5 ?

        <div className={styles.gameWrapper}>
            <div className='flex justify-around'>

            <h1 className={styles.h2}>Wrong network, please use Polygon (for real money) or Goerli (for testing).</h1>  

            </div>
        </div>

        :

        <div className={styles.gameWrapper}>
            <div className='flex justify-around'>
                <h1 className={styles.h1}>My Games</h1>



            </div>

            <br />


            <div className={styles.flexCenter}>

                <BettingCard title='Games' icon={fire} gameData={gameBetData} />
                
            </div>

        </div>
}

    </div>
  )
}

export default UserGames
