import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import runApp from '../../assets/js/app';
import PieChart from '../../components/ChartJS/PieChart'
import VerticalBarChart from "../../components/ChartJS/VerticalBarChart";
import Card from "../../components/ChartJS/Card";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { sessionExpiredMessage } from '../../helpers/userMessages';
import PolarArea from "../../components/ChartJS/PolarArea";
import DoughnutChart from "../../components/ChartJS/DoughnutChart";
import SalesCard from "../../components/ChartJS/SalesCard";
import LineChart from "../../components/ChartJS/LineChart";

const ContentDashboard = () => {

  return (
    <div>
      <div className='row'>
        <SalesCard />
      </div>
     <div className="row">
      <div className="col-4">
        <Card 
          titulo='Roles del sistema'
          component={<PieChart />}
        />
      </div>
      <div className="col-4">
        <Card 
          titulo='Ventas del mes'
          component={<LineChart />}
          className="vertical"
        />
      </div>
    </div>

    <div className="row">
    <div className="col-4 py-5">
        <Card 
          titulo='Grafica 3'
          component={<PolarArea />}
        />
      </div>
      <div className='col-4'>
        <Card 
          titulo='Productos mas vendidos'
          component={<DoughnutChart />}
        />
      </div>
    </div>
    </div>




  )
}

const Dashboard = () => {
  document.title = "Cabotaje Supplier - Dashboard"
  const {pathname} = useLocation();
  const [clickMenuOpen, setClickMenu] = useState(true);
  const {logout} = useUser();

  useEffect(() => {
    runApp();
  },[]);

  //comprobamos que haya un token valido cada vez que se navega.
  useEffect(() => {
    axios.get('/jwt', token())
      .catch(err => {
        const {message} = err.response.data;
        if(message === 'jwt expired'){
            logout(sessionExpiredMessage);
        }
      })
  },[pathname])

  return (
    <>
      <Sidebar clickMenuOpen={clickMenuOpen} />
      {/* <!-- Content Wrapper --> */}
      <div className="d-flex flex-column" id="content-wrapper">
        {/* <!-- Main Content --> */}
        <div id="content">
          <Navbar clickMenuOpen={clickMenuOpen} setClickMenu={setClickMenu} />

          {/* <!-- Begin Page Content --> */}
          <div className="container-fluid">
            {pathname === '/dashboard' ? <ContentDashboard /> : <Outlet />}
          </div>
          {/* <!-- /.container-fluid --> */}
        </div>
        {/* <!-- End of Main Content --> */}
        <Footer />
      </div>
      {/* <!-- End of Content Wrapper --> */}
    </>
  );
};

export default Dashboard;
