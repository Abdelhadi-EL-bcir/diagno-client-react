import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from "react-router-dom";
function Home() {
  const [user, setUser] = useState({});
  const [isAuth , setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let userString = localStorage.getItem('user');
    if( userString === null){
      setIsAuth(false);
    }else{
      setIsAuth(true);
      setUser(JSON.parse(userString));
    }
  }, []);

  if (isAuth)
    return (
      <div className="home-container">
        <div className="content">
          <h1>Bienvenue, {user.username}. Êtes-vous prêt à passer votre Diagnostic Test ?</h1>
          <button onClick={()=>navigate('/diagno')} className="centered-button">Commencer le Test</button>
        </div>
      </div>
    );

    return (
      <div className="home-container">
        <div className="content">
          <h1>Auhtentification nedded!</h1>
          <button onClick={()=>navigate('/login')} className="centered-button" style={{backgroundColor:"red"}}>connexion maintnent</button>
        </div>
      </div>
    );

}

export default Home;
