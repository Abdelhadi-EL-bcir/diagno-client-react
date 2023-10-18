import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
function Navbar() {
    const [user , setUser] = useState({});
    const [isAuth , setIsAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        let userString = localStorage.getItem('user');
        if(userString === null){
            setIsAuth(false);
        }else{
            setIsAuth(true);
            setUser(JSON.parse(userString));
        }
    },[]);

    const leaveTest = () => {
        navigate('/diagno');
    }

    if(isAuth)
    return (
        <div>
            <nav class="navbar navbar-expand-lg " style={{ backgroundColor: "#ffffff" }}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Diagnostic Test</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link">
                                    <input style={{ borderRadius: "24px" }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                </a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <button
                                className="btn"
                                onClick={leaveTest}
                                style={{ backgroundColor: "red", color: "#ffffff", borderRadius: "24px", marginRight: "170px" }} >Quitter le Test</button>
                            <span style={{marginRight: "40px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle m-1" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                {user.username}...
                            </span>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )

    return(<>
       error 401 page note authorized  
    </>)
}

export default Navbar;