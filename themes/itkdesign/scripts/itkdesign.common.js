/*jshint devel:true */
/*jshint laxbreak:true*/

(function($) {

  // When ready start the magic
  $(document).ready(function () {

    // -------------------------------------------------------------------------
    // Navigation scroll to
    // -------------------------------------------------------------------------
    //

    // Set variables
    var scrollToElements = $(".main-menu").find('a');


    // Loop through elements
    scrollToElements.each(function() {

      // When clicked scroll to section
      $(this).click(function () {
        $.scrollTo($(this).attr('href'), 1500, {easing: "swing"});

        // Make sure the href is not used
        return false;
      });
    });


    // ---


    // -------------------------------------------------------------------------
    // Fixed navigation
    // -------------------------------------------------------------------------
    //


    // ---


    // Set variables
    var header = $('.header-inner');
    var navigation = $('.top-bar');
    var scrolling_down;
    var scrolling_up;
    var last_scrolling = $(window).scrollTop();

    // Only attach the scroll event and actions to the front page
    if ($('body').hasClass('front')) {

      // Number in pixels for when we should position the header fixed
      var fixed_header_height = '470';

      // Used to keep track of header fixed state
      var is_navigation_fixed = false;

      // Hook into window scroll event (it will fire when attched if window is
      // scrolled down)
      $(window).scroll(function() {
        var top = $(window).scrollTop();

        // Scrolling down
        if (top > last_scrolling && top < fixed_header_height) {

          // Animate the header making it lower
          header.animate({
            opacity: '+-10'
          }, 'slow', function() {
            // Animation complete
          });

          scrolling_up = false;
          scrolling_down = true;

        // Scrolling up
        } else {

          // Animate the header making it higher
          header.animate({
            opacity: 'show'
          }, 'slow', function() {
            // Animation complete
          });

          scrolling_up = true;
          scrolling_down = false;
        }

        last_scrolling = top;


        // Figure out if we should fix position the header or not
        if (top > fixed_header_height && !is_navigation_fixed) {
          navigation.hide().addClass('fixed').fadeIn();

          is_navigation_fixed = true;
        }
        else if (top < fixed_header_height && is_navigation_fixed) {
          navigation.hide().removeClass('fixed').fadeIn();

          is_navigation_fixed = false;
        }
      });

    } else { // Not the front page
      // The header is always fixed
      header.addClass('fixed');
    }

  });

})(jQuery);