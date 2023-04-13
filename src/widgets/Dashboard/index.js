import { useContext, useEffect, useState } from "react";
import PrevCoursesInfo from "../PrevCourseInfo";
import StudentInfo from "../StudentInfo";
import styles from "./styles.module.css";
import supabase from "@/database";
import CurrCoursesInfo from "../CurrCourseInfo";
import PrevProjectInfo from "../PrevProjectInfo";
import UserContext from "@/context";
import GradeGraph from "../GradeGraph";

export default function Dashboard({ studentInfo }) {
  const {studentID} = useContext(UserContext)
  const [prevCoursesInfo, setPrevCoursesInfo] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [currentCG, setCurrentCG] = useState('--');

  const calculateCgpa = (prevCourses)=>{
    let scores = [0,0,0,0]
    let credits = [0,0,0,0]
    prevCourses.forEach(course=>{
      scores[course.year-1]+=course.grade*course.course.credits
      credits[course.year-1]+=course.course.credits
    })
    let result = []
    let cScore = 0;
    let cCredits = 0;
    for(let i = 0; i<4;i++){
      if(credits[i]!==0) {
        cScore+=scores[i]
        cCredits+=credits[i]
        result.push({
          name: `Year ${i+1}`, 
          'CGPA': Math.round(cScore/cCredits * 100) / 100})
      }
      else {
        result.push({name: `Year ${i+1}`})
        setCurrentCG(result[i-1]['CGPA'])
      }
    }
    return result
  }

  const fetchPrevCourses = async () => {
    let { data, error } = await supabase
      .from("prevCourse")
      .select("courseID, grade, attendance, year, course(name, credits)")
      .eq("studentID", studentID);
    if (data) setPrevCoursesInfo(data);
    setGradeList(calculateCgpa(data))
  };

  const [currCoursesInfo, setCurrCoursesInfo] = useState([]);
  const fetchCurrCourses = async () => {
    let { data, error } = await supabase
      .from("currCourse")
      .select("courseID, course(name,slot,credits)")
      .eq("studentID", studentID);
    if (data) setCurrCoursesInfo(data);
  };

  const [prevProjectsInfo, setPrevProjectsInfo] = useState([]);
  const fetchPrevProjects = async () => {
    let { data, error } = await supabase
      .from("prevProject")
      .select("grade, startedOn, finishedOn, project(name, professor(name))")
      .eq("studentID", studentID);
    if (data) setPrevProjectsInfo(data);
  };

  useEffect(() => {
    fetchPrevCourses();
    fetchCurrCourses();
    fetchPrevProjects();
  }, [studentID]);

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <GradeGraph data={gradeList} currentCG={currentCG}/>
        <div className={styles.label}>PAST COURSES</div>
        <PrevCoursesInfo prevCoursesInfo={prevCoursesInfo} />
      </div>
      <div className={styles.inner}>
        <StudentInfo studentInfo={studentInfo} />
        <div className={styles.label}>CURRENT COURSES</div>

        <CurrCoursesInfo currCoursesInfo={currCoursesInfo} />
        <div className={styles.label}>PROJECTS</div>
        <PrevProjectInfo prevProjectsInfo={prevProjectsInfo} />
      </div>
    </div>
  );
}
