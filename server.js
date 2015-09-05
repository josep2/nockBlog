/**
 * Created by jowanza on 9/4/15.
 */

var Hapi = require('hapi');
var server = new Hapi.Server();
var req = require('request');


server.connection({
    host: '0.0.0.0',
    port: 3001,
    labels: ['api']
});



server.route({
    method: 'POST',
    path: '/data',
    handler: getData
});

function getData(request, reply){

    if(!request.payload){
       return reply("Sorry, I need a github username")
    }

    req.get({url:'https://api.github.com/users/'+request.payload.userName,
        headers: {Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'josep2'},
        json: true}, function(err, res, body){

        reply(body);
    })
}


server.start(function () {
    console.log('Server running at:', server.info.uri);
});

module.exports = server;