import supabase from "@/database";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context";

export default function CoursesInfo({ coursesInfo }) {
  const { studentID } = useContext(UserContext);

  const [prevCourses, setPrevCourses] = useState([]);
  const fetchPrevCourses = async () => {
    let { data, error } = await supabase
      .from("prevCourse")
      .select("courseID")
      .eq("studentID", studentID);
    let prevCoursesList = [];
    if (data) data.forEach(({ courseID }) => prevCoursesList.push(courseID));
    setPrevCourses(prevCoursesList);
  };

  const [currCourses, setCurrCourses] = useState([]);
  const [currSlots, setCurrSlots] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const fetchCurrCourses = async () => {
    let { data, error } = await supabase
      .from("currCourse")
      .select("courseID, course(slot, credits)")
      .eq("studentID", studentID);
    let currCoursesList = [];
    let currSlotsList = [];
    let credits = 0;
    if (data)
      data.forEach(({ courseID, course }) => {
        currCoursesList.push(courseID);
        currSlotsList.push(course.slot);
        credits += course.credits
      });
    setCurrCourses(currCoursesList);
    setCurrSlots(currSlotsList);
    setTotalCredits(credits)
  };

  const checkStatusOfCourse = (courseID, slot, requCourse, courseCredits) => {
    if (currCourses.includes(courseID)) return "ONGOING";
    if (prevCourses.includes(courseID)) return "FINSIHED";
    if (courseCredits+totalCredits>=14) return "CREDITS OVER"
    if (
      requCourse?.length !== 0 &&
      !prevCourses.includes(requCourse[0].requCourseID)
    )
      return "REQUISITE";
    if (currSlots.includes(slot)) return "SLOT CLASH";
    return "APPLY";
  };

  const applyForCourse = async (courseID) => {
    const { error } = await supabase
    .from('currCourse')
    .insert({ courseID, studentID })
  };

  useEffect(() => {
    fetchPrevCourses();
    fetchCurrCourses();
  }, [studentID]);

  return (
    <div className={styles.outer}>
      <div id={styles.top} className={styles.inner}>
        <div id={styles.courseID} className={styles.section}>
          CODE
        </div>
        <div id={styles.name} className={styles.section}>
          NAME
        </div>
        <div id={styles.department} className={styles.section}>
          DEPARTMENT
        </div>
        <div id={styles.credits} className={styles.section}>
          CREDITS
        </div>
        <div id={styles.slot} className={styles.section}>
          SLOT
        </div>
        <div id={styles.requCourse} className={styles.section}>
          PRERQUISITE
        </div>
        <div id={styles.professor} className={styles.section}>
          FACULTY
        </div>
        <div id={styles.apply} className={styles.section}>
          STATUS
        </div>
      </div>
      {coursesInfo.map((course) => {
        let status = checkStatusOfCourse(course.courseID,course.slot, course.requCourse)
        return (<div key={course.courseID} className={styles.inner}>
          <div id={styles.courseID} className={styles.section}>
            {course.courseID}
          </div>
          <div id={styles.name} className={styles.section}>
            {course.name}
          </div>
          <div id={styles.department} className={styles.section}>
            {course.department?.name.toUpperCase()}
          </div>
          <div id={styles.credits} className={styles.section}>
            {course.credits}
          </div>
          <div id={styles.slot} className={styles.section}>
            {course.slot}
          </div>
          <div id={styles.requCourse} className={styles.section}>
            {course.requCourse?.length === 0 ? (
              <span>--</span>
            ) : (
              course.requCourse?.map((rc) => (
                <>
                  <span key={rc.requCourseID}>{rc.requCourseID}</span>
                </>
              ))
            )}
          </div>
          <div id={styles.professor} className={styles.section}>
            {course.professor?.name}
          </div>
          <div
            id={styles.apply}
            onClick={async () => {if(status==="APPLY") {await applyForCourse(course.courseID); location.reload()}}}
            className={`${styles.section} ${styles.button} ${
              status !== "APPLY"
                ? styles.disabled
                : ""
            }`}
          >
            {status}
          </div>
        </div>);
      })}
    </div>
  );
}
