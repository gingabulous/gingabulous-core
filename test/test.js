describe('Gingabulous core', function() {
  it('is properly attached to the window', function() {
    expect(window.Gingabulous).to.be.an('object');
  });

  describe('_hyphenate', function() {
    it('returns hyphenated strings from passed camelCased strings', function() {});
  });
  describe('_initModule', function() {
    var module = {
      name:           'Foo',
      dattaAttr:      'data-foo',
      dataAttrTarget: '[data-foo]',
      jquery:         false
    };
    var html = `<div data-foo></div><div data-foo></div><div data-foo></div>`;

    beforeEach(function() {
      document.body.insertAdjacentHTML('beforeend', html);
    });
    afterEach(function() {
      document.body.removeChild();
    });
    it('', function() {});
  });
  describe('registerModule', function() {
    afterEach(function() {
    });
    it('adds the module to the Gingabulous namespace', function() {});
  });
});
