(function($) {

  // When ready start the magic
  $(document).ready(function () {

    var header = $('.header');

    // Only attached the scroll event and actions to the front page
    if ($('body').hasClass('front')) {

      // Get calculations for elements position on the page and their sizes
      var header_pos_relative = '225';
      /**
      * @todo why do we need to have -20px offset ? If they are not there every
      * thing jumps
      */

      // Used to keep track of navaigation headers fixed state
      var header_fixed = false;

      // Hook into window scroll event (it will fire when attched if window is
      // scrolled down)
      $(window).scroll(function(){
        var top = $(window).scrollTop();

        // Figure out if we should fix position the header or not
        if (top > header_pos_relative && !header_fixed) {
          header.hide().addClass('fixed').fadeIn();

          header_fixed = true;
        }
        else if (top < header_pos_relative && header_fixed) {
          header.hide().removeClass('fixed').fadeIn();

          header_fixed = false;
        }
      });

    }
    else {  // Not the front page
      // The header is always fixed
      $('.header').addClass('fixed');
    }

  });

})(jQuery);