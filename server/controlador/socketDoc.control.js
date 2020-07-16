;
'use strict'

let gestionDocumentos = (https) => {
  let io = require("socket.io")(https),
    socketJwt = require("socketio-jwt");

  io.use(
    socketJwt.authorize({
      secret: process.env.KEY_JWT,
      handshake: true,
    })
  );

  const getData = {}; 

  io.on("connection", (socket) => {
    let anteriorId;

    const safeJoin = (actualId) => {
      socket.leave(anteriorId);
      socket.join(actualId);
      anteriorId = actualId;
    };

 

    socket.on("getDoc", (id) => {
     
      safeJoin(id);
      socket.emit("manageData", getData[id]);
    
    });

    socket.on("addDoc", (doc) => {
      let aulas = Object.keys(getData),
        aulasNumero = aulas.length + 1,
        aulaNombre = `doc ${aulasNumero}`;

      doc.id = aulaNombre;

      getData[doc.id] = doc;
      safeJoin(doc.id);
      io.emit("getData", Object.keys(getData));
      
      socket.emit("manageData", doc);
    });

    socket.on("editDoc", (doc) => {
      getData[doc.id] = doc;
      socket.to(doc.id).emit("manageData", doc);
    });



    io.emit("getData", Object.keys(getData));
  });
};

module.exports = gestionDocumentos;
