'use strict'

$(document).ready(function() {

  (function($){
    $.fn.myPlugin = function(){

      $('.item').on('click', function() {
        let height = $(this).outerHeight(true) + parseInt($(this).css('margin-bottom'));
        let top = $(this).offset().top - $('.item').first().offset().top;
        let oldMargin = $(this).next('.item').css('margin-top');
        let newMargin = parseInt($(this).next('.item').css('margin-top')) + height;
        $(this).css({'position' : 'absolute', 'top' : top}).animate({left: '+=250'}, 1000).animate({top: 0}, 1000);
        $(this).next('.item').css({'margin-top' : newMargin});
        $('.item').first().animate({'margin-top' : height},1000);
        $(this).animate({left: '-=250'}, 1000);
        $(this).next('.item').animate({'margin-top' : oldMargin},1000);
      })

    };
  })(jQuery);

  $('.list').myPlugin();
})
