import Image from "next/image";
import styles from "./styles.module.css";
import avatar from "../../assets/avatar.png";

export default function ProfessorsInfo({ professorsInfo }) {
  return (
    <div className={styles.outer}>
      {professorsInfo.map((professor) => (
        <div className={styles.inner}>
          <Image alt="" src={avatar} />
          <div className={styles.text}>
            <b className={styles.heading}>{professor.name}</b>
            <b className={styles.subHeading}>
              {professor.post}, Department of {professor.department?.name}
            </b>
            <div className={styles.subHeading}>{professor.email}</div>
            <div className={styles.normalText}>
              <span className={styles.light}>DOMAINS: </span>
              {professor.domain?.map((domain, index) => (
                <span key={domain.domainID} className={styles.highlight}>{`${
                  domain.name
                }${index === professor.domain?.length - 1 ? "" : ", "}`}</span>
              ))}
            </div>
            <div className={styles.normalText}>
              <span className={styles.light}>COURSES: </span>
              {professor.course?.map((course, index) => (
                <span key={course.courseID} className={styles.highlight}>{`${
                  course.name
                }${index === professor.course?.length - 1 ? "" : ", "}`}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
