import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from '../config/axios';
import token from '../helpers/getToken';

const SidebarItems = () => {

    const {pathname} = useLocation();
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState([]);

    const handleActive = isActive => {
        return "nav-link" + (isActive && " active");
    }

    useEffect(() => {
        axios.get('/user-profile', token())
            .then(res => {
                setRole(res.data[0].COD_ROLE)
            })
    }, [])

    useEffect(() => {
        axios.get('/user-permissions', token())
        .then(res => setPermissions(res.data))
    }, [])

    const viewFacturar = () => {
        return permissions.some(row => row.COD_MODULE === 2 && row.COD_TABLE === 2);
    }

    const viewDashboard = () => {
        return permissions.some(row => row.COD_MODULE === 1 && row.COD_TABLE === 1);
    }

    const viewVentas = () => {
        return {
            modulo: permissions.some(row => row.COD_MODULE === 3),
            ventas: permissions.some(row => row.COD_TABLE === 3)
        }
    }

    const viewCompras = () => {
        return {
            modulo: permissions.some(row => row.COD_MODULE === 4),
            compras: permissions.some(row => row.COD_TABLE === 4),
            pedidos: permissions.some(row => row.COD_TABLE === 5)
        }
    }

    const viewClientes = () => {
        return {
            modulo: permissions.some(row => row.COD_MODULE === 5),
            clientes: permissions.some(row => row.COD_TABLE === 6),
            proveedores: permissions.some(row => row.COD_TABLE === 7)
        }
    }

    const viewProduccion = () => {
        return {
            modulo: permissions.some(row => row.COD_MODULE === 6),
            inventario: permissions.some(row => row.COD_TABLE === 8),
            categorias: permissions.some(row => row.COD_TABLE === 9),
            movimientos: permissions.some(row => row.COD_TABLE === 10),
            devoluciones: permissions.some(row => row.COD_TABLE === 11),
            mermas: permissions.some(row => row.COD_TABLE === 12),
            impuestos:permissions.some(row => row.COD_TABLE === 24),
            typentries: permissions.some(row => row.COD_TABLE === 22),
            typeOut: permissions.some(row => row.COD_TABLE === 23)
        }
    }

    const viewContabilidad = () => {
        return {
            modulo: permissions.some(row => row.COD_MODULE === 7),
            cuentasCobrar: permissions.some(row => row.COD_TABLE === 13),
            cuentasPagar: permissions.some(row => row.COD_TABLE === 14),
            devoluciones: permissions.some(row => row.COD_TABLE === 15),
            rebajas: permissions.some(row => row.COD_TABLE === 16),
            planilla: permissions.some(row => row.COD_TABLE === 17)
        }
    }

    const viewSeguridad = () => {
        return {
            modulo: permissions.some(row => row.COD_MODULE === 8),
            usuarios: permissions.some(row => row.COD_TABLE === 18),
            rolesPermisos: permissions.some(row => row.COD_TABLE === 19),
            bitacora: permissions.some(row => row.COD_TABLE === 20)
        }
    }

    const viewGraficas = () => {
        return permissions.some(row => row.COD_MODULE === 9 && row.COD_TABLE === 24);
    }

    return (
        
        <>
            <li className={ "nav-item " + (pathname === '/dashboard/welcome' ? "active" : "")}>
                <NavLink className={handleActive} to="welcome">
                <i className="mr-2 fa-solid fa-at"></i>
                <span>Inicio</span>
                </NavLink>
            </li>
        {
            viewDashboard() 
            ?
            <li className={ "nav-item " + (pathname === '/dashboard' ? "active" : "")}>
                <NavLink className={handleActive} to="/dashboard">
                <i className="mr-2 fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
                </NavLink>
            </li>
            :
            null
        }

        {
            viewFacturar()
            ?
            <li className={ "nav-item " + (pathname === '/dashboard/facturar' ? "active" : "")}>
            <NavLink className='nav-link' to="/dashboard/facturar">
                <i className="mr-2 fa-solid fa-cash-register"></i>
                <span>Facturar</span>
            </NavLink>
            </li>
            :
            null
        }

            <hr className="sidebar-divider"></hr>

            <div className="sidebar-heading">
                Módulos
            </div>

            {
                viewVentas().modulo
                ?
                <li className={ "nav-item " + (pathname === '/dashboard/ventas' ? "active" : "")}>
                    <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseVenta"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="mr-2 fa-solid fa-chart-line"></i>
                        <span>Ventas</span>
                    </a>
                    <div className="collapse" id="collapseVenta"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tablas</h6>
                            {
                                viewVentas().ventas
                                ?
                                <NavLink className="collapse-item" to="ventas">Facturas de ventas</NavLink>
                                :
                                null
                            }
                        </div>
                    </div>
                </li>
                :
                null
            }

            {/* {
                viewCompras().modulo
                ?
                <li className={ "nav-item " + (pathname === '/dashboard/compras' || pathname === '/dashboard/pedidos' ? "active" : "")}>
                    <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseCompra"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="mr-2 fa-solid fa-hand-holding-dollar"></i>
                        <span>Compras</span>
                    </a>
                    <div className="collapse" id="collapseCompra"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tablas</h6>
                            {
                                viewCompras().compras ? <NavLink className="collapse-item" to="compras">Facturas de compras</NavLink> : null
                            }
                            {
                                viewCompras().pedidos ? <NavLink className="collapse-item" to="pedidos">Pedidos</NavLink> : null
                            }
                        </div>
                    </div>
                </li>
                :
                null
            } */}

            {
                viewClientes().modulo
                ?
                <li className={ "nav-item " + (pathname === '/dashboard/clientes' || pathname === '/dashboard/proveedores' ? "active" : "")}>
                    <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapsePersona"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="mr-2 fas fa-users"></i>
                        <span>Personas</span>
                    </a>
                    <div className="collapse" id="collapsePersona"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tablas</h6>
                            {
                                viewClientes().clientes ? <NavLink className="collapse-item" to="clientes">Clientes</NavLink> : null
                            }
                            {
                                viewClientes().proveedores ? <NavLink className="collapse-item" to="proveedores">Proveedores</NavLink> : null
                            }
                            
                        </div>
                    </div>
                </li>
                :
                null
            }

            {
                viewProduccion().modulo
                ?
                <li className={ "nav-item " + 
                        (pathname === '/dashboard/inventario' ||
                        pathname === '/dashboard/impuestos' ||
                        pathname === '/dashboard/movimientos-inventario' || 
                        pathname === '/dashboard/entradas' || 
                        pathname === '/dashboard/tipo-entradas' || 
                        pathname === '/dashboard/tipo-salidas' || 
                        pathname === '/dashboard/categorias-inventario' || 
                        pathname === '/dashboard/salidas' ? "active" : "")}>
                    <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseProduccion"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="mr-2 fas fa-boxes"></i>
                        <span>Producción</span>
                    </a>
                    <div className="collapse" id="collapseProduccion" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tablas</h6>
                            {
                                viewProduccion().categorias ? <NavLink className="collapse-item" to="categorias-inventario">Categorías</NavLink> : null
                            }
                            {
                                viewProduccion().inventario ? <NavLink className="collapse-item" to="inventario">Inventario</NavLink> : null
                            }
                            
                            <NavLink className="collapse-item" to="impuestos">Impuestos</NavLink>
                            
                            
                            <NavLink className="collapse-item" to="tipo-entradas">Tipos de entradas</NavLink>
                               
                            {
                                viewProduccion().devoluciones ? <NavLink className="collapse-item" to="entradas">Entradas</NavLink> : null
                            }
                            
                            <NavLink className="collapse-item" to="tipo-salidas">Tipos de salidas</NavLink>
                            
                            {
                                viewProduccion().mermas ? <NavLink className="collapse-item" to="salidas">Salidas</NavLink> : null
                            }
                            {
                                viewProduccion().movimientos ? <NavLink className="collapse-item" to="movimientos-inventario">Movimientos</NavLink> : null
                            }
                        </div>
                    </div>
                </li>
                :
                null
            }

            {
                viewContabilidad().modulo
                ?
                <li className={ "nav-item " + 
                        (pathname === '/dashboard/cuentas-cobrar' || 
                        pathname === '/dashboard/cuentas-pagar' || 
                        pathname === '/dashboard/devoluciones' || 
                        pathname === '/dashboard/rebajas' ||
                        pathname === '/dashboard/planilla-pago' ? "active" : "")}>
                    <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseContabilidad"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="mr-2 fas fa-coins"></i>
                        <span>Gestión contable</span>
                    </a>
                    <div className="collapse" id="collapseContabilidad"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tablas</h6>
                            {
                                viewContabilidad().cuentasCobrar ? <NavLink className="collapse-item" to="cuentas-cobrar">Cuentas por cobrar</NavLink> : null
                            
                            }
                            {/* {
                                viewContabilidad().cuentasPagar ? <NavLink className="collapse-item" to="cuentas-pagar">Cuentas por pagar</NavLink> : null
                            } */}
                            {
                                viewContabilidad().devoluciones ? <NavLink className="collapse-item" to="devoluciones">Devoluciones</NavLink> : null
                            }
                            {/* {
                                viewContabilidad().rebajas ? <NavLink className="collapse-item" to="rebajas">Rebajas</NavLink> : null
                            } */}
                            {
                                viewContabilidad().planilla ? <NavLink className="collapse-item" to="planilla-pago">Planilla de pago</NavLink> : null
                            }
                        </div>
                    </div>
                </li>
                :
                null
            }

            {
                viewSeguridad().modulo
                ?
                    <li className={ "nav-item " + 
                            (pathname === '/dashboard/roles-permisos' ||
                            pathname === '/dashboard/usuarios' ? "active" : "" ||
                            pathname === '/dashboard/configuraciones-sistema' ? "active" : "" ||
                            pathname === '/dashboard/bitacora' ? "active" : "" ||
                            pathname === '/dashboard/company-information' ? "active" : "" ||
                            pathname === '/dashboard/backup' ? "active" : "" )}>
                        <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseRoles"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="mr-2 fa-solid fa-shield"></i>
                            <span>Seguridad</span>
                        </a>
                        <div className="collapse" id="collapseRoles" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Tablas</h6>
                                {
                                    viewSeguridad().usuarios ? <NavLink className="collapse-item" to="usuarios">Usuarios</NavLink> : null
                                }
                                {
                                    viewSeguridad().rolesPermisos ? <NavLink className="collapse-item" to="roles-permisos">Roles y permisos</NavLink> : null
                                }
                                {
                                    viewSeguridad().bitacora ? <NavLink className="collapse-item" to="bitacora">Bitacora de usuarios</NavLink> : null
                                }
                                {
                                    <NavLink className="collapse-item" to="configuraciones-sistema">Configuraciones</NavLink>
                                }
                                {
                                    <NavLink className="collapse-item" to="company-information">Info de la empresa</NavLink>
                                }
                                {
                                    <NavLink className="collapse-item" to="backup">Copias de seguridad</NavLink>
                                }
                            </div>
                        </div>
                    </li>
                : null
            }
            
            {
                viewGraficas()
                ?
                <>
                    <hr className="sidebar-divider"></hr>
                    <div className="sidebar-heading">
                    Utilidades
                    </div>  
                    <li className={ "nav-item " + (pathname === '/dashboard/graficas' ? "active" : "")}>
                        <NavLink className='nav-link' to="graficas">
                        <i className="mr-2 fas fa-chart-pie"></i>
                        <span>Gráficas</span></NavLink>
                    </li>
                </>
                :
                null
            }

        </>
    )
}

export default SidebarItems;