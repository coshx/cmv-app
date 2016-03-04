describe('The landing page', function() {

  it('should show "Hurricane Tracker" as its title.', function() {
    return browser
      .url('/')
      .getTitle().should.eventually.be.equal('Hurricane Tracker');
  });

  it('should load some body text.', function() {
    return browser
      .url('/')
      .getHTML('body').should.eventually.exist;
  });

  it('should load the left sidebar.', function() {
    return browser
      .url('/')
      .getHTML('#sidebarLeft').should.eventually.exist;
  });

  it('should load the geocoder widget.', function() {
    return browser
      .url('/')
      .getHTML('#geocoder_widget').should.eventually.exist;
  });
});
