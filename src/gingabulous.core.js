!function() {
const Gingabulous = {
  modules: {},

  /**
   * Covert CamalCase to hyphenated string.
   * @method _hyphenate
   *
   * Found in Foundation for Sites core file. Link to that file, and the link they have
   * as the source for the solution.
   * @link https://github.com/zurb/foundation-sites/blob/develop/js/foundation.core.js
   * @link http://stackoverflow.com/a/8955580
   *
   * @param  {string}   string - String to parse and covert.
   * @return {string}          - hyphenated string.
   */
  _hyphenate: function(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },
  // _getDataAttr: function(dataAttrName) {
  //   return `data-${dataAttrName}`;
  // },
  _initModule(module) {
    const elements = module.jquery ?
      $(module.dataAttrTarget) :
      document.querySelectorAll(module.dataAttrTarget);
    // Look for options set globally
    const options = module.options || {};
    if (module.jquery) {
      elements.each(function() {
        const $element = $(this);
        // This might not work... i forgot how to properly jquery...
        const instance = new Gingabulous[module.name]($element, options);
        instance.init();
      });
    } else {
      for (let i = 0; i < elements.length; i++) {
        const instance = new Gingabulous[module.name](elements[i], options);
        instance.init();
      }
    }
  },
  registerModule: function(module, dataAttrName, jquery = false) {
    const name = module.prototype.constructor.name;
    // If no value for `dataAttrName` is passed, then assign `name` to the value.
    dataAttrName = dataAttrName || this._hyphenate(name);
    // Add the module to the `modules` object.
    this.modules[name] = {
      name:           name,
      dataAttr:       `data-${dataAttrName}`,
      dataAttrTarget: `[data-${dataAttrName}]`,
      jquery:         jquery
    };
    this[name] = module;
  },

  init: function() {
    for (let module in this.modules) {
      if (Object.prototype.hasOwnProperty.call(this.modules, module)) {
        this._initModule(module);
      }
    }
  }

};

window.Gingabulous = Gingabulous;
}();
