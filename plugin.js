'use strict'

$(document).ready(function () {

    (function ($) {
        $.fn.myPlugin = function (options) {

            const settings = $.extend({
                direction: 'down',
                index: 8,
                debug: false
            }, options);

            let initialList = $(this).find('.item');
            $('.revert').on('click', function revert () {
               $('.list').empty().append(initialList);
            });

            $(this).on('click', 'li', function () {
                let lastElement = $('.item').last();

                if (Math.abs(settings.index) <= lastElement.index()) {
                    var indexElement = $('.item:eq(' + settings.index + ')');
                } else {
                    var indexElement = lastElement;
                }

                if ($(this).index() != indexElement.index()) {
                    let moveToLeft = $(this).outerWidth() + 25;

                    if (settings.direction === 'up') {
                        var offset = -($(this).offset().top - indexElement.offset().top);
                    }
                    if (settings.direction === 'down') {
                        var offset = indexElement.offset().top + indexElement.outerHeight() - $(this).offset().top;
                    }

                    function insertElement(element) {
                        if (settings.direction === 'up') {
                            element.insertBefore(indexElement);
                        }
                        if (settings.direction === 'down') {
                            element.insertAfter(indexElement);
                        }
                    }

                    function Animation(element) {
                        element.animate({left: moveToLeft}, 300);
                        element.animate({top: offset}, 200);
                        element.animate({left: 0}, 300, function () {
                            insertElement(element);
                            element.css({'top': '0'});
                        });
                    }

                    Animation($(this));

                    if (settings.debug) console.log($('.item'));
                }
            });

            $(this).sortable();

        };
    })(jQuery);

    $('.list').myPlugin({
        direction: 'up',
        index: 2,
        debug: true
    });
})
