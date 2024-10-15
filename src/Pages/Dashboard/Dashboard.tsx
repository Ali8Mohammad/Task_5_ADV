import PaginationSide from '../../Components/PaginationSide/PaginationSide'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Dashboard.css'
const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <PaginationSide/>
    </div>
  )
}

export default Dashboard