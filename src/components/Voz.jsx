import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGpt } from '../features/gastos/actions';

const Voz = () => {
  const [isRecognitionAvailable, setIsRecognitionAvailable] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const dispatch = useDispatch();

  const response_gpt = useSelector((state) => state.gastos.response_gpt);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      setIsRecognitionAvailable(true);
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        setFinalTranscript((prevText) => prevText + finalTranscript);
        setInterimTranscript(interimTranscript);
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
      setIsListening(true);
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearText = () => {
    setFinalTranscript('');
    setInterimTranscript('');
  };

  const submit = () => {
    dispatch(addGpt(finalTranscript));
  };

  return (
    <div>
      {isRecognitionAvailable ? (
        <>
          <div className="flex space-x-4 mb-2">
            <button
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2 flex items-center ${isListening ? 'animate-pulse' : ''}`}
              onClick={startRecognition}
            >
              <img src="src/assets/micro.ico" alt="Microphone Icon" className="w-6 h-6 mr-2" />
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2"
              onClick={stopRecognition}
            >
              <img src="src/assets/stop.ico" alt="Stop Icon" className="w-6 h-6 mr-2" />
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              onClick={clearText}
            >
              <img src="src/assets/clear.ico" alt="Clear Icon" className="w-6 h-6 mr-2" />
            </button>
          </div>
          <div className="w-full mt-2 p-2 border rounded">
            <span>{finalTranscript} {interimTranscript}</span>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-2"
              onClick={submit}
            >
              <img src="src/assets/send.ico" alt="Send Icon" className="w-4 h-4 mr-2" />
            </button>
          </div>
          <div className="w-full mt-2 p-2 border rounded bg-gray-100 text-gray-800 mb-8">
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
