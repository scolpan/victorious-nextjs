import { createContext, useState, useEffect, useCallback } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
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
//export var bets = []
export var chainId
export var connected
export var accounts
//export var betParticipants = []

//var gameCount = 0

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
                return (<> <USA /> <Canada /> </> )
            }        
            
        // if (leagueId == 6) {
        //     return (<> <Canada /> <USA /> </> )        
        // }
            
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
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    //const [showEtherscanLink, setShowEtherscanLink] = useState(false)
    const [betPrice, setBetPrice] = useState('')
    //const [sports, setSports] = useState('')
    //const [leagues, setLeagues] = useState([])
    //const [gameIds, setGameIds] = useState([])
    //const [createdGames, setCreatedGames] = useState([])
    const [resolvedGame, setResolvedGame] = useState([])
    const [userBetDetail, setUserBetDetail] = useState([])
    const [globalBets, setGlobalBets] = useState([])
    const [participants, setParticipants] = useState([])
    const [userBets, setUserBets] = useState([])
    const [etherscanLink, setEtherscanLink] = useState('')
    const [networkName, setNetwork] = useState('')

    //const [, updateState] = useState()
    //const forceUpdate = useCallback(() => updateState({}), [])


    //const sportId = 5


    const {

        Moralis,
        user,
        isWeb3Enabled,
        web3,
    } = useMoralis()


    //useEffect(async () => {

        //console.log(web3)
        //console.log(isWeb3Enabled)
        //console.log(isAuthenticated)
        //connected = true

        //This should be a network change, refresh page not to get the
        //Error: underlying network changed (event="changed" error.
        
        /*
        if (isWeb3Enabled && isAuthenticated) {
            location.reload()
        }
        else if (!isAuthenticated) {
            connected = false
        }
        */

    //}, [web3])


    useEffect(async () => {
        
        if (isWeb3Enabled) {
            
            connected = true

            await getNetwork()

            if (chainId == 5) {

                const provider = new ethers.providers.Web3Provider(window.ethereum)     
                //const signer = await provider.getSigner()     
                //const signedMessage = await signer.signMessage("Message")
                accounts = await provider.listAccounts();

                //console.log(accounts[0])

                await getSports()
                await getBetPrice()
                await getUserBets()
                //await getuserBetDetails()
            }
            //await getLeagues(5) //Soccer
            //await getGameIds(10) //MLS


        } else {

        }
        
    }, [isWeb3Enabled])


    const payOut = async (globalBetId) => {

        try {

            const options = {
                contractAddress: victoriousAddress,
                functionName: 'payOut',
                abi: victoriousAbi,
                params: {
                    globalBetId: globalBetId
                },
            }

            if (isWeb3Enabled) {

                const response = await Moralis.executeFunction(options)
                const receipt = await response.wait()

                //console.log(receipt)

                setEtherscanLink(
                    `https://goerli.etherscan.io/tx/${receipt.transactionHash}`
                ,)

                //Update participant list
                //await getBetParticipants(globalBetId)

                //const participants = await getBetParticipants(globalBetId)
                //get globalbet object with globalbetid

            }


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


    const placeBet = async (globalBetId, betPick) => {
        try {

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

                setEtherscanLink(
                    `https://goerli.etherscan.io/tx/${receipt.transactionHash}`
                ,)

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
        //setShowEtherscanLink(true)

    }

    const gameStarted = (date) => {

        let gameStartDate = date * 1000

        let now = new Date()
        //let yesterday = today.setDate(today.getDate() - 1)

        //console.log(yesterday)
        //console.log(controlDate > yesterday)

        return now > gameStartDate

    }

    const getNetwork = async () => {

        chainId = await ethereum.request({ method: 'eth_chainId' });
        await setNetwork(getNetworkName(parseInt(chainId, 16)))
    }

    const getNetworkName = (_chainId) => {

        const networks = {
            1: "Ethereum Mainnet",
            5: "Ethereum Goerli Testnet",
            10: "Optimism Mainnet",
            137: "Polygon Mainnet",
        }

        //console.log(networks[_chainId])

        networks[_chainId] = networks[_chainId] == undefined ? 'Chain Id: ' + _chainId : networks[_chainId]

        return networks[_chainId]
    }


    const getGlobalBets = async (gameCreated) => {
        try {

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
                    //Regex for team names that remove duplicates due to mascot names coming in from The RunDown.
                    //To prevent cases like "Manchester United Manchester".
                    HomeTeam: gameCreated.GamesCreated.homeTeam.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim(),
                    AwayTeam: gameCreated.GamesCreated.awayTeam.replace(/(\b\S.+\b)(?=.*\1)/g, "").trim(),
                    //StartTime: convertedDate.toString(),
                    StartTime: convertedDate.toLocaleString(),
                    StartTimeRaw: gameCreated.GamesCreated.startTime,
                    GameStarted: gameStarted(gameCreated.GamesCreated.startTime),
                    BetPrice: ethers.utils.formatEther(response.betPrice),
                    PaidOut: response.paidOut,
                    WinningsPaid: ethers.utils.formatEther(response.totalPaid),
                    //GlobalBet: response,
                    //Participants: participants
                }

                //await bets.push(globalBetObj)

                await setGlobalBets(globalBets => [...globalBets, globalBetObj])

                //Look for already inserted globalBetId
                //const index = bets.findIndex(x => x.GlobalBetId === globalBetObj.GlobalBetId); 
                //Only insert if doesn't exist
                //index === -1 ? await bets.push(globalBetObj) : "" //console.log(globalBetObj.GlobalBetId)
                //console.log(gameCount)

            }

        }
        catch (error) {
            console.log(error)
        }
    }


    const getUserBets = async () => {

        try {

            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getUserBets',
                abi: victoriousAbi,
            }      
            
            if (isWeb3Enabled) {

                const response = await Moralis.executeFunction(options)
                
                let globalBetIds = []

                response.forEach(async (p) => {

                    const index = globalBetIds.findIndex(x => x === p.toString()); 
                    //Only insert if doesn't exist
                    index === -1 ? await globalBetIds.push(p.toString()) : ""
                
                })

                await setUserBets(globalBetIds)

            }
            
        } 
        catch(error) {

        }

    }


    const getBetParticipants = async (globalBetId) => {
        
        try {

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

                let betParticipants = []

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


                await getGlobalBets(gameCreatedObj)

            }

        }
        catch {
            
        }
    }

    const getUserBetDetails = async (participant, globalBetId) => {
        try {

            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getuserBetDetails',
                abi: victoriousAbi,
                params: {
                    participant: participant,
                    globalBetId: globalBetId
                },
            }

            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                //console.log(response)

                const getUserBetDetailObj = {
                    PaidOut: response.paidOut,
                    HomeWin: response.amtPicked.homeWin.toNumber(),
                    AwayWin: response.amtPicked.awayWin.toNumber(),
                    Tie: response.amtPicked.tie.toNumber()
                }

                await setUserBetDetail(getUserBetDetailObj)

            }

        }
        catch {
            
        }
    }


    const getResolvedGame = async (gameId) => {
        try {

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

                gameObj.Games.forEach(async (gameId) => {
                    await getCreatedGames(gameId, gameObj.SportId, gameObj.League.leagueId)
                })

            }

        }
        catch {
            
        }
    }

    const getBetPrice = async () => {
        
        
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

        const options = {
            contractAddress: victoriousAddress,
            functionName: 'getSports',
            abi: victoriousAbi,
        }

        if (isWeb3Enabled) {
            
            const response = await Moralis.executeFunction(options)

            for (let i = 1; i <= response; i++) {
                await getLeagues(i)
            }
      
        }

    }


    const getLeagues = async (sportId) => {
        try {
          
            const options = {
                contractAddress: victoriousAddress,
                functionName: 'getLeagues',
                abi: victoriousAbi,
                params: {
                    sportId: sportId
                },
            }


            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)

                const leagueObj = {
                    SportId: sportId,
                    Leagues: response
                }
                

                leagueObj.Leagues.forEach(async (league) => {
                    await getGameIds(league, leagueObj.SportId)
                })

            }
        
        } 
        catch (error) {
            console.log(error)
        }
    }


    return (
        <VictoriousContext.Provider
        value = {{
            //isAuthenticated,
            connected,
            //user,
            accounts,
            //bets,
            globalBets,
            chainId,
            placeBet,
            payOut,
            participants,
            getBetParticipants,
            setEtherscanLink,
            etherscanLink,
            networkName,
            //setShowEtherscanLink,
            //showEtherscanLink,
            resolvedGame,
            userBetDetail,
            getResolvedGame,
            getUserBets,
            getUserBetDetails,
            userBets,
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