import type { NextPage } from 'next'
import Header from '../components/Header'
import Games from '../components/Games'

const Home: NextPage = () => {
  return (
    <div className='min-h-screen'>

      <Header />
      <div className='mt-10'/>

      <Games />
      <div className='mt-20'/>


    </div>
  )
}

export default Home
