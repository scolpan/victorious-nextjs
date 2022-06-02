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

export const VictoriousContext = createContext()

export var bets = []

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

export const VictoriousProvider = ({children}) => {

    //const [assets, setAssets] = useState([])
    const [currentAccount, setCurrentAccount] = useState('')
    const [recentTransactions, setRecentTransactions] = useState([])
    const [sports, setSports] = useState('')
    const [leagues, setLeagues] = useState([])
    const [gameIds, setGameIds] = useState([])
    const [createdGames, setCreatedGames] = useState([])
    const [globalBets, setGlobalBets] = useState([])
    //const [bets, setBets] = useState([])

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

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
            if (gameCount === bets.length) {
                forceUpdate()
            }
            //await getGlobalBets(createdGames)
            
        } else {
        }
    }, [globalBets])



    const connectWallet = async () => {
        await enableWeb3()
        await authenticate()
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

                const globalBetObj = {
                    GlobalBetId: response.globalBetId.toString(),
                    SportId: gameCreated.SportId,
                    SportIcon: getSportIcon(gameCreated.SportId),
                    LeagueId: gameCreated.LeagueId,
                    GameId: gameCreated.GamesCreated.gameId,
                    HomeTeam: gameCreated.GamesCreated.homeTeam,
                    AwayTeam: gameCreated.GamesCreated.awayTeam,
                    StartTime: gameCreated.GamesCreated.startTime.toString(),
                    GlobalBet: response
                }

                await setGlobalBets(globalBetObj)
                await bets.push(globalBetObj)
                //console.log(gameCount)

                
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

                gameCount++
                //console.log("LeagueId: " + leagueId)
                //console.log(response)
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
            bets
        }}
        >
            {children}

        </VictoriousContext.Provider>
    )


}