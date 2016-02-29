module.exports = {
  before : function(client) {
    console.log('Setting up functional tests...');
    client
      .url('http://localhost:3000')
      .pause(1000);
  },

  after : function(client) {
    console.log('Closing down functional tests...');
    client.end();
  },

  'HTML body is present' : function(client) {
    client.expect.element('body').to.be.present;
  },

  'Page title is correct' : function(client) {
    // expect 'Hurricane Tracker' in the title
    // client.expect.element('title').text.to.have.value.that.equals('Hurricane Tracker');
    client.assert.title('Hurricane Tracker');
  },

  'Map is centered on the United States' : function(client) {
  },

  'Collapsed sidebar panes load' : function(client) {
  },

  'Universal search bar loads' : function(client) {}

};
