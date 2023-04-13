import styles from "./styles.module.css";

export default function PrevProjectsInfo({ prevProjectsInfo }) {
  return (
    <div className={styles.outer}>
      <div id={styles.top} className={styles.inner}>
        <div id={styles.name} className={styles.section}>
          NAME
        </div>
        <div id={styles.date} className={styles.section}>
          DURATION
        </div>
        <div id={styles.professor} className={styles.section}>
          SUPERVISOR
        </div>
        <div id={styles.grade} className={styles.section}>
          GRADE
        </div>
      </div>
      {prevProjectsInfo.map((project) => (
        <div key={project.projectID} className={styles.inner}>
          <div id={styles.name} className={styles.section}>
            {project.project.name}
          </div>
          <div id={styles.date} className={styles.section}>
          {project.startedOn}
          <br/>
          {project.finishedOn}
        </div>
          <div id={styles.professor} className={styles.section}>
            {project.project.professor.name}
          </div>
          <div id={styles.grade} className={styles.section}>
            {project.grade}
          </div>
        </div>
      ))}
    </div>
  );
}
