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
import Impuestos from "./pages/Dashboard/Produccion/Impuestos";
import MovimientosInventario from "./pages/Dashboard/Produccion/MovimientosInventario";
import ProductEntries from "./pages/Dashboard/Produccion/ProductEntries";
import TypEntries from "./pages/Dashboard/Produccion/TypEntries";
import ProductOutput from "./pages/Dashboard/Produccion/ProductOutput";
import TypOut from "./pages/Dashboard/Produccion/TypOut";
import CuentasCobrar from "./pages/Dashboard/Contabilidad/CuentasCobrar";
import CuentasPagar from "./pages/Dashboard/Contabilidad/CuentasPagar";
import Devoluciones from "./pages/Dashboard/Contabilidad/Devoluciones";
import Rebajas from "./pages/Dashboard/Contabilidad/Rebajas";
import PlanillaPago from "./pages/Dashboard/Contabilidad/PlanillaPago";
import Graficas from "./pages/Dashboard/Graficas/Graphics";
import Profile from './pages/User-Profile/Profile';
import Categorias from "./pages/Dashboard/Produccion/Categorias";
import Roles from "./pages/Dashboard/Seguridad/Roles";
import Page404 from "./pages/Error-Pages/Page404";
import Bitacora from "./pages/Dashboard/Seguridad/Bitacora";
import Welcome from "./pages/Dashboard/Welcome";
import Settings from "./pages/Dashboard/Seguridad/Settings";
import CompanyInformation from "./pages/Dashboard/Seguridad/CompanyInformation";
import BackupAndRestore from "./pages/Dashboard/Seguridad/BackupAndRestore";
import SaleInvoicePDF from "./components/SaleInvoicePDF";
import SecurityQuestions from "./pages/Dashboard/Seguridad/SecurityQuestions";
import SecurityAnswer from "./pages/Dashboard/Seguridad/SecurityAnswer";


const Pages = () => {
    const [goDashboard, setGoDashboard] = useState(false);
    const [userSecurity, setUserSecurity] = useState({});
    const {isLogged} = useUser();
    const [userNew, setUserNew] = useState(false);
    const [requiredQuestion, setRequiredQuestion] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [modules, setModules] = useState({
        ventas: false,
        compras: false,
        personas: false,
        produccion: false,
        contabilidad: false
    });

    useEffect(() => {
        const token = JSON.parse(window.localStorage.getItem('userSession'));
        if(token){
            const {USER_NEW, REQUIRED_QUESTIONS} = token;
            setUserNew(USER_NEW)
            setRequiredQuestion(REQUIRED_QUESTIONS)
        }
    }, [isLogged])

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
            axios.get('/login-security', token())
            .then(res => {
                setUserSecurity(res.data[0])
            })
        }
    }, [isLogged])

    return (
    <Routes>
        <Route path="/security-answer" element={requiredQuestion ? goDashboard ? (<Navigate to='/dashboard'/>) : (<SecurityAnswer setGoDashboard={setGoDashboard}/>)  : (<Navigate to='/'/>)}/>
        <Route path="/" element={isLogged ? (<Navigate to='/dashboard/welcome'/>) : (<Login />)}/>
        <Route path="/security-questions" element={isLogged ? goDashboard ? (<Navigate to='/dashboard'/>) : (<SecurityQuestions setGoDashboard={setGoDashboard}/>) : (<Navigate to='/'/>)}/>
        <Route path="/profile" element={isLogged ? (<Profile />) : (<Navigate to='/'/>)}/>
        <Route path="/view-invoice" element={isLogged ? (<SaleInvoicePDF />) : (<Navigate to='/'/>)}/>
        <Route path="/dashboard" element={isLogged ? userNew === 'true' ? (<SecurityQuestions setGoDashboard={setGoDashboard} setUserNew={setUserNew}/>) : requiredQuestion === 'true' ? (<SecurityAnswer setGoDashboard={setGoDashboard} setRequiredQuestion={setRequiredQuestion}/>) : (<Dashboard />) : (<Navigate to='/'/>)}>
            <Route path="ventas" element={<Facturas />}/>
            <Route path="compras" element={<Compras />}/>
            <Route path="pedidos" element={<Pedidos />}/>
            <Route path="usuarios" element={<Usuarios />}/>
            <Route path="clientes" element={<Clientes />}/>
            <Route path="proveedores" element={<Proveedores />}/>
            <Route path="categorias-inventario" element={<Categorias />}/>
            <Route path="inventario" element={<Inventario />}/>
            <Route path="impuestos" element={<Impuestos />}/>
            <Route path="movimientos-inventario" element={<MovimientosInventario />}/>
            <Route path="entradas" element={<ProductEntries />}/>
            <Route path="tipo-entradas" element={<TypEntries />}/>
            <Route path="salidas" element={<ProductOutput />}/>
            <Route path="tipo-salidas" element={<TypOut />}/>
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
            <Route path="facturar" element={<Facturar />}/>
        </Route>
        <Route path="/*" element={isLogged ? (<Page404 />) : (<Navigate to='/'/>)}></Route>
    </Routes>
    )
};

export default Pages;