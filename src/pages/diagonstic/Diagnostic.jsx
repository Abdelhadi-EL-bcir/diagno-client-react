import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Outlet , Link } from "react-router-dom";
import Navbar from './Navbar';
import { UserProvider } from '../../contexts/UserProvider';
function Diagnostic() {
    
    
    return (
        <UserProvider>
            <div className='container-fluid mt-1'>
                <div className='row'>
                    <div className='col-md-12'>
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Link to="/diagno" className='btn btn-secondary m-1' style={{borderRadius:"24px" , width:"130px"}}>
                            Acceuil
                        </Link>
                        <br />
                        <Link to="/diagno/support" className='btn btn-secondary m-1' style={{borderRadius:"24px", width:"130px"}}>
                            Support
                        </Link>
                        <br />
                        <Link to="/diagno"className='btn btn-secondary m-1' style={{borderRadius:"24px", width:"130px"}}>
                            Notification
                        </Link>
                        <br />
                    </div>
                    <div className='col-md-9'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </UserProvider>
    )
}

export default Diagnostic;