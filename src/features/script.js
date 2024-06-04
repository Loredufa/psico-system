
if ('webkitSpeechRecognition' in window) {
    const btnStart = document.getElementById('btnstart');
    const btnStop = document.getElementById('btnstop');
    const textArea = document.getElementById('TextArea'); // Corregido el id del textarea

    const recognition = new webkitSpeechRecognition(); // Asegúrate de que webkitSpeechRecognition esté disponible

    recognition.continuous = true;
    recognition.lang = 'es-ES';
    recognition.interimResult = false;

    btnStart.addEventListener('click', () => {
    recognition.start();
    });

    btnStop.addEventListener('click', () => {
    recognition.abort();
    });

    recognition.onresult = (event) => {
        console.log('Botón Start clickeado');
        console.log(event);
    };
    recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
      };
      
  } else {
    console.error('La API de reconocimiento de voz no está disponible en este navegador.');
  }

