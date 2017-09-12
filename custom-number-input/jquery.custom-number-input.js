/*
 * jQuery Custom Number Input
 * By Sharapov A. <alexander@sharapov.biz>
 * Version 1.0
 */

$.fn.cNumber = function (options) {
  var defaults = {
    wrapperClass: "input-group",
    inputClass: "input-number",
    min: "-10000000000000000",
    max: "10000000000000000",
    controlButtonTemplate: '<div class="input-group-addon input-group-number-control"><div class="btn-plus">&plus;</div><div class="btn-minus">&minus;</div></div>'
  };

  options = $.extend(defaults, options);

  return this.each(function() {
    var self = $(this),
        min = self.attr('min') || options.min,
        max = self.attr('max') || options.max,
        wrap = document.createElement('div');
    if(self.closest('.input-group').length === 0) {
      wrap.className = options.wrapperClass;
      self.wrap(wrap);
    }

    self.addClass(options.inputClass);

    jQuery(options.controlButtonTemplate)
        .insertAfter(self);

    if(self.hasClass('input-sm')) {
      self.next('.input-group-number-control').addClass('input-group-number-control-sm');
    } else if(self.hasClass('input-lg')) {
      self.next('.input-group-number-control').addClass('input-group-number-control-lg');
    }

    self.next('.input-group-number-control').find('.btn-plus').click(function () {
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

    self.next('.input-group-number-control').find('.btn-minus').click(function () {
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