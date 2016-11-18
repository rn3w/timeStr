var texto       = document.getElementById('captureInput'),
    resultado   = document.getElementById('resultado'),
    teclas      = {}; //acá guardamos tiempo de inicio y fin de cada tecla

texto.addEventListener('keydown', function(keyboardEvent) {
    const timestamp = performance.now(),
    	  keyName   = keyboardEvent.key;

    if (!teclas[keyName]) { //Sólo si no se está manteniendo presionado
    	teclas[keyName] = {down: timestamp};
    }
});

texto.addEventListener('keypress', function(keyboardEvent) {
    const timestamp = performance.now(),
    	  keyName   = keyboardEvent.key;

    teclas[keyName].press = timestamp;
});


texto.addEventListener('keyup', function(keyboardEvent) {
    const timestamp	= performance.now(),
    	  keyName	= keyboardEvent.key,
          presion 	= timestamp - teclas[keyName].down;
    var   realce;

    if (teclas[keyName].press)
    	realce = timestamp - teclas[keyName].press;
    else //tecla de control => estimar realce
    	realce = presion / 2;
      
      realce=timestamp-teclas[keyName].press;
        var tpresion=presion-realce;
    delete teclas[keyName]; //Eliminamos la propiedad para que tome el siguiente KeyDown
    
    
    //Mostrar el mensaje con los tiempos
    var   mensaje   = 'Tecla "' + keyName 
                    + '"\tPresión: ' + tpresion.toPrecision(5) + ' ms'
                    + '\tRealce: ' + realce.toPrecision(5) + ' ms';
    
    resultado.innerText += mensaje + '\n';
    resultado.scrollTop = resultado.scrollHeight - resultado.clientHeight;
});