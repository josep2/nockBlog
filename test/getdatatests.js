/**
 * Created by jowanza on 9/4/15.
 */
var Code = require('code');
var Lab = require('lab');
var nock = require('nock');
var lab = exports.lab = Lab.script();

//BDD Stylings
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;

var server = require('../server');



describe('Get Data Server', function(){
    describe('Correct Username', function(){
        it('Should return a JSON of the users data', function(done){
            var api1 = nock('https://api.github.com/users/josep2')
                .get('')
                .reply(200, {'favoriteAlbum' : 'Born In The USA'});
            var options  = {
                method: 'POST',
                url: '/data',
                payload: {
                    userName: 'josep2'
                }
            };
            server.inject(options, function(res){
                expect(res.result.favoriteAlbum).to.equal('Born In The USA');
                done();
                api1.isDone()
            })
        })
    });
    describe('No Username', function(){
        it('Should return an error', function(done){
            var options  = {
                method: 'POST',
                url: '/data'
            };
            server.inject(options, function(res){
                expect(res.result).to.be.a.string();
                done();
            })
        })
    });
    describe('Delaying the request', {timeout: 5500}, function(){
        it('Should handle it just fine', function(done){
            var api1 = nock('https://api.github.com/users/josep2')
                .get('')
                .delay('5000')
                .reply(200, {'favoriteAlbum' : 'Born In The USA'});
            var options  = {
                method: 'POST',
                url: '/data',
                payload: {
                    userName: 'josep2'
                }
            };
            server.inject(options, function(res){
                expect(res.result.favoriteAlbum).to.equal('Born In The USA');
                done();
                api1.isDone()
            })
        })
    })
});