
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

$(document).ready (function() {
  $('.toTop').hide();
  $('.new-tweet').hide();
  let hidden = true;

  $(document).on('scroll', function () {

    let height = $(window).scrollTop()
    if(height > 520){
      $('.scroller').hide();
      $('.toTop').show();
    }
    
    if(height < 520) {
      $('.scroller').show();
      $('.toTop').hide();
    }
  })

  $('.toTop').on('click', function() {
    $('.new-tweet').slideDown( 500, 'swing', function(){$('.inputField').focus()})
    $('.new-tweet').focus()
    hidden = false;
    window.scrollTo(0,0 )
  })

  $(".scroller").click(function() {
    if(hidden === false) {
      $('.new-tweet').slideUp( 500, 'swing')
      hidden = true;
    } else {
      $('.new-tweet').slideDown( 500, 'swing', function(){$('.inputField').focus()})

      hidden = false;
    }
  });
}) 


