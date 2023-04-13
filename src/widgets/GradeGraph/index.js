import styles from "./styles.module.css";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function GradeGraph({data, currentCG}) {
  return (
    <div className={styles.outer}>
      <div className={styles.label}>
        <span className={styles.lightText}>CURRENT CGPA:</span> {currentCG}
      </div>
      <LineChart
        width={580}
        height={300}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width={25} ticks={[6,7,8,9,10]} type="number" domain={[5.5, 10.5]} />
        <Tooltip />
        <Line type="monotone" dataKey="CGPA" stroke="#A51C30" />
      </LineChart>
    </div>
  );
}
