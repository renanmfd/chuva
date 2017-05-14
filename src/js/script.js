/*jslint browser: true, devel: true, node: true, rhino: false, nomen: true,
         regexp: true, unparam: true, indent: 2, maxlen: 80*/
/*global jQuery, console */

(function script($) {
  'use strict';

  // Instantiate the Bootstrap carousel
  $('.multi-item-carousel').carousel({
    interval: false
  });
  
  function getNext($item, cloneIndex, total) {
    if (cloneIndex >= total) {
      cloneIndex = cloneIndex - total;
    }
    return $(
      $item
        .parent()
        .children()
        .get(cloneIndex)
    );
  }

  // Allows Bootstrap Carrousel to use multiple itens on each slide.
  $('.multi-item-carousel .item').each(
    function multiItemCarrousel(index, element) {
      var $item = $(element),
        next,
        total = $item.parent().children().length;

      for (next = 1; next < 5; next += 1) {
        getNext($item, index + next, total)
          .children(':first-child')
          .clone()
          .appendTo($item);
      }
    }
  );

}(jQuery));
