const express = require('express');
const api_config = require('./config');
const app = express();
const port = api_config.port;
const userRouter = require('./routers/userManager');
const utilRouter = require('./routers/util');
const novelRouter = require('./routers/novelManager');
const requestRouter = require('./routers/requestManager');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/util', utilRouter);
app.use('/novel', novelRouter);
app.use('/request', requestRouter);

app.use(express.static('./uploads'))

app.listen(port, () => {
    console.log('Hurray!!!!! server started on port ' + port);
});
