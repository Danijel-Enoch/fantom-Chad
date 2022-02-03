(function($) {
  'use strict';
  //Open submenu on hover in compact sidebar mode and horizontal menu mode
  $(document).on('mouseover mouseout', '.sidebar', function(ev) {
    var body = $('body');
    var sidebarIconOnly = body.hasClass("sidebar-icon-only");
    // var sidebarFixed = body.hasClass("sidebar-fixed");
    if (!('ontouchstart' in document.documentElement)) {
      if (sidebarIconOnly) {
        if (ev.type === "mouseover") {
          body.removeClass("sidebar-icon-only");
        } else {
          var $menuItem = $(this);
          if (ev.type === "mouseenter") {
            $menuItem.addClass("hover-open");
          } else {
            $menuItem.removeClass("hover-open");
          }
        }
      } else if (ev.type === "mouseout") {
        body.addClass("sidebar-icon-only");
      }
    }
  });
})(jQuery);