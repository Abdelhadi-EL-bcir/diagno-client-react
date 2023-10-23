import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserProvider';
import api from '../../utils/axiosConfig';

function Acceuil() {
  const navigate = useNavigate();  
  const user = useUser();

  useEffect(()=>{
    console.log(user);
  } , [user]); 

  const hundleStart = ()=>{
    console.log(user.accessToken);
    let headers = {
      Authorization: `Bearer ${user.accessToken}`
    };

    let diagnostic = {};
    //create diagnostic
    api.post("/diagno/add",{user : {id : user.id}},  {
      headers,
      withCredentials: true
    })
      .then((res) => {
        diagnostic = res.data;
        navigate('/diagno/test/'+diagnostic.id);
      })
      .catch((error) => console.log(error));
    
  };

  return (
    <div className='container'>
      <div className='row'>
          <div className='col-md-12 text-center mt-5'> 
            <button style={{borderRadius:"24px" , fontSize:"30px"}} onClick={hundleStart} className='btn btn-primary'>
                Commencer
            </button>
          </div>
      </div>
    </div>
  )
}

export default Acceuil;