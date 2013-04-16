/*jshint devel:true */
/*jshint laxbreak:true*/

(function($) {

  // When ready start the magic
  $(document).ready(function () {

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

      // Hook into iwindow scroll event (it will fire when attched f window is
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

    // Trigger a scroll event when page load.
    // So navigation is shown if page is reloaden when user is scrolled down on page.
    $(window).scroll();


    // -------------------------------------------------------------------------
    // Navigation scroll to and update active class
    // -------------------------------------------------------------------------
    //

    // ---

    //Get Sections top position
    function getTargetTop(elem){
      //gets the id of the section header
      //from the navigation's href e.g. ("#html")
      var id = elem.attr("href");
      var section_offset = parseInt(elem.attr('rel'), 10);
      var top_pos = $(window).scrollTop();
      var nav_offset = 0;

      //Height of the navigation
      if (top_pos <= 0) {
        nav_offset = 104 + section_offset;
      } else {
        nav_offset = 0 + section_offset;
      }

      //Gets the distance from the top and
      //subtracts the height of the nav.
      return $(id).offset().top - nav_offset;
    }

    //Smooth scroll when user click link that starts with #
    $('.main-menu a[href^="#"]').click(function(event) {
      //gets the distance from the top of the
      //section refenced in the href.
      var target = getTargetTop($(this));

      //scrolls to that section. Turning off scrollHandler while doing so.
      $(window).off("scroll", scrollHandler);
      $('html, body').animate({scrollTop:target}, 1000,
        function() {
          $(window).on("scroll", scrollHandler);
        });

      //prevent the browser from jumping down to section.
      event.preventDefault();
    });

    //Pulling sections from main nav.
    var sections = $('.main-menu a[href^="#"]');

    // Go through each section to see if it's at the top.
    // if it is add an active class
    function checkSectionSelected(scrolledTo){
      //How close the top has to be to the section.
      var threshold = 200;

      var i;

      for (i = 0; i < sections.length; i++) {
        //get next nav item
        var section = $(sections[i]);
        //get the distance from top
        var target = getTargetTop(section);
        //Check if section is at the top of the page.
        if (scrolledTo > target - threshold && scrolledTo < target + threshold) {
          //remove all selected elements
          sections.removeClass("active");

          //add current selected element.
          section.addClass("active");
        }
      }
    }

    //Check if page is already scrolled to a section.
    checkSectionSelected($(window).scrollTop());
    //Bind the check to scroll event
    var scrollHandler = function(){
      var myScroll = $(window).scrollTop();
      checkSectionSelected(myScroll);
    };

    $(window).on("scroll", scrollHandler);

  }); // EOF document.ready()

})(jQuery);