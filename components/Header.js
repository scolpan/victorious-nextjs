import React, {useContext} from 'react'
import Image from 'next/image'
import { ConnectButton } from 'web3uikit'
import { VictoriousContext } from '../context/VictoriousContext'
import Search from '../assets/svg/search'
import { useRouter } from 'next/router'



const styles = {

    header: `bg-[#17171A] text-white h-20 flex gap-[10px] w-full p-[30px]`,
    headerWrapper: `flex justify-center h-full max-w-screen-xl mx-auto px-4`,
    nav: `flex justify-center item-center gap-[20px]`,
    navItem: `relative mr-1 cursor-pointer hover:opacity-60`,
    navLink: `text-white flex mx-[20px]`,
    badge: `rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 right-0 top-1 ring-4`,
    inputContainer: `flex items-center justify-center p-2 rounded`,
    input: `bg-transparent outline-none text-white w-70 ml-3`,
    network_main: `ml-2 font-medium text-xs leading-5 rounded-full text-neutral-50 bg-red-600 px-2 py-0.5 dark:text-neutral-50`,
    network_test: `ml-2 font-medium text-xs leading-5 rounded-full text-neutral-50 bg-green-600 px-2 py-0.5 dark:text-neutral-50`

}




const Header = () => {

    const router = useRouter()

    const {
        networkName,
        connected

    } = useContext(VictoriousContext) 

    const myBets = () => {
        router.push(
          //`/currencies/price?symbol=${coinSymbol}&coin=${coinName}&price=${price}`,
            `/user`,
        )
    }

    const home = () => {
        router.push(
            `/`,
        )
    }
    
  return (
    <div className={styles.header}>
        { /* <Image src='' alt='logo' width={220} height={220} /> */ }
        <div className='flex items-center'>
        <label className='text-3xl'>victorious</label>
        <label className='text-1xl ml-1'>[beta]</label>
        </div>

        <div className={styles.headerWrapper}>
            <nav className={styles.nav}>


                <div className={styles.navItem}>
                    <div className={styles.navLink} onClick={home}>
                        Home
                    </div>
                    { /* <div className={styles.badge} /> */ }

                </div>

                <div className={styles.navItem}>
                    <div className={styles.navLink} onClick={myBets}>
                        My Games
                    </div>
                    { /* <div className={styles.badge} /> */ }

                    
                </div>

                <div className={styles.navItem}>
                    <div className={styles.navLink}>
                        Roadmap

                        
                    </div>
                    { /* <div className={styles.badge} /> */ }
                </div>

                <div className={styles.navItem}>
                    <div className={styles.navLink}>
                        Rewards

                        
                    </div>
                    { /* <div className={styles.badge} /> */ }
                </div>

            </nav>

            <div className='flex items-center'>

                <ConnectButton />
                
                {/* <div className={styles.inputContainer}> */}
                    { /* <Search /> 
                    <input className={styles.input} placeholder = 'Search' />
                    */
                    }     
                {/* </div> */}

            </div>

            <div className='flex items-center'>


                <div className={styles.inputContainer}>
                    
                    { connected ? 
                    <span className={networkName.includes("Mainnet") ? styles.network_main : styles.network_test}>
                    { 
                        networkName
                    }
                    </span> : ''
                    }
     
                </div>

            </div>


        </div>
        
    </div>
  )
}

export default Header