var chai = require('chai');
var assert = chai.assert;

describe('my awesome website', function() {
    it('should do some chai assertions', function(done) {
      return browser
        .url('http://localhost:3000', done)
        .getTitle().should.eventually.be.equal('Hurricane Tracker');
    });

// describe('Map loads correctly', function() {

//   it('HTML should load', function(done) {
//     return browser
//       .url('http://google.com')
//       .getTitle().then(function(title) {
//         console.log('\n**************\n' + title);
//       });
    // browser
    //   .url('http://localhost:3000')
    //   .getTitle()
    //   .then(function(title) {
    //     assert.equal(title, 'Hurricane Tracker');
    //   })
    //   .getHTML('body')
    //   .then(function(body){
    //     assert.isDefined(body);
    //   })
    //   .call(done);
  // });

});

/*

  'Specific panes load' : function(client) {
    client.expect.element('div#sidebarLeft').to.be.present;
  },

  'Widgets load' : function(client) {
    client.expect.element('div#geocoder_widget').to.be.present;
  }
 */
