const $ = window.$;
$(document).ready(() => {
  let amenityDict = {};
  $('input:checkbox').change(() => {
    let amenityString = '';
    if ($(this).is(':checked')) {
      $('li > input:checkbox:checked').map(function () {
        amenityDict[$(this).attr('data-id')] = ' ' + $(this).attr('data-name');
      }).get();
      Object.values(amenityDict).forEach((amenity) => {
        amenityString += amenity;
        amenityString += ' ';
      });
      $('div.amenities > h4').text(amenityString);
    } else {
      amenityDict = {};
      $('li > input:checkbox:checked').map(function () {
        amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }).get();
      Object.values(amenityDict).forEach((amenity, i) => {
        amenityString += amenity;
        if (i !== Object.values(amenityDict).length - 1) {
          amenityString += ', ';
        }
      });
      $('div.amenities > h4').text(amenityString);
    }
  })
});

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

$.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + '</div><div class="number_bathrooms">' + place.number_bathrooms + '</div></div><div class="description">' + place.description + '</div></article>');
      }
    }
  });
