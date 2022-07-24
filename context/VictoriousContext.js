import { createContext, useState, useEffect, useCallback } from 'react'
import { useMoralis } from 'react-moralis'
import { victoriousAddress } from '../lib/constants'
import victoriousAbi from '../lib/Victorious.abi.json'
import { ethers, BigNumber } from 'ethers'

import AmericanFootball from '../assets/svg/americanFootball'
import Soccer from '../assets/svg/soccer'
import Baseball from '../assets/svg/baseball'
import Hockey from '../assets/svg/hockey'
import Basketball from '../assets/svg/basketball'

import Canada from '../assets/svg/canada'
import England from '../assets/svg/england'
import Europe from '../assets/svg/europe'
import Germany from '../assets/svg/germany'
import France from '../assets/svg/france'
import Italy from '../assets/svg/italy'
import Spain from '../assets/svg/spain'
import UK from '../assets/svg/uk'
import USA from '../assets/svg/usa'


export const VictoriousContext = createContext()
export var bets = []
//export var betParticipants = []

var gameCount = 0

var getSportIcon = (sportId) => {
        
    const sportIcon = () => {

        if (sportId == 1) { return <AmericanFootball /> }
        if (sportId == 2) { return <Baseball /> }
        if (sportId == 3) { return <Basketball /> }
        if (sportId == 4) { return <Hockey /> }
        if (sportId == 5) { return <Soccer /> }
    }

    return sportIcon()
}



var getLeagueIcon = (leagueId) => {

    const leagueIcon = () => {

        if (leagueId == 1 || leagueId == 2 ||
            leagueId == 5 || leagueId == 8) { 
                return <USA /> 
            }
        if (leagueId == 3 || leagueId == 4 ||
            leagueId == 6 || leagueId == 10) { 
                return (<> <Canada /> <USA /> </> )
            }        
                
        if (leagueId == 11) { return <England /> }
        if (leagueId == 12) { return <France /> }
        if (leagueId == 13) { return <Germany /> }
        if (leagueId == 14) { return <Spain /> }
        if (leagueId == 15) { return <Italy /> }
        if (leagueId == 16) { return <Europe /> }

    }

    return leagueIcon()

}

