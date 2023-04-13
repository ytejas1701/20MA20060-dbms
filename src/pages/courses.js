import supabase from "@/database";
import BasicLayout from "@/layouts/BasicLayout";
import CoursesInfo from "@/widgets/CoursesInfo";
import { useEffect, useState } from "react";

export default function Home() {
  const [coursesInfo, setCoursesInfo] = useState([]);

  const fetchCoursesInfo = async () => {
    const { data, error } = await supabase
      .from("course")
      .select(
        "courseID, name, credits, slot, department(name), professor(name), requCourse(requCourseID)"
      )
    if (data) setCoursesInfo(data);
  };

  const fetchCoursesInfoFiltered = async ({departmentFilter, slotFilter})=>{
    let departmentFilterList = []
    Object.entries(departmentFilter).forEach(([id, {selected}])=>{
      if(selected)
      departmentFilterList.push(`departmentID.eq.${id}`)
    })
    let slotFilterList = []
    Object.entries(slotFilter).forEach(([id, {selected}])=>{
      if(selected)
      slotFilterList.push(`slot.eq.${id}`)
    })
    let { data, error } = await supabase
      .from("course")
      .select(
        "courseID, name, credits, slot, department(name), professor(name), requCourse(requCourseID)"
      )
      .or(departmentFilterList.join(','))
      .or(slotFilterList.join(','))

    if (data) setCoursesInfo(data);
  }

  useEffect(() => {
    fetchCoursesInfo();
  }, []);
  return (
    <BasicLayout filters={{department:true, slot:true}} filterUpdate={fetchCoursesInfoFiltered}>
      <CoursesInfo coursesInfo={coursesInfo} />
    </BasicLayout>
  );
}
