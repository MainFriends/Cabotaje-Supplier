import { useEffect, useState } from "react";
import axios from '../config/axios';
import token from '../helpers/getToken';
import { Link } from "react-router-dom";

const SidebarHeader = () => {
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        axios.get('/company-information', token())
        .then(res => setCompanyName(res.data[0].COMPANY_NAM))
    }, [])

    return (
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
            <div className="sidebar-brand-icon">
                <div className="logo-header"></div>
            </div>
            <div className="sidebar-brand-text mx-0">{companyName}</div>
        </Link>
    )
}

export default SidebarHeader;