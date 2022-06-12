import { VictoriousContext } from '../context/VictoriousContext'
import React, { useContext, useEffect } from 'react'
// import {
//     ModalProvider,
//     Modal,
//     useModal,
//     ModalTransition,
// } from 'react-simple-hook-modal'
// import 'react-simple-hook-modal/dist/styles.css'
import Modal from 'react-modal'
import BetModal from './BetModal'
import { generateKey } from 'crypto'

import Popup from 'reactjs-popup'
//import './Modal.module.css'


const styles = {
    bettingCardRow: `flex items-center justify-between mb-4 text-[0.93rem]`,

}



const BettingCardRow = ({globalBetId, sportIcon, homeTeam, awayTeam, startTime}) => {
  
    const { placeBet } = useContext(VictoriousContext)
    // const { openModal, isModalOpen, closeModal } = useModal()
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
      }
    
    //   function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    //   }
    
      function closeModal() {
        setIsOpen(false);
      }


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
            <Popup trigger={<button className="rounded px-5 ml-auto ont-bold bg-blue-500" 
            >Bet!</button>} modal>
            {close => (
              <BetModal 
                homeTeam={homeTeam} 
                awayTeam={awayTeam} 
                globalBetId={globalBetId} 
                close={close} 
                placeBet={placeBet} 
              />  
            )}          
            </Popup>
            {/* <Modal
            isOpen={modalIsOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <BetModal 
                    homeTeam={homeTeam} 
                    awayTeam={awayTeam} 
                    globalBetId={globalBetId} 
                    close={closeModal} 
                    placeBet={placeBet} 
                />
            </Modal> */}

        </div>


    </div>

  )
}

export default BettingCardRow