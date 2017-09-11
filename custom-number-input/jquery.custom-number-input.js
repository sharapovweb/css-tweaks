/*
 * jQuery Custom Number Input
 * By Sharapov A. <alexander@sharapov.biz>
 * Version 1.0
 */

$.fn.cNumber = function (options) {
  var defaults = {
    wrapperClass: "cNumber-input-group",
    inputClass: "cNumber-input",
    min: "-10000000000000000",
    max: "10000000000000000",
    controlButtonTemplate: '<div class="cNumber-nav"><div class="cNumber-btn cNumber-btn-up">&plus;</div><div class="cNumber-btn cNumber-btn-down">&minus;</div></div>'
  };

  options = $.extend(defaults, options);

  return this.each(function() {
    var self = $(this),
        min = self.attr('min') || options.min,
        max = self.attr('max') || options.max,
        wrap = document.createElement('div');
    wrap.className = options.wrapperClass;
    self.wrap(wrap);
    self.addClass('cNumber-input');
    jQuery(options.controlButtonTemplate).insertAfter(self);
    self.next().find('.cNumber-btn-up').click(function () {
      var ov = parseFloat(self.val());
      if(ov >= min && ov < max) {
        ov = ov + 1;
      } else if (ov >= max) {
        ov = max;
      } else {
        ov = min;
      }
      self.val(ov);
      self.trigger("change");
    });

    self.next().find('.cNumber-btn-down').click(function () {
      var ov = parseFloat(self.val());
      if(ov > min && ov <= max) {
        ov = ov - 1;
      } else if (ov >= max) {
        ov = max;
      } else {
        ov = min;
      }
      self.val(ov);
      self.trigger("change");
    });
  });
};