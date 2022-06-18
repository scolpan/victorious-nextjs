import React from 'react'
import Image from 'next/image'
import BettingCardRow from './BettingCardRow'

const styles = {
    bettingCard: `p-5 py-3 pb-0 bg-[#323546] rounded-xl text-white mr-3`,
    bettingCardWrapper: `flex items-center justify-between`,
}

const BettingCard = ({title, icon, gameData}) => {
  return (
    <div className={styles.bettingCard}>
        <div className={styles.bettingCardWrapper}>
            <div className='flex'>
                { /* icon && <Image src={icon} width={27} height={27} alt='' />  */ }
                {}
                
                { /* <p className='font-bold'>{title}</p>  */ }
            </div> 

        </div>
        <br />
        {gameData.map((item, index) => {

            return (
                <BettingCardRow 
                key={index} 
                globalBetId={item.GlobalBetId} 
                sportId={item.SportId}
                sportIcon={item.SportIcon}
                homeTeam={item.HomeTeam}
                awayTeam={item.AwayTeam}
                startTime={item.StartTime}

                />
            )
        })}
    </div>
  )
}

export default BettingCard