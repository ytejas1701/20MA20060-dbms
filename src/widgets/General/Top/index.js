import { useContext } from 'react'
import styles from './styles.module.css'
import UserContext from '@/context'

export default function Top () {
    const studentIDs = ["20BO23", "21CY11", "21PH10", "22MA01"]
    const {studentID, changeStudentID} = useContext(UserContext)
    return (
        <div className={styles.outer}>
            <div className={styles.logo}>
                iota
            </div>
            <div className={styles.meta}>
                20MA20060
                <br/>
                DBMS Project
            </div>
            <div className={styles.form}>
                {studentIDs.map(id=>(
                    <button onClick={()=>changeStudentID(id)} className={id===studentID?styles.selected:''}>{id}</button>
                ))}
            </div>
        </div>
    )
}