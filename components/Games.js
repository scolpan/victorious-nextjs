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
    h2: `text-xl text-white`,
    flexCenter: `flex items-center justify-center pb-[50px]`,
}


const Games = () => {
    const [checked, setChecked] = useState(false)

    const {
        connected,
        isAuthenticated,
        //bets,
        globalBets,
        chainId

    } = useContext(VictoriousContext) 


    //Returns true if date given is newer than yesterday, false otherwise.
    const checkDate = (date) => {

        let controlDate = date * 1000

        let today = new Date()
        let yesterday = today.setDate(today.getDate() - 1)

        //console.log(yesterday)
        //console.log(controlDate > yesterday)

        return controlDate > yesterday

    }
    


    //Unique GlobalBetId
    const gbFiltered = globalBets.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.GlobalBetId === value.GlobalBetId
        ))
    )

    const gameBetData = gbFiltered
        .filter(bet => { return checkDate(bet.StartTimeRaw) } )
        .sort((a,b) => a.StartTimeRaw - b.StartTimeRaw || 
                       b.LeagueId - a.LeagueId || 
                       a.GlobalBetId - b.GlobalBetId); // b - a for reverse sort


    //console.log(gameBetData.sort((a,b) => a.GlobalBetId - b.GlobalBetId))


  return (
    <div className='text-white'>
        {

    //         !connected ? (

    //         <div className={styles.gameWrapper}>
    //         <div className='flex justify-around'>

    //         <h1 className={styles.h2}>Not connected, please connect with Metamask.</h1>  

    //         </div>
    //     </div> ) :
    
    // chainId != 5 ?

    //     <div className={styles.gameWrapper}>
    //         <div className='flex justify-around'>

    //         <h1 className={styles.h2}>Wrong network, please use Polygon or Goerli (for testing).</h1>  

    //         </div>
    //     </div>

    // :

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
    }
    </div>
  )
}

export default Games
