import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGpt } from '../features/gastos/actions';

const Voz = () => {
  const [isRecognitionAvailable, setIsRecognitionAvailable] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();

  const response_gpt = useSelector((state) => state.gastos.response_gpt);

  console.log('isRecognitionAvailable', isRecognitionAvailable);
  console.log('recognizedText', recognizedText);
  console.log('response_gpt', response_gpt);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      setIsRecognitionAvailable(true);
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
          }
        }
        setRecognizedText((prevText) => prevText + transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
      };
    } else {
      setIsRecognitionAvailable(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const clearText = () => {
    setRecognizedText('');
  };

  const submit = () => {
    dispatch(addGpt(recognizedText));
  };

  return (
    <div>
      {isRecognitionAvailable ? (
        <>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2"
            onClick={startRecognition}
          >
            Start
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2"
            onClick={stopRecognition}
          >
            Stop
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={clearText}
          >
            Clear
          </button>
          <div className="w-full mt-2 p-2 border rounded">
            <span>{recognizedText}</span>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={submit}
            >
              Save
            </button>
          </div>
          <div className="w-full mt-2 p-2 border rounded bg-gray-100 text-gray-800">
            <h3 className="font-bold">Response GPT:</h3>
            <span>{JSON.stringify(response_gpt, null, 2)}</span>
          </div>
        </>
      ) : (
        <p>La API de reconocimiento de voz no está disponible en este navegador.</p>
      )}
    </div>
  );
};

export default Voz;


