var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;
var client = require('webdriverio').remote({
  desiredCapabilities: {
    browserName: 'firefox'
  }
}).init();

describe('Map loads correctly', function() {
  before(function(done) {
    console.log('Setting up functional tests...');
    client
      .url('http://localhost:3000');
    done();
  });

  it('HTML should load', function(done) {
    client
    // .expect.element('body').to.be.present;
      .getTitle(function(err, title) {
        assert.equal(undefined, err);
        assert.strictEqual(title, 'Hurricane Tracker');
      });
    done();
  });

  after(function(done) {
    console.log('Closing down functional tests...');
    client.end();
    done();
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
