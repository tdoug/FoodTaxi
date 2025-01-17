var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');

var lessMiddleware = require('less-middleware');


module.exports = function (app, config) {
  function compile(str, path) {
    return stylus(str).set('filename', path);
  }

  app.configure(function() {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'ihaveasecret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(lessMiddleware(config.rootPath + '/public'));
    app.use(express.static(config.rootPath + '/public'));
    app.use(stylus.middleware(
        {
          src: config.rootPath + '/public',
      compile: compile
        }
        ));
    app.use(express.static(config.rootPath + '/public'));
  });
}



