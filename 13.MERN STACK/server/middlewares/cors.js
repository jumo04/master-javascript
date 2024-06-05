const cors = require('cors');

 const corsMiddleware = () => cors({
    origin: (origin, callback) =>{
        
        const ACCEPTED_ORIGINS =['http://localhost:4200','http://localhost:3000','http://localhost:4000']

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        callback(null, true);
    }else{
     return callback(new Error('Not allowed by CORS'));
     }
    }
})

module.exports = corsMiddleware