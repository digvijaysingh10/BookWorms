const express = require('express');
const api_config = require('./config');
const app = express();
const port = api_config.port;
const userRouter = require('./routers/userManager');
const utilRouter = require('./routers/util');
const novelRouter = require('./routers/novelManager');
const requestRouter = require('./routers/requestManager');
const cors = require('cors');

// This is how to initialize Socket.io at backend
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('client connected!!');

    socket.on('sendmsg', (data) => {
        console.log('a message from client');
        console.log(data);

        data.reply = false;
        socket.broadcast.emit('recmsg', data);
    })

})

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/util', utilRouter);
app.use('/novel', novelRouter);
app.use('/request', requestRouter);

app.use(express.static('./uploads'))

server.listen(port, () => {
    console.log('Hurray!!!!! server started on port ' + port);
});
