import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosConfig';
import useNavigate from 'react-router-dom';

function Question() {
  const [questions, setQuestions] = useState([]);
  const [diagnostic  , setDiagnostic] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [user , setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  useEffect(() => {
    console.log()
    let headers = {
      Authorization: `Bearer ${user.token}`
    };
    api.get("/qst/all", {
      headers,
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        alert("done");
      })
      .catch((error) => alert(error.message));
    
    api.post("/diagno/add" , {user : {id : user.id}}).then(
      (res)=>{
        console.log(res.data);
        setDiagnostic(res.data);
          }
    ).catch((error)=>{
      console.log(error.message);
    })
  }, []);

  const handleChoiceChange = (questionId, choice) => {
    const newResponses = [...responses];
    newResponses.push({questionId : questionId , text : choice});
    setResponses(newResponses);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleButtonClick = () => {
    if (isLastQuestion) {
      console.log("Responses:", responses);
      responses.forEach(responce => {
        let dataToSend  = {
          text: responce.text,
          diagnostic: {
            id: diagnostic.id
          },
          question: {
            id: responce.questionId,
          },
          user: {
            id: user.id,
          }
        };

        api.post('/res/add' ,dataToSend).then(
          (res)=>{
             console.log(res.data);
          }
        ).catch((error)=>{
          console.log(error.message);
        })
      });
      navigate(`/diagno/result/${diagnostic.id}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="container-fluid mt-3">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div className="row">
          <div className="col-md-6 mt-3">
            <p>{questions[currentQuestionIndex].text}</p>

            <div>
              <input
                type="radio"
                id="toute-a-fait-daccord"
                name={`question-${currentQuestionIndex}`}
                value="toute-a-fait-daccord"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "toute-a-fait-daccord")}
              />
              <label htmlFor="toute-a-fait-daccord">Toute à fait d'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="daccord"
                name={`question-${currentQuestionIndex}`}
                value="daccord"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "daccord")}
              />
              <label htmlFor="daccord">D'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="neutre"
                name={`question-${currentQuestionIndex}`}
                value="neutre"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "neutre")}
              />
              <label htmlFor="neutre">Neutre</label>
            </div>
            <div>
              <input
                type="radio"
                id="pas-daccord"
                name={`question-${currentQuestionIndex}`}
                value="pas-daccord"
                onChange={() => handleChoiceChange(questions[currentQuestionIndex].id, "pas-daccord")}
              />
              <label htmlFor="pas-daccord">Pas d'accord</label>
            </div>
            <div>
              <input
                type="radio"
                id="desaccord-total"
                name={`question-${currentQuestionIndex}`}
                value="desaccord-total"
                onChange={() => handleChoiceChange(currentQuestionIndex, "desaccord-total")}
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
      ) : (
        <p>Loading...
        </p>
      )}
    </div>
  );
}

export default Question;
