var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
chai.use(require('chai-as-promised'));
var webdriverio = require('webdriverio');

describe('Map loads correctly', function() {
  this.timeout(999999);
  var client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });

  it('HTML should load', function(done) {
    client
      .init()
      .url('http://localhost:3000')
      .getTitle()
      .then(function(title) {
        assert.equal(title, 'Hurricane Tracker');
      })
      .getHTML('body')
      .then(function(body){
        assert.isDefined(body);
      })
      .call(done);
  });

  after(function(done) {
    console.log('Closing down functional tests...');
    client
      .end()
      .call(done);
  });
});

/*

  'Specific panes load' : function(client) {
    client.expect.element('div#sidebarLeft').to.be.present;
  },

  'Widgets load' : function(client) {
    client.expect.element('div#geocoder_widget').to.be.present;
  }
 */
