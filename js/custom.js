// ==========================
// custom.js — Sponsor Angels
// ==========================
// Autor: Elarssen Code Solutions
// Versão: 1.0
// --------------------------  

  (function ($) {
  
  "use strict";

    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });
    
    $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
});
    
  })(window.jQuery);


