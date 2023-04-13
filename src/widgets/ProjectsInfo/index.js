import supabase from "@/database";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context";

export default function ProjectsInfo({ projectsInfo }) {
  const { studentID } = useContext(UserContext);
  const [prevCourses, setPrevCourses] = useState([]);
  const fetchPrevCourses = async () => {
    let { data, error } = await supabase
      .from("prevCourse")
      .select("courseID, grade, course(credits)")
      .eq("studentID", studentID);
    let prevCourseList = [];
    if (data) data.forEach(({ courseID }) => prevCourseList.push(courseID));
    setPrevCourses(prevCourseList);
    setCurrentCG(calculateCgpa(data));
  };

  const [prevProjects, setPrevProjects] = useState([]);
  const fetchPrevProjects = async () => {
    let { data, error } = await supabase
      .from("prevProject")
      .select("projectID")
      .eq("studentID", studentID);
    let prevProjectList = [];
    if (data) data.forEach(({ projectID }) => prevProjectList.push(projectID));
    setPrevProjects(prevProjectList);
  };

  const [currProjects, setCurrProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const fetchCurrProjects = async () => {
    let { data, error } = await supabase
      .from("currProject")
      .select("proejectID")
      .eq("studentID", studentID);
    let currProjectsList = [];
    let numberOfProjects = 0;
    if (data)
      data.forEach(({ projectID }) => {
        currProjectsList.push(projectID);
        numberOfProjects++;
      });
    setCurrProjects(currProjectsList);
    setTotalProjects(numberOfProjects);
  };

  const [currentCG, setCurrentCG] = useState(10);

  const calculateCgpa = (prevCourses) => {
    let score = 0;
    let credits = 0;
    prevCourses.forEach((course) => {
      score += course.grade * course.course.credits;
      credits += course.course.credits;
    });
    return Math.round((score / credits) * 100) / 100;
  };

  useEffect(() => {
    fetchPrevCourses();
    fetchPrevProjects();
    fetchCurrProjects();
  }, [studentID]);

  const checkStatusOfProject = (projectID, requCourse, cutoff) => {
    if (currProjects.includes(projectID)) return "ONGOING";
    if (prevProjects.includes(projectID)) return "FINSIHED";
    if (totalProjects >= 2) return "LIMIT OVER";
    if (currentCG < cutoff) return "LOW CGPA";
    if (
      requCourse?.length !== 0 &&
      !prevCourses.includes(requCourse[0].requCourseID)
    )
      return "REQUISITE";
    if (cutoff) return "APPLY";
  };

  const applyForProject = async (projectID) => {
    const { error } = await supabase
      .from("currProject")
      .insert({ projectID, studentID });
  };

  return (
    <div className={styles.outer}>
      <div id={styles.top} className={styles.inner}>
        <div id={styles.name} className={styles.section}>
          NAME
        </div>
        <div id={styles.cutoff} className={styles.section}>
          CUTOFF
        </div>
        <div id={styles.requCourse} className={styles.section}>
          PRERQUISITE
        </div>
        <div id={styles.domain} className={styles.section}>
          DOMAIN
        </div>
        <div id={styles.professor} className={styles.section}>
          FACULTY
        </div>
        <div id={styles.apply} className={styles.section}>
          STATUS
        </div>
      </div>
      {projectsInfo.map((project) => {
        let status = checkStatusOfProject(
          project.proejectID,
          project.requProject,
          project.cutoff
        );
        return (
          <div key={project.projectID} className={styles.inner}>
            <div id={styles.name} className={styles.section}>
              {project.name}
            </div>
            <div id={styles.cutoff} className={styles.section}>
              {project.cutoff}
            </div>
            <div id={styles.requCourse} className={styles.section}>
              {project.requProject?.length === 0 ? (
                <span>--</span>
              ) : (
                project.requProject?.map((rp) => (
                  <>
                    <span>{rp.requCourseID}</span>
                  </>
                ))
              )}
            </div>
            <div id={styles.domain} className={styles.section}>
              {project.domain?.length === 0 ? (
                <span>--</span>
              ) : (
                project.domain?.name
              )}
            </div>
            <div id={styles.professor} className={styles.section}>
              {project.professor?.name}
            </div>
            <div
              id={styles.apply}
              onClick={async () => {
                if (status === "APPLY") {
                  await applyForProject(project.projectID);
                  location.reload();
                }
              }}
              className={`${styles.section} ${styles.button} ${
                status !== "APPLY" ? styles.disabled : ""
              }`}
            >
              {status}
            </div>
          </div>
        );
      })}
    </div>
  );
}
