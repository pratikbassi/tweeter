
$(document).ready(function() {
  $('.new-tweet').on('input', function() {
    let currentText = $(this).find('textarea').val().length;
    $(this).find('.counter').text(140 - currentText);
    if (140 - currentText < 0) {
      $($(this).find('.counter')).css('color', 'red')
    } else {
      $($(this).find('.counter')).css('color', '#424038')
    }
    }) 
})




// $($($(this).children()[1]).children()).children()[0] gets counter html tag