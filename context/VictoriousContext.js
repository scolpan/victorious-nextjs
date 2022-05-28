import { createContext, useState, useEffect } from 'react'
import { useMoralis } from 'react-moralis'

export const VictoriousContext = createContext()

export const VictoriousProvider = ({children}) => {

    const [assets, setAssets] = useState([])


    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis()


    // useEffect(async () => {
    //     console.log(assetsData)
    //     await enableWeb3()
    //     await getAssets()
    //     await getOwnedAssets()
    //   }, [userData, assetsData, assetsDataIsLoading, userDataIsLoading])    


    return (
        <VictoriousContext.Provider
        value = {{
            isAuthenticated,
            assets
        }}
        >
            {children}

        </VictoriousContext.Provider>
    )


}