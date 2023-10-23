import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import '../../assets/Result.css';

function Result() {
  const { id } = useParams();
  const [resultsByCat, setResultsByCat] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [total, setTotal] = useState("0");
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${user.accessToken}`
    };

    api.get("/cat/all", {
      headers,
      withCredentials: true
    })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        // Handle the error here if needed
      });
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      console.log(user.accessToken);
      const results = [];
      const headers = {
        Authorization: `Bearer ${user.accessToken}`
      };


      for (const category of categories) {
        try {
          const response = await api.get(`/diagno/getByCat/${id}/${category.id}`, {
            headers,
            withCredentials: true
          });

          results.push({
            category: category.name,
            result: response.data
          });
        } catch (error) {
        }
      }


      try {
        let res = await api.get(`/diagno/getGlobal/${id}`, {
          headers,
          withCredentials: true
        });
        console.log(res .data)
        setTotal(res.data);
      } catch (error) {
      }
      setResultsByCat(results);
    };

    fetchResults();
  }, [categories, id, user]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <table style={{ marginTop: "40px" }}>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Valeur</th>
              </tr>
            </thead>
            <tbody>
              {resultsByCat.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.result}</td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Result;
