
//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
    console.log('Conectando');

    lblOffline.style.display = 'none'; //si esta conectado no se muestra el estilo
    lblOnline.style.display = ''; //si esta conectado se muestra
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    lblOnline.style.display = 'none';
    lblOffline.style.display = ''; 
});

socket.on('enviar-mensaje', (payload) => {
    console.log( payload );
})

btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload ); //enviar mensaje debe estar igualmente escrito tanto socket.emit como donde llega que es en socket.on en server.js
});