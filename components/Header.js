import React from 'react'
import Image from 'next/image'
import { ConnectButton } from 'web3uikit'

const styles = {
    header: `bg-[#17171A] text-white h-20 flex gap-[100px] w-full p-[30px]`,
    headerWrapper: `flex justify-center h-full max-w-screen-xL mx-auto px-4`,
    nav: `flex justify-center item-center gap-[20px]`,
    navItem: `relative mr-1 cursor-pointer hover:opacity-60`,
    badge: `rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 right-0 top-1 ring-4`,
    inputContainer: `flex items-center justify-center p-2 rounded bg-[#171924]`,
    input: `bg-transparent outline-none text-white w-70 mL-3`

}

const Header = () => {
  return (
    <div className={styles.header}>
        { /* <Image src='' alt='logo' width={220} height={220} /> */ }
        VICTORIOUS

        <div className={styles.headerWrapper}>
            <nav className={styles.nav}>


                <div className={styles.navItem}>
                    <div className={styles.navLink}>
                        Sports
                    </div>
                    <div className={styles.badge} />

                    
                </div>

                <div className={styles.navItem}>
                    <div className={styles.navLink}>
                        My Bets
                    </div>
                    <div className={styles.badge} />

                    
                </div>
            </nav>

            <div className='flex items-center'>

                <ConnectButton />

                <div className={styles.inputContainer}>

                    <input className={styles.input} placeholder='Search' />

                </div>

            </div>


        </div>
        
    </div>
  )
}

export default Header