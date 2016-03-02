var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;
var webdriverio = require('webdriverio');

describe('Map loads correctly', function() {
  this.timeout(99999);
  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'firefox' } });
    client
      .init()
      .url('http://localhost:3000')
      .call(done);
  });

  it('HTML should load', function(done) {
    client
      //.expect.element('body').to.be.present
      .getTitle(function(err, title) {
        assert.equal(undefined, err);
        assert.strictEqual(title, 'Hurricane Tracker');
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
