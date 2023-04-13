import UserContext from '@/context'
import '@/styles/globals.css'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [studentID, setStudentID] = useState('20BO23')
  const changeStudentID = (newStudentID)=>{setStudentID(newStudentID)}
  return <UserContext.Provider value={{studentID, changeStudentID}}><Component {...pageProps} /></UserContext.Provider>
}
