;
'use strict'

const MongooseClient = require('mongoose'),
      { USER_DB,
        PASS_DB,
        HOST_DB,
        NAME_DB
      } = process.env,
      //mongoUrl = `mongodb+srv://${USER_DB}:${PASS_DB}@${HOST_DB}/${NAME_DB}?retryWrites=true&w=majority`;
      mongoUrl = `mongodb://${HOST_DB}/${NAME_DB}`;

     let connection,
     connectDb = async() => {
         if(connection) return connection
         let cliente 
         try {
             cliente = await MongooseClient.connect(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
                 
             })
             console.log('DB conectada....')
         } catch (error) {
             console.log(error);
             process.exit(1);
         }
 
         return connection
     }
 
 module.exports = connectDb;
 