import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

function Question() {
  const [questions, setQuestions] = useState([]);
  const {diagnosticId} = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  useEffect(()=>{
    let headers = {
      Authorization: `Bearer ${user.accessToken}`
    };
    //get questions 
    api.get("/qst/all", {
      headers,
      withCredentials: true
    })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => alert(error.message));
  }, [])


  const handleChoiceChange = (questionId, choice) => {
    const newResponses = [...responses];
    newResponses.push({ questionId: questionId, text: choice });
    setResponses(newResponses);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleButtonClick = () => {
    if (isLastQuestion) {
      console.log("Responses:", responses);
      responses.forEach(responce => {
        let headers = {
          Authorization: `Bearer ${user.accessToken}`
        };
        console.log(user.accessToken);
        console.log("id is : ", diagnosticId);
        let dataToSend = {
          text: responce.text,
          diagnostic: {
            id: diagnosticId
          },
          question: {
            id: responce.questionId,
          },
          user: {
            id: user.id,
          }
        };

        api.post('/res/add', dataToSend, {
          headers,
          withCredentials: true
        }).then(
          (res) => {
            console.log(res.data);
          }
        ).catch((error) => {
          console.log(error.message);
        })
      });
      navigate(`/diagno/result/${diagnosticId}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if(questions.length !== 0)
  return (
    <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-6 mt-3">
            <p>{questions[currentQuestionIndex].text}</p>

            <div>
              <input
                type="radio"
                id="toute-a-fait-daccord"
                name={`question-${currentQuestionIndex}`}
                value="toute-a-fait-daccord"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "Toute_A_Fait_Daccord")}
              />
              <label htmlFor="toute-a-fait-daccord">Toute à fait d'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="daccord"
                name={`question-${currentQuestionIndex}`}
                value="daccord"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "Daccord")}
              />
              <label htmlFor="daccord">D'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="neutre"
                name={`question-${currentQuestionIndex}`}
                value="neutre"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "Neutre")}
              />
              <label htmlFor="neutre">Neutre</label>
            </div>
            <div>
              <input
                type="radio"
                id="pas-daccord"
                name={`question-${currentQuestionIndex}`}
                value="pas-daccord"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "Pas_daccord")}
              />
              <label htmlFor="pas-daccord">Pas d'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="desaccord-total"
                name={`question-${currentQuestionIndex}`}
                value="desaccord-total"
                onChange={() => handleChoiceChange(currentQuestionIndex, "Desaccord_Total")}
              />
              <label htmlFor="desaccord-total">Désaccord total</label>
            </div>
          </div>
          <div className="col-md-6 p-4">
            <button className='btn btn-secondary ' style={{ borderRadius: "24px", width: "130px", float: "right", marginBlockStart: "180px" }} onClick={handleButtonClick}>
              {isLastQuestion ? "Send" : "Next Question"}
            </button>
          </div>
        </div>
    </div>
  );

  return <div>
    <span>
      loading...
    </span>
  </div>
}

export default Question;
