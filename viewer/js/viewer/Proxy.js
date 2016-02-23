console.log('Inside Proxy.js');
define([
  'connect',
  'proxypage',
  'body-parser'
], function (connect, proxypage, bodyParser){
  return {
    startup : function() {
      console.log('We are inside Proxy.startup!');
      var app = connect();
      var port = 3002;
      app.use(bodyParser.text({ type: 'text/html' }));
      app.use(bodyParser.json({ type: 'application/*+json' }));

      app.use('/proxy', proxypage.proxy);

      app.listen(port, function() {
        console.log('Connect server listening on port ' + port);
      });
    }
  };
});
