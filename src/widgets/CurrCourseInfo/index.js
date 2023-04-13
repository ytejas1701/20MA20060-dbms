import styles from "./styles.module.css";

export default function CurrCoursesInfo({ currCoursesInfo }) {
  return (
    <div className={styles.outer}>
      <div id={styles.top} className={styles.inner}>
        <div id={styles.courseID} className={styles.section}>
          CODE
        </div>
        <div id={styles.name} className={styles.section}>
          NAME
        </div>
        <div id={styles.slot} className={styles.section}>
          SLOT
        </div>
        <div id={styles.slot} className={styles.section}>
          CREDITS
        </div>

      </div>
      {currCoursesInfo.map((course) => (
        <div key={course.courseID} className={styles.inner}>
        <div id={styles.courseID} className={styles.section}>
          {course.courseID}
        </div>
        <div id={styles.name} className={styles.section}>
          {course.course.name}
        </div>
        <div id={styles.slot} className={styles.section}>
          {course.course.slot}
        </div>
        <div id={styles.slot} className={styles.section}>
          {course.course.credits}
        </div>
        </div>
      ))}
    </div>
  );
}
