import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import moment from 'moment';

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import runApp from '../../assets/js/app';
import PieChart from '../../components/ChartJS/PieChart'
import Card from "../../components/ChartJS/Card";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { sessionExpiredMessage } from '../../helpers/userMessages';
import PolarArea from "../../components/ChartJS/PolarArea";
import DoughnutChart from "../../components/ChartJS/DoughnutChart";
import SalesCard from "../../components/ChartJS/SalesCard";
import PurchaseCard from "../../components/ChartJS/PurchaseCard";
import LineChart from "../../components/ChartJS/LineChart";
import CardOrder from "../../components/ChartJS/CardOrder";
import CardSalesDay from "../../components/ChartJS/SalesDayCard";
import PieChartClient from "../../components/ChartJS/PieChartCliente";
import AlertWarning from "../../components/AlertWarning";

const ContentDashboard = () => {

  return (
    <div>
      <div className='row'>
        <SalesCard />
        <PurchaseCard />
        <CardOrder />
        <CardSalesDay />
      </div>
     <div className="row">
      <div className="col-8">
        <Card 
          titulo='Ventas a la semana - Detalladas'
          component={<LineChart />}
        />
      </div>
      <div className='col-4'>
        <Card 
          titulo='Productos mas vendidos'
          component={<DoughnutChart />}
        />
      </div>
    </div>
    <div className = 'row'>
    <div className = 'col-4 py-5'>
        <Card 
          titulo='Roles del sistema'
          component={<PieChart />}
        />
      </div>
      <div className = 'col-4 py-5'>
        <Card 
          titulo='Ventas por tipo de pago'
          component={<PolarArea />}
        />
      </div>
      <div className='col-4 py-5'>
        <Card 
          titulo='Clientes que mas nos compran'
          component={<PieChartClient />}
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
  const [isPasswordExpired, setIsPasswordExpired] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      runApp();
    }, 2000);
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

    axios.get('/pass-dat-exp', token())
    .then(res => {
      const {DAT_EXP} = res.data[0]
      const USER_PASS_EXP = moment(DAT_EXP).format('YYYY-MM-DD h:mm:ss a');
      const DAT_NOW = moment().format('YYYY-MM-DD h:mm:ss a');

      if(moment(USER_PASS_EXP).diff(DAT_NOW, 'hours') < 120){
        setIsPasswordExpired(true)
      }else{
        setIsPasswordExpired(false)
      }
    });
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
            {
              isPasswordExpired
              ?
              <AlertWarning message={'Su contraseña de inicio de sesión expirará pronto. Favor cambiarla lo antes posible.'}/>
              :
              null
            }
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