export const VictoriousProvider = ({children}) => {

    //const [assets, setAssets] = useState([])
    const [currentAccount, setCurrentAccount] = useState('')
    const [recentTransactions, setRecentTransactions] = useState([])
    const [disable, setDisable] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [betPrice, setBetPrice] = useState('')
    const [sports, setSports] = useState('')
    const [leagues, setLeagues] = useState([])
    const [gameIds, setGameIds] = useState([])
    const [createdGames, setCreatedGames] = useState([])
    const [resolvedGame, setResolvedGame] = useState([])
    const [globalBets, setGlobalBets] = useState([])
    const [participants, setParticipants] = useState([])

    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])


    //const sportId = 5


    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis()



    useEffect(async () => {
        //console.log(assetsData)
        if (!isWeb3Enabled) {
            await enableWeb3()
        }
        
        if (isAuthenticated) {
            await getSports()
            await getBetPrice()
            //await getLeagues(5) //Soccer
            //await getGameIds(10) //MLS

        } else {
            //setSports('')
            //bets = []
        }
        
    }, [isWeb3Enabled,isAuthenticated])



    useEffect(async () => {
        if (!isWeb3Enabled) {
            await enableWeb3()
        }
        if (isAuthenticated) {
            for (let i = 1; i <= sports; i++) {
                await getLeagues(i)
            }
        } else {
        }
    }, [sports])


    useEffect(async () => {
        if (!isWeb3Enabled) {
            await enableWeb3()
        }
        if (isAuthenticated) {
            //await getGameIds(leagues.leagueId)
            //console.log(leagues)
            leagues.Leagues.forEach(async (league) => {
                await getGameIds(league, leagues.SportId)
            })
        } else {
        }
    }, [leagues])


    useEffect(async () => {
        if (!isWeb3Enabled) {
            await enableWeb3()
        }
        if (isAuthenticated) {

            gameIds.Games.forEach(async (gameId) => {
                await getCreatedGames(gameId, gameIds.SportId, gameIds.League.leagueId)
            })

            //console.log(gameIds)
            
        } else {
        }
    }, [gameIds])



    useEffect(async () => {
        if (!isWeb3Enabled) {
            await enableWeb3()
        }
        if (isAuthenticated) {
            
            await getGlobalBets(createdGames)
            
        } else {
        }
    }, [createdGames])


    useEffect(async () => {
        if (!isWeb3Enabled) {
            await enableWeb3()
        }
        if (isAuthenticated) {
            
            //ensures update after useEffect
            //if (gameCount === bets.length) {
                forceUpdate()
            //}
            //await getGlobalBets(createdGames)
            
        } else {
        }
    }, [globalBets])



    const connectWallet = async () => {
        await enableWeb3()
        await authenticate()
    }


    const placeBet = async (globalBetId, betPick) => {
        try {
            if (!isAuthenticated) {
                await connectWallet()
            }

            const options = {
                contractAddress: victoriousAddress,
                functionName: 'placeBet',
                abi: victoriousAbi,
                msgValue: betPrice,
                params: {
                    globalBetId: globalBetId,
                    pick: betPick
                },
            }

            if (isWeb3Enabled) {

                const response = await Moralis.executeFunction(options)
                const receipt = await response.wait()

                //console.log(receipt)

                //Update participant list
                await getBetParticipants(globalBetId)

                //const participants = await getBetParticipants(globalBetId)
                //get globalbet object with globalbetid

            }

            //Display message that bet has been placed, perhaps get bet details.
            //Number of participants
            //% of bets for each outcome
            //If the current connected address is a participant or not and..
            //..how much is he/she invested in the bet.
            //How much the estimated payout will be. (Subject to change)
            //Estimated payout if the current address were to bet


        }
        catch (error) {
            //console.log(error)
            //User rejecting the transaction or any other error,
            //display a message and enable some elements
            //setDisable(false)
            //setIsLoading(false)
        }

        setDisable(false)
        setIsLoading(false)

    }


    const getGlobalBets = async (gameCreated) => {
        try {
            if (!isAuthenticated) {
                await connectWallet()
            }
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getBet',
                abi: victoriousAbi,
                params: {
                    gameId: gameCreated.GamesCreated.gameId
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                const convertedDate = new Date(gameCreated.GamesCreated.startTime * 1000)

                //const participants = await getBetParticipants(response.globalBetId.toString())

                const globalBetObj = {
                    GlobalBetId: response.globalBetId.toString(),
                    SportId: gameCreated.SportId,
                    SportIcon: getSportIcon(gameCreated.SportId),
                    LeagueId: gameCreated.LeagueId,
                    LeagueIcon: getLeagueIcon(gameCreated.LeagueId),
                    GameId: gameCreated.GamesCreated.gameId,
                    HomeTeam: gameCreated.GamesCreated.homeTeam,
                    AwayTeam: gameCreated.GamesCreated.awayTeam,
                    //StartTime: convertedDate.toString(),
                    StartTime: convertedDate.toLocaleString(),
                    StartTimeRaw: gameCreated.GamesCreated.startTime,
                    BetPrice: ethers.utils.formatEther(response.betPrice),
                    PaidOut: response.paidOut,
                    WinningsPaid: ethers.utils.formatEther(response.totalPaid),
                    //GlobalBet: response,
                    //Participants: participants
                }

                await setGlobalBets(globalBetObj)

                //Look for already inserted globalBetId
                const index = bets.findIndex(x => x.GlobalBetId === globalBetObj.GlobalBetId); 
                //Only insert if doesn't exist
                index === -1 ? await bets.push(globalBetObj) : "" //console.log(globalBetObj.GlobalBetId)
                //console.log(gameCount)

            }

        }
        catch (error) {
            console.log(error)
        }
    }


    const getBetParticipants = async (globalBetId) => {
        
        try {
            if (!isAuthenticated) {
                await connectWallet()
            }
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getBetParticipants',
                abi: victoriousAbi,
                params: {
                    globalBetId: globalBetId
                },
            }

            if (isWeb3Enabled) {
                
                const response = await Moralis.executeFunction(options)

                var betParticipants = []

                response.forEach(async (p) => {

                    const betParticipantObj = {
                        ParticipantId: p.participantId.toString(),
                        GlobalBetId: globalBetId,
                        ParticipantAddress: p.participant,
                        BetPick: p.pick
                    }

                    await betParticipants.push(betParticipantObj)
                
                })

                //return betParticipants
                setParticipants(betParticipants)

            }

        }
        catch {

        }

    }


    const getCreatedGames = async (gameId, sportId, leagueId) => {
        try {
            if (!isAuthenticated) {
                await connectWallet()
            }
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getGameCreated',
                abi: victoriousAbi,
                params: {
                    gameId: gameId
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                const gameCreatedObj = {
                    SportId: sportId,
                    LeagueId: leagueId,
                    GamesCreated: response
                }

                await setCreatedGames(gameCreatedObj)

                //gameCount++
                //console.log("LeagueId: " + leagueId)
                //console.log(response)
            }

        }
        catch {
            
        }
    }


    const getResolvedGame = async (gameId) => {
        try {
            if (!isAuthenticated) {
                await connectWallet()
            }
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getGameResolved',
                abi: victoriousAbi,
                params: {
                    gameId: gameId
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                const gameResolvedObj = response

                await setResolvedGame(gameResolvedObj)

            }

        }
        catch {
            
        }
    }

    
    const getGameIds = async (league, sportId) => {
        try {
            if (!isAuthenticated) {
                await connectWallet()
            }
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getGameIds',
                abi: victoriousAbi,
                params: {
                    leagueId: league.leagueId
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                const gameObj = {
                    SportId: sportId,
                    League: league,
                    Games: response
                }

                await setGameIds(gameObj)
                //console.log("LeagueId: " + leagueId)
                //console.log(response)
            }

        }
        catch {
            
        }
    }


    const getLeagues = async (sportId) => {
        try {
            if (!isAuthenticated) {
                await connectWallet()
                //console.log('Connected')
            }          
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getLeagues',
                abi: victoriousAbi,
                params: {
                    sportId: sportId
                },
            }

            //console.log(options)

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                const leagueObj = {
                    SportId: sportId,
                    Leagues: response
                }

                await setLeagues(leagueObj)
                //console.log(response)
                //console.log("SportId: " + sportId)
            }
        
        } 
        catch (error) {
            console.log(error)
        }
    }

    const getBetPrice = async () => {
        
        if (!isAuthenticated) {
            await connectWallet()
        }

        const options = {
            contractAddress: victoriousAddress,
            functionName: 'getBetPrice',
            abi: victoriousAbi,
        }

        if (isWeb3Enabled) {
            
            const response = await Moralis.executeFunction(options)

            await setBetPrice(response)

        }
    }
    
    const getSports = async () => {

        if (!isAuthenticated) {
            await connectWallet()
        }
        
        const options = {
            contractAddress: victoriousAddress,
            functionName: 'getSports',
            abi: victoriousAbi,
        }

        if (isWeb3Enabled) {
            
            const response = await Moralis.executeFunction(options)

            await setSports(response.toString())
      
        }
    }


    return (
        <VictoriousContext.Provider
        value = {{
            isAuthenticated,
            user,
            bets,
            placeBet,
            participants,
            getBetParticipants,
            resolvedGame,
            getResolvedGame,
            isLoading,
            setIsLoading,
            disable,
            setDisable
        }}
        >
            {children}

        </VictoriousContext.Provider>
    )


}