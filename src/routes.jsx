import React from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Facturas from "./pages/Dashboard/Ventas";
import Compras from "./pages/Dashboard/Compras";
import Pedidos from "./pages/Dashboard/Compras/Pedidos";
import Usuarios from "./pages/Dashboard/Personas/Usuarios";
import Clientes from "./pages/Dashboard/Personas/Clientes";
import Proveedores from "./pages/Dashboard/Personas/Proveedores";
import Inventario from "./pages/Dashboard/Produccion/Inventario";
import MovimientosInventario from "./pages/Dashboard/Produccion/MovimientosInventario";
import DevolucionesInv from "./pages/Dashboard/Produccion/DevolucionesInv";
import Mermas from "./pages/Dashboard/Produccion/Mermas";
import CuentasCobrar from "./pages/Dashboard/Contabilidad/CuentasCobrar";
import CuentasPagar from "./pages/Dashboard/Contabilidad/CuentasPagar";
import Devoluciones from "./pages/Dashboard/Contabilidad/Devoluciones";
import Rebajas from "./pages/Dashboard/Contabilidad/Rebajas";
import PlanillaPago from "./pages/Dashboard/Contabilidad/PlanillaPago";
import Graficas from "./pages/Dashboard/Graficas";

const Pages = () => (
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="ventas" element={<Facturas />}/>
            <Route path="compras" element={<Compras />}/>
            <Route path="pedidos" element={<Pedidos />}/>
            <Route path="usuarios" element={<Usuarios />}/>
            <Route path="clientes" element={<Clientes />}/>
            <Route path="proveedores" element={<Proveedores />}/>
            <Route path="inventario" element={<Inventario />}/>
            <Route path="movimientos-inventario" element={<MovimientosInventario />}/>
            <Route path="devoluciones-inventario" element={<DevolucionesInv />}/>
            <Route path="mermas" element={<Mermas />}/>
            <Route path="cuentas-cobrar" element={<CuentasCobrar />}/>
            <Route path="cuentas-pagar" element={<CuentasPagar />}/>
            <Route path="devoluciones" element={<Devoluciones />}/>
            <Route path="rebajas" element={<Rebajas />}/>
            <Route path="planilla-pago" element={<PlanillaPago />}/>
            <Route path="graficas" element={<Graficas />}/>
        </Route>
    </Routes>
);

export default Pages;