import Link from "next/link";
import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Left({filterUpdate, filters}) {
  const showFilterBox = filters.department||filters.domain||filters.slot 
  const router = useRouter();
  const paths = ["/", "/courses", "/projects", "/professors"];
  const icons = {
    unmarked: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
      </svg>
    ),
    marked: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="bi bi-slash-square-fill"
        viewBox="0 0 16 16"
      >
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.354 5.354-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708.708z" />
      </svg>
    ),
  };
  const [departmentFilter, setDepartmentFilter] = useState({
    BO: { name: "Biology", selected: true },
    CY: { name: "Chemistry", selected: true },
    MA: { name: "Mathematics", selected: true },
    PH: { name: "Physics", selected: true },
  });
  const [slotFilter, setSlotFilter] = useState({
    A: { name: "A", selected: true },
    B: { name: "B", selected: true },
    C: { name: "C", selected: true },
    D: { name: "D", selected: true },
  });
  const [domainFilter, setDomainFilter] = useState({
    PH1knm: { name: "Kinematics", selected: true },
    PH2emg: { name: "Electromagnetism", selected: true },
    PH3ncp: { name: "Nuclear Physics", selected: true },
    BO1psl: { name: "Physiology", selected: true },
    BO2psy: { name: "Psychiatry", selected: true },
    BO3oph: { name: "Ophthalmology", selected: true },
    MA1cnc: { name: "Conic Sections", selected: true },
    MA2tpl: { name: "Topology", selected: true },
    MA3ral: { name: "Real Analysis", selected: true },
    CY1stc: { name: "Stoichiometry", selected: true },
    CY2och: { name: "Organic Chemistry", selected: true },
    CY3thm: { name: "Thermodynamics", selected: true },
  });
  return (
    <div className={styles.outer}>
      <Link
        href={paths[0]}
        className={`${router.pathname === paths[0] ? styles.selected : ""} ${
          styles.section
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
        </svg>{" "}
        DASHBOARD
      </Link>
      <Link
        href={paths[1]}
        className={`${router.pathname === paths[1] ? styles.selected : ""} ${
          styles.section
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
          <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0z" />
        </svg>{" "}
        COURSES
      </Link>
      <Link
        href={paths[2]}
        className={`${router.pathname === paths[2] ? styles.selected : ""} ${
          styles.section
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>{" "}
        PROJECTS
      </Link>
      <Link
        href={paths[3]}
        className={`${router.pathname === paths[3] ? styles.selected : ""} ${
          styles.section
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>{" "}
        PROFESSORS
      </Link>
      {showFilterBox&&<div className={styles.filterBox}>
        {filters?.department&&<>
        <div className={styles.label}>DEPARTMENT</div>
        {Object.entries(departmentFilter).map(([id, { name, selected }]) => (
          <div
            onClick={() => {
              setDepartmentFilter((prev) => ({
                ...prev,
                [id]: { name, selected: !prev[id].selected },
              }));
            }}
            className={styles.option}
          >
            {selected ? icons.marked : icons.unmarked}
            {name}
          </div>
        ))}
        </>}
        {filters?.domain&&<>
        <div className={styles.label}>DOMAIN</div>
        {Object.entries(domainFilter).map(([id,{ name, selected }]) => (
          <div
            onClick={() => {
              setDomainFilter((prev) => ({
                ...prev,
                [id]: { name, selected: !prev[id].selected },
              }));
            }}
            className={styles.option}
          >
            {selected ? icons.marked : icons.unmarked}
            {name}
          </div>
        ))}
        </>}
        {filters?.slot&&<>
        <div className={styles.label}>SLOT</div>
        {Object.entries(slotFilter).map(([id,{ name, selected }]) => (
          <div
            onClick={() => {
              setSlotFilter((prev) => ({
                ...prev,
                [id]: { name, selected: !prev[id].selected },
              }));
            }}
            className={styles.option}
          >
            {selected ? icons.marked : icons.unmarked}
            {name}
          </div>
        ))}
        </>}
      </div>}
      {showFilterBox&&<div onClick={async ()=>await filterUpdate({departmentFilter,slotFilter,domainFilter})} className={styles.button}>SEARCH</div>}
    </div>
  );
}
