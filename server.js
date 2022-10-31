//creation et lecture de http par node
const http = require("http");

//creation du serveur avec une requete et la reponse attendue
const server = http.createServer((req, res) => {
  //l'equivalent d'un print
  res.end("Ousmane mon prince !");
});

//affichage sur le port 8000 de l'equivalent du print
server.listen(process.env.PORT || 8000);
