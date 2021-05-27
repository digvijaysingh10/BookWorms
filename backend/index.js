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

let users = {};

io.on('connection', (socket) => {
    console.log('client connected!!');

    socket.on('register', id => {
        users[id] = socket;
        // console.log(users);
    })

    socket.on('sendmsg', (data) => {
        console.log('a message from client');

        data.reply = false;
        let user = users[data.contact];
        if (user) {
            socket.to(user.id).emit('recmsg', data);
        }
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
