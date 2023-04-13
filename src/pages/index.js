import UserContext from '@/context'
import supabase from '@/database'
// export {studentID} from '@/database'
import BasicLayout from '@/layouts/BasicLayout'
import Dashboard from '@/widgets/Dashboard'
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const {studentID} = useContext(UserContext)
  const [studentInfo, setStudentInfo] = useState({})
  const fetchStudentInfo = async ()=>{
    const { data, error } = await supabase.from('student').select('studentID, name, email, phone, department(name)').eq('studentID', studentID)
      if(data) setStudentInfo(data[0])
  }
  useEffect(()=>{
    fetchStudentInfo()
  },[studentID])
  return (
      <BasicLayout filters={{department:false, domain:false,slot:false}}>
        <Dashboard studentInfo={studentInfo}/>
      </BasicLayout>
  )
}
