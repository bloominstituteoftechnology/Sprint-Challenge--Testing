

//== Open Games API Server =====================================================

//-- Dependencies --------------------------------
const server = require('./server.js');
const config = require('./config.js');

//-- Configure Server ----------------------------
server.listen(config.SERVER_PORT, () => {
    console.log(config.SERVER_MESSAGE);
});
