import React from 'react'

const styles = {
    bettingCardRow: `flex items-center justify-between mb-4 text-[0.93rem]`,

}

const BettingCardRow = ({globalBetId, sportIcon, homeTeam, awayTeam, startTime}) => {
  return (
    <div className={styles.bettingCardRow}>
        
        <div className='w-full flex'>
    

            {sportIcon}
            &nbsp;
            &nbsp;
            <p className='font-bold'>
                {homeTeam} - {awayTeam}
            </p>
            
            <div className='mx-5'>
                <span className='text-gray-400'>{startTime}</span>
            </div>
        </div>


    </div>
  )
}

export default BettingCardRow