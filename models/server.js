const express = require('express');
const cors = require('cors');



class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;
        this.server = require('http').createServer(this.app); //Crea una instancia del servidor HTTP utilizando la aplicación Express (this.app). El servidor HTTP es proporcionado por el módulo http de Node.js y es necesario para que Socket.IO funcione correctamente.
        this.io = require('socket.io')( this.server ); //: Crea una instancia de Socket.IO para utilizarla en la comunicación con los clientes. Aquí, se pasa el servidor HTTP (this.server) creado anteriormente.

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //socket
        this.socket();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );


        // Directorio Público
        this.app.use( express.static('public') );

    

    }

    routes() {
        

        
    }

    socket(){
        this.io.on('connection', socket => {
            console.log('Cliente conectado');

            socket.on('disconnect', () => {
                console.log('Cliente desconectado', socket.id);
            });

            socket.on('enviar-mensaje',( payload ) => {
                this.io.emit('enviar-mensaje', payload);
            })
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;