import supabase from "@/database";
import BasicLayout from "@/layouts/BasicLayout";
import ProjectsInfo from "@/widgets/ProjectsInfo";
import { useEffect, useState } from "react";

export default function Home() {
  const [projectsInfo, setProjectsInfo] = useState([]);

  const fetchProjectsInfo = async ()=>{
    let {data, error} = await supabase
      .from('project')
      .select('projectID, name, cutoff, professor(name), domain(name), requProject(requCourseID)')
    setProjectsInfo(data)
  }

  const fetchCoursesInfoFiltered = async ({domainFilter})=>{
    let domainFilterList = []
    Object.entries(domainFilter).forEach(([id, {selected}])=>{
      if(selected)
      domainFilterList.push(`domainID.eq.${id}`)
    })
    let {data, error} = await supabase
      .from('project')
      .select('projectID, name, cutoff, professor(name), domain(name), requProject(requCourseID)')
      .or(domainFilterList.join(','))

      if (data) setProjectsInfo(data);
  }

  useEffect(()=>{
    fetchProjectsInfo()
  },[])
  return (
    <BasicLayout filters={{department:false, domain:true, slot:false}} filterUpdate={fetchCoursesInfoFiltered}>
      <ProjectsInfo projectsInfo={projectsInfo} />
    </BasicLayout>
  );
}
