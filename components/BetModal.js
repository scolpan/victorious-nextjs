import React, { useContext, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'
import { VictoriousContext } from '../context/VictoriousContext'
import { HashLoader } from 'react-spinners'
import Link from 'next/link'

const styles = {
    container: `p-5 py-3 pb-0 bg-[#323546] rounded-xl text-white mr-`,
    closeX: `w-full h-[50px] flex items-center justify-end mb-[20px]`,
    title: `text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[40px]`,
    content: `flex w-full mb-[30px] text-xl justify-center`,
}

const BetModal = ({ homeTeam, awayTeam, globalBetId, close, placeBet }) => {


//   const {

//   } = useContext(VictoriousContext)


  return (
    <div className={styles.container}>

          <div className={styles.closeX}>
            <IoIosClose
              onClick={() => {
                close()
              }}
              fontSize={50}
              className='cursor-pointer'
            />
          </div>
          <div className={styles.title}>
            {homeTeam} - {awayTeam}
          </div>

          <div className={styles.input}>
            {/* <input
              type='text'
              placeholder='Amount...'
              className={styles.inputBox}
              onChange={e => setTokenAmount(e.target.value)}
              value={tokenAmount}
            /> */}
          </div>
          <div className={styles.price}>
            Total Due:{' '}
            {/* {tokenAmount && tokenAmount > 0 ? amountDue + 'ETH' : '0 ETH'} */}
          </div>
          <button
            // className={styles.buyBtn}
            // disabled={!tokenAmount || tokenAmount < 0}
            // onClick={() => {
            //   setIsLoading(true)
            //   buyTokens()
            // }}
          >
            Buy
          </button>
    </div>
  )
}



export default BetModal
