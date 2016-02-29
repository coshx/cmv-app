module.exports = {
  'Test that map initializes ok' : function(client) {
    client
      .url('http://localhost:3000')
      .pause(1000);

    // expect body element to be present in 1000ms
    client.expect.element('body').to.be.present.before(1000);

    // expect map to be centered on the United States

    // expect the collapsed sidebar panes to be loaded

    // expect the universal search bar to be loaded

    // expect 'Hurricane Tracker' in the title


    client.end();
  }
};
