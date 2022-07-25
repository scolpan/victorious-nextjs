import React, { useContext, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { VictoriousContext } from '../context/VictoriousContext'
import { ScaleLoader } from 'react-spinners'
import Link from 'next/link'
import { RadioGroup } from '@headlessui/react'
import { rundownStatus } from '../lib/constants'

const styles = {
    container: `py-3 pb-3 bg-[#323546] rounded-xl text-white mr-`,
    closeX: `w-full h-[20px] flex items-center justify-end mb-[0px]`,
    title: `text-3xl font-bold flex flex-1 items-center mt-[0px] justify-center mb-[30px]`,
    content: `flex w-full ml-[30px] justify-center`,
    betBtn: `h-[30px] bg-blue-500 mt-[10px] rounded-lg p-[15px] flex mx-auto text-white justify-center items-center cursor-pointer`,
    betBtnDisabled: `h-[30px] bg-blue-500 mt-[10px] rounded-lg p-[15px] flex mx-auto text-white justify-center items-center disabled:opacity-60`,
    loaderContainer: `flex items-center justify-center`,
    info: `flex items-center justify-center`
}

const betOptions = [
  {
    team: 'Home',
    num: 0,
    pct: null,
    score: null,
    userBetCount: null,
    winner: false,
    winnings: null,
    //pct: homeBetPct,
    //result: 'win',
  },
  {
    team: 'Away',
    num: 1,
    pct: null,
    score: null,
    userBetCount: null,
    winner: false,
    winnings: null,
    //pct: awayBetPct,
    //result: 'win',
  },
  {
    team: 'Draw',
    num: 2,
    pct: null,
    score: null,
    userBetCount: null,
    winner: false,
    winnings: null,
    //pct: drawBetPct,
    //result: 'draw',
  },
]

//Important: Get the participant and globalbet obj when the modal is opened not to 
//put strain on the resources

const BetModal = ({ homeTeam, awayTeam, sportId, globalBetId, 
                    gameId, close, gameStarted, betPrice, paidOut, 
                    winningsPaid }) => {

  function BuildSelection(num) {
    
    let returnVal

    if (num == 0) {
      returnVal = homeTeam + ' (Home)'
    }
    else if (num == 1) {
      returnVal = awayTeam + ' (Away)'
    }
    else if (sportId == 5 && num == 2) {
      returnVal = 'Draw'
    }

    return returnVal
  }
  
  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }




const [selected, setSelected] = useState(betOptions)



const {
  user,
  placeBet,
  getBetParticipants,
  participants,
  getResolvedGame,
  resolvedGame,
  isLoading,
  setIsLoading,
  disable,
  setDisable

} = useContext(VictoriousContext) 


useEffect(() => {

  getBetParticipants(globalBetId)
  getResolvedGame(gameId)

}, []);



const homeBetAmt = participants.filter(participant => {
  
  if (participant.BetPick == 0) {
    return true
  }
  return false

}).length

const awayBetAmt = participants.filter(participant => {
  
  if (participant.BetPick == 1) {
    return true
  }
  return false

}).length


const drawBetAmt = participants.filter(participant => {
  
  if (participant.BetPick == 2) {
    return true
  }
  return false

}).length

//const drawBetAmt

const homeBetPct = homeBetAmt == 0 ? 0 : Math.round((homeBetAmt / participants.length) * 100)
const awayBetPct = awayBetAmt == 0 ? 0 : Math.round((awayBetAmt / participants.length) * 100)
const drawBetPct = drawBetAmt == 0 ? 0 : Math.round((drawBetAmt / participants.length) * 100)

const homeScore = resolvedGame.homeScore
const awayScore = resolvedGame.awayScore

const gameStatus = rundownStatus[resolvedGame.statusId]


const gameResult = () => {

  let result;

  if (resolvedGame.statusId == 8 || resolvedGame.statusId == 11) {

    if (homeScore > awayScore) {
      result = 0
    }
    else if (awayScore > homeScore) {
      result = 1
    }
    else if (homeScore == awayScore) {
      result = 2
    }

    return result

  }  

}

//Select corresponding radio option when the final result is available
useEffect(() => {

  setSelected(betOptions[gameResult()])

}, [resolvedGame]);



//console.log(gameStarted)

// useEffect(() => {
//   //console.log(gameResult())
//   setSelected(betOptions[gameResult()])

// }, []);

//console.log(paidOut)

// console.log('%' + homeWinBetPct)
// console.log('%' + awayWinBetPct)
// console.log('%' + drawBetPct)

const totalCashPool = betPrice * participants.length
const winningsEstHome = (totalCashPool / homeBetAmt) * 0.95
const winningsEstAway = (totalCashPool / awayBetAmt) * 0.95
const winningsEstDraw = (totalCashPool / drawBetAmt) * 0.95


//Get the number of bets made by the signed in user for the home team
const userBetAmtHome = participants.filter(p => {

  if (p.ParticipantAddress.toLowerCase() == user.attributes.ethAddress &&
      p.BetPick == 0) {
        return true
  }
  return false

}).length

//Get the number of bets made by the signed in user for the away team
const userBetAmtAway = participants.filter(p => {

  if (p.ParticipantAddress.toLowerCase() == user.attributes.ethAddress &&
      p.BetPick == 1) {
        return true
  }
  return false

}).length

//Get the number of bets made by the signed in user for a draw
const userBetAmtDraw = participants.filter(p => {

  if (p.ParticipantAddress.toLowerCase() == user.attributes.ethAddress &&
      p.BetPick == 2) {
        return true
  }
  return false

}).length

//setSelected(betOptions[1])

betOptions.filter(option => {

  if (option.team == 'Home') {
    option.pct = homeBetPct
    option.score = homeScore
    option.userBetCount = userBetAmtHome
    option.winner = paidOut && (homeScore > awayScore)
    option.winnings = winningsEstHome * userBetAmtHome

  }
  if (option.team == 'Away') {
    option.pct = awayBetPct
    option.score = awayScore
    option.userBetCount = userBetAmtAway
    option.winner = paidOut && (awayScore > homeScore)
    option.winnings = winningsEstAway * userBetAmtAway

  }
  if (option.team == 'Draw') {
    option.pct = drawBetPct
    option.userBetCount = userBetAmtDraw
    option.winner = paidOut && (homeScore == awayScore)
    option.winnings = winningsEstDraw * userBetAmtDraw

  }

})


//console.log(betOptions[1])

//Get the number of bets made by the signed in user
// const userBetAmt = participants.filter(p => {

//   if (p.ParticipantAddress.toLowerCase() == user.attributes.ethAddress) {
//     return true
//   }
//   return false

// }).length





//console.log(betPrice)
//console.log(winningsPaid)


//const test = resolvedGame
//console.log(test)

// getBetParticipants(globalBetId).then(function(result) {
//   console.log(result) 
// })

//console.log(getBetParticipants(globalBetId))


  return (
    <div className={styles.container}>

        {
        // {isLoading ? (
        //         <>
        //           <div className={styles.loaderContainer}>
        //             <ScaleLoader size={80} color={"white"} />
        //           </div>
        //         </>
        //       ) : (
        //         <>

        }
          <div className={styles.closeX}>
            <IoIosClose
              //onClose={console.log('close')}
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
          
          <div className={styles.info}>Game status: { gameStatus }</div>
          <div className={styles.info}>Total cash pool: { totalCashPool } ETH</div>
          <div className={styles.info}>{ participants.length } total { participants.length == 1 ? ' pick' : ' picks' }</div>
          {/* <div className={styles.info}>{ userBetAmt + (userBetAmt == 1 ? ' pick' : ' picks') } by you</div> */}


    <div className="w-full px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          {/* <RadioGroup.Label className="sr-only"></RadioGroup.Label> */}
          <div className="space-y-2">
            {betOptions.map((option) => ( 
              //Only soccer has the draw option
              (sportId == 5 || (sportId != 5 && option.num != 2)) ?
              <RadioGroup.Option
                key={option.num}
                value={option}
                disabled={gameStarted ? true : false}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {/*option.team*/}
                            {BuildSelection(option.num)}
                            {' '}
                            { option.team != 'Draw' ? <span aria-hidden="true">&middot;</span> : '' } 
                            {' '}
                            { <span>{option.score}</span> }
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            {/* <span>
                              {option.team}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '} */}
                            <span>{option.pct + '%'} pick rate</span>
                            { option.userBetCount > 0 ? <span aria-hidden="true"> &middot; { option.userBetCount + (option.userBetCount == 1 ? ' pick' : ' picks') } by you { option.winner ? String.fromCharCode(183) + ' Winnings: ' + +option.winnings.toFixed(5) + ' ETH' : ( paidOut ? '' : String.fromCharCode(183) + ' Psbl winnings: ' + +option.winnings.toFixed(5) + ' ETH') } </span> : '' }
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option> : ''
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>

         {isLoading ? (
                <>
                  <div className={styles.loaderContainer}>
                    <ScaleLoader size={80} color={"white"} />
                  </div>
                </>
              ) : (
                <>
                  <div className='mt-[20px] mb-[35px] flex items-center justify-center'>
                  </div>
                </>
              )}
            { !gameStarted ? 
            <button className={disable ? styles.betBtnDisabled : styles.betBtn}
                    disabled={disable}
                    //keep it disabled before a bet option selection
              // disabled={!tokenAmount || tokenAmount < 0}
               onClick={() => {
                //selected.num != undefined ?
                //console.log(selected.num)
                
                if (selected.num !== undefined) {

                setIsLoading(true)
                placeBet(globalBetId, selected.num)
                setDisable(true)

                }
                
                
               }}
            >
              Place Bet
            </button>
            : '' }
            {
      //       </>
      // )
      }
    </div>
  )
}



export default BetModal
