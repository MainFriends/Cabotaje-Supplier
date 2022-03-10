import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

const ContentDashboard = () => {

  return (
    <h1>Dashboard</h1>
  )
}

const Dashboard = () => {
  const {pathname} = useLocation();
  document.title = "Cabotaje Supplier - Dashboard"
  const [clickMenuOpen, setClickMenu] = useState(true);

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
