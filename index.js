const express = require('express');
const postRouter = require('./post/postRouter.js');
const server = express();
server.use(express.json());
server.use('/api/post',postRouter);


server.listen(5001, () => {
    console.log('\n server running on port 5001 \n')
});

