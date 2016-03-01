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

  'Basic HTML loads' : function(client) {
    client.expect.element('body').to.be.present;
    client.assert.title('Hurricane Tracker');
  },

  'Specific panes load' : function(client) {
    client.expect.element('div#sidebarLeft').to.be.present;
  },

  'Widgets load' : function(client) {
    client.expect.element('div#geocoder_widget').to.be.present;
  }
};
