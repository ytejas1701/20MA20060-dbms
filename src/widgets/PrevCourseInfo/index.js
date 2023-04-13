import styles from "./styles.module.css";

export default function PrevCoursesInfo({ prevCoursesInfo }) {
  return (
    <div className={styles.outer}>
      <div id={styles.top} className={styles.inner}>
        <div id={styles.courseID} className={styles.section}>
          CODE
        </div>
        <div id={styles.name} className={styles.section}>
          NAME
        </div>
        <div id={styles.grade} className={styles.section}>
          GRADE
        </div>
        <div id={styles.credits} className={styles.section}>
          CREDITS
        </div>
        <div id={styles.attendance} className={styles.section}>
          ATTEND
        </div>
        <div id={styles.year} className={styles.section}>
          YEAR
        </div>
      </div>
      {prevCoursesInfo.map((course) => (
        <div key={course.courseID} className={styles.inner}>
        <div id={styles.courseID} className={styles.section}>
          {course.courseID}
        </div>
        <div id={styles.name} className={styles.section}>
          {course.course.name}
        </div>
        <div id={styles.grade} className={styles.section}>
          {course.grade}
        </div>
        <div id={styles.credits} className={styles.section}>
          {course.course.credits}
        </div>
        <div id={styles.attendance} className={styles.section}>
          {course.attendance}%
        </div>
        <div id={styles.year} className={styles.section}>
          {course.year}
        </div>
        </div>
      ))}
    </div>
  );
}
