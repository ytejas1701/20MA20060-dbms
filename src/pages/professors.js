import supabase from "@/database";
import BasicLayout from "@/layouts/BasicLayout";
import ProfessorsInfo from "@/widgets/ProfessorsInfo";
import { useEffect, useState } from "react";

export default function Home() {
  const [professorsInfo, setProfessorsInfo] = useState([]);
  const fetchProfessorsInfo = async () => {
    const { data, error } = await supabase
      .from("professor")
      .select(
        "name, post, email, domain(domainID, name), course(courseID, name), department(name)"
      );
    if (data){
    } setProfessorsInfo(data);
  };

  const fetchCoursesInfoFiltered = async ({
    departmentFilter,
    domainFilter,
  }) => {
    let departmentFilterList = [];
    Object.entries(departmentFilter).forEach(([id, { selected }]) => {
      if (selected) departmentFilterList.push(`departmentID.eq.${id}`);
    });
    let domainFilterList = [];
    Object.entries(domainFilter).forEach(([id, { selected }]) => {
      if (selected) domainFilterList.push(`domainID.eq.${id}`);
    });
    const { data, error } = await supabase
      .from("professor")
      .select(
        "name, post, email, domain(domainID, name), course(courseID, name), department(name)"
      )
      .or(departmentFilterList.join(","))
      // .or(domainFilterList.join(","));

    if (data) setProfessorsInfo(data);
  };

  useEffect(() => {
    fetchProfessorsInfo();
  }, []);
  return (
    <BasicLayout filters={{ department: true, domain: false, slot: false }} filterUpdate={fetchCoursesInfoFiltered}>
      <ProfessorsInfo professorsInfo={professorsInfo} />
    </BasicLayout>
  );
}
