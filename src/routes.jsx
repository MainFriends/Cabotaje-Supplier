import {useEffect, useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import axios from './config/axios';
import token from './helpers/getToken';

//Pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Facturar from "./pages/Dashboard/Facturar-Venta/Facturar";
import Facturas from "./pages/Dashboard/Ventas/Facturas";
import Compras from "./pages/Dashboard/Compras/Compras";
import Pedidos from "./pages/Dashboard/Compras/Pedidos";
import Usuarios from "./pages/Dashboard/Personas/Usuarios";
import Clientes from "./pages/Dashboard/Personas/Clientes";
import Proveedores from "./pages/Dashboard/Personas/Proveedores";
import Inventario from "./pages/Dashboard/Produccion/Inventario";
import MovimientosInventario from "./pages/Dashboard/Produccion/MovimientosInventario";
import ProductEntries from "./pages/Dashboard/Produccion/ProductEntries";
import ProductOutput from "./pages/Dashboard/Produccion/ProductOutput";
import CuentasCobrar from "./pages/Dashboard/Contabilidad/CuentasCobrar";
import CuentasPagar from "./pages/Dashboard/Contabilidad/CuentasPagar";
import Devoluciones from "./pages/Dashboard/Contabilidad/Devoluciones";
import Rebajas from "./pages/Dashboard/Contabilidad/Rebajas";
import PlanillaPago from "./pages/Dashboard/Contabilidad/PlanillaPago";
import Graficas from "./pages/Dashboard/Graficas/Graphics";
import Profile from './pages/User-Profile/Profile';
import Categorias from "./pages/Dashboard/Produccion/Categorias";
import Roles from "./pages/Dashboard/Seguridad/Roles";
import Page401 from "./pages/Error-Pages/Page401";
import Page404 from "./pages/Error-Pages/Page404";
import Bitacora from "./pages/Dashboard/Seguridad/Bitacora";
import Welcome from "./pages/Dashboard/Welcome";
import Settings from "./pages/Dashboard/Seguridad/Settings";
import CompanyInformation from "./pages/Dashboard/Seguridad/CompanyInformation";
import BackupAndRestore from "./pages/Dashboard/Seguridad/BackupAndRestore";


const Pages = () => {

    const {isLogged} = useUser();
    const [userRole, setUserRole] = useState(null);
    const [modules, setModules] = useState({
        ventas: false,
        compras: false,
        personas: false,
        produccion: false,
        contabilidad: false
    });

    const {
        facturar,
        ventas
    } = modules;

    useEffect(() => {
        if(isLogged){
            axios.get('/user-permissions', token())
                .then(res => {
                    setModules({
                        facturar: res.data.some(row => row.COD_MODULE === 2),
                        ventas: res.data.some(row => row.COD_MODULE === 3),
                        compras: res.data.some(row => row.COD_MODULE === 4),
                        personas: res.data.some(row => row.COD_MODULE === 5),
                        produccion: res.data.some(row => row.COD_MODULE === 6),
                        contabilidad: res.data.some(row => row.COD_MODULE === 7),
                        seguridad: res.data.some(row => row.COD_MODULE === 8),
                        graficas: res.data.some(row => row.COD_MODULE === 9)
                    })
                })
        }
    }, [isLogged])

    useEffect(() => {
        if(isLogged){
            axios.get('/user-profile', token())
            .then(res => setUserRole(res.data[0].COD_ROLE))
        }
    }, [isLogged])

    return (
    <Routes>
        <Route path="/" element={isLogged ? (<Navigate to='/dashboard/welcome'/>) : (<Login />)}/>
        <Route path="/profile" element={isLogged ? (<Profile />) : (<Navigate to='/'/>)}/>
        <Route path="/facturar" element={isLogged ? (facturar ? <Facturar /> : <Page401 />) : (<Navigate to='/'/>)}/>
        <Route path="/dashboard" element={isLogged ? (<Dashboard />) : (<Navigate to='/'/>)}>
            <Route path="ventas" element={<Facturas />}/>
            <Route path="compras" element={<Compras />}/>
            <Route path="pedidos" element={<Pedidos />}/>
            <Route path="usuarios" element={<Usuarios />}/>
            <Route path="clientes" element={<Clientes />}/>
            <Route path="proveedores" element={<Proveedores />}/>
            <Route path="categorias-inventario" element={<Categorias />}/>
            <Route path="inventario" element={<Inventario />}/>
            <Route path="movimientos-inventario" element={<MovimientosInventario />}/>
            <Route path="entradas" element={<ProductEntries />}/>
            <Route path="salidas" element={<ProductOutput />}/>
            <Route path="cuentas-cobrar" element={<CuentasCobrar />}/>
            <Route path="cuentas-pagar" element={<CuentasPagar />}/>
            <Route path="devoluciones" element={<Devoluciones />}/>
            <Route path="rebajas" element={<Rebajas />}/>
            <Route path="planilla-pago" element={<PlanillaPago />}/>
            <Route path="graficas" element={<Graficas />}/>
            <Route path="roles-permisos" element={<Roles />}/>
            <Route path="bitacora" element={<Bitacora />}/>
            <Route path="welcome" element={<Welcome /> }/>
            <Route path="configuraciones-sistema" element={< Settings /> }/>
            <Route path="company-information" element={<CompanyInformation />}/>
            <Route path="backup" element={< BackupAndRestore /> }/>
        </Route>
        <Route path="/*" element={isLogged ? (<Page404 />) : (<Navigate to='/'/>)}></Route>
    </Routes>
    )
};

export default Pages;