import React, { useContext, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { VictoriousContext } from '../context/VictoriousContext'
import { ScaleLoader } from 'react-spinners'
import Link from 'next/link'
import { RadioGroup } from '@headlessui/react'


const styles = {
    container: `py-3 pb-3 bg-[#323546] rounded-xl text-white mr-`,
    closeX: `w-full h-[20px] flex items-center justify-end mb-[20px]`,
    title: `text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[40px]`,
    content: `flex w-full ml-[30px] justify-center`,
    betBtn: `h-[30px] bg-blue-500 mt-[40px] rounded-lg p-[15px] flex mx-auto text-white justify-center items-center cursor-pointer`,
    betBtnDisabled: `h-[30px] bg-blue-500 mt-[40px] rounded-lg p-[15px] flex mx-auto text-white justify-center items-center disabled:opacity-60`,
    loaderContainer: `flex items-center justify-center`,
}

const betOptions = [
  {
    team: 'Home Team',
    num: 0,
    result: 'win',
  },
  {
    team: 'Away Team',
    num: 1,
    result: 'win',
  },
  {
    team: 'Draw',
    num: 2,
    result: 'draw',
  },
]


const BetModal = ({ homeTeam, awayTeam, sportId, globalBetId, close, placeBet }) => {

  function BuildSelection(num) {
    
    let returnVal

    if (num == 0) {
      returnVal = homeTeam
    }
    else if (num == 1) {
      returnVal = awayTeam
    }
    else if (sportId == 5 && num == 2) {
      returnVal = 'Teams'
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

//   const {

//   } = useContext(VictoriousContext)
const [selected, setSelected] = useState(betOptions)
//const [disable, setDisable] = useState(false);
//const [isLoading, setIsLoading] = useState(false)


const {
  isLoading,
  setIsLoading,
  disable,
  setDisable

} = useContext(VictoriousContext) 



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

    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {betOptions.map((option) => ( 
              //Only soccer has the draw option
              (sportId == 5 || (sportId != 5 && option.num != 2)) ?
              <RadioGroup.Option
                key={option.num}
                value={option}
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
                            {BuildSelection(option.num) + ' to ' + option.result}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {option.team}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{option.result}</span>
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

                </>
              )}

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
            {
      //       </>
      // )
      }
    </div>
  )
}



export default BetModal
