/*jslint browser: true, devel: true, node: true, rhino: false, nomen: true,
         regexp: true, unparam: true, indent: 2, maxlen: 80*/
/*global jQuery, console, alert, schedule */

(function script($, schedule) {
  'use strict';

  /**
   * Link to change the day.
   */
  $('.calendar-item.next a, .current-show-link, .carousel-item-link')
    .on('click', function eventCalendarNext(event) {
      event.preventDefault();
      alert('Função não implementada!');
    });

  /**
   * Link to choose the schedule for an specific hour.
   */
  $('.calendar-item.hour a').on('click', function eventChooseHour(event) {
    var template = $('.details-item-template').html(),
      hour = $(this).data('time'),
      programs = schedule.days['1'][hour],
      fadeTime = 300;

    event.preventDefault();

    // Change active class.
    $('.calendar-item.active').removeClass('active');
    $(this).parents('.calendar-item').first().addClass('active');

    // Change details sidebox text.
    $('.details-title').text(hour + 'h');

    // Change details sidebox color.
    $('.details').removeClass(function (index, className) {
      return (className.match(/(^|\s)color-\d+/g) || []).join(' ');
    }).addClass('color-' + $(this).data('color'));

    // Hide current itens, maintaining the height of the wrapper.
    $('.details-items').height($('.details-items').height());
    $('.details-items .details-item').fadeOut(fadeTime, function () {
      $(this).remove();
    });

    // Create each new item.
    $.each(programs, function eachProgram(index, element) {
      var show = schedule.programs[element],
        detailItem = template,
        quarters = ['00', '15', '30', '45'];

      detailItem = detailItem.replace(/@id/g, show.id);
      detailItem = detailItem.replace(/@name/g, show.name);
      detailItem = detailItem.replace(/@image/g, show.image);
      detailItem = detailItem.replace(/@time/g, hour + ':' + quarters[index]);

      $(detailItem).prependTo('.details-items');
    });

    // Show new items, remove height style from wrapper and attach modal event.
    $('.details-items .details-item')
      .delay(fadeTime)
      .fadeIn(fadeTime, function () {
        $('.details-items').removeAttr('style');
        $('.details-item-link').on('click', eventDetailsClick);
      });

    // Load new items images.
    $('.details-items img[data-src]').each(function eventImageLoad() {
      $(this).attr('src', $(this).data('src'));
    });
  });

  /**
   * Details item link - open modal with more details about a show.
   */
  /**
   * @return {none} null
   * @param {string} event - The event object.
   */
  function eventDetailsClick(event) {
    event.preventDefault();

    // Change active class.
    $('.details-item a.active').removeClass('active');
    $(this).addClass('active');

    // Open modal.
    $('#cnModal').modal({show: true});
  }

  // Click on a detail item.
  $('.details-item-link').on('click', eventDetailsClick);

  // Modal event, to change the data inside.
  $('#cnModal').on('show.bs.modal', function (event) {
    var button = $('.details-item a.active'),
      id = button.data('id'),
      modal = $(this),
      show = schedule.programs[id];

    modal.find('.modal-header img').attr('src', show.image);
    modal.find('.modal-title .title').text(show.name);
    modal.find('.modal-title .original').text(show.original);
    modal.find('.modal-title .slogan').text(show.slogan);
    modal.find('.modal-body .description p').text(show.description);
  });

}(jQuery, schedule));
