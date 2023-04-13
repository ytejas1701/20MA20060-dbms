import styles from "./styles.module.css";
import avatar from '../../assets/avatar.png'
import Image from "next/image";

export default function StudentInfo({studentInfo}) {
    let currYear = studentInfo.studentID ? 23-studentInfo.studentID.substring(0,2) : 0;
    const roman  = ['--', 'I', 'II', 'III']
    return (
    <div className={styles.outer}>
        <Image alt="" src={avatar} className={styles.image}/>
        <div className={styles.text}>
            <div className={styles.heading}>
                {studentInfo.name}
            </div>
            <div className={styles.subHeading}>
                {studentInfo.studentID}
            </div>
            <div className={styles.subHeading}>
                UG {roman[currYear]}, Department of {studentInfo.department?.name} 
            </div>
            <div className={styles.subHeading}>
                +91 {studentInfo.phone}
            </div>
            <div className={styles.subHeading}>
                {studentInfo.email}
            </div>
        </div>
      </div>
  );
}
