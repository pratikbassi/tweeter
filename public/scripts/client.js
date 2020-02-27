/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


const createTweetElement = (tweetData) => {
  let date = new Date(tweetData['created_at'])

  let $tweet = `
  <article class='old-tweet'>
          <header>
            <img class='profile-pic' src="${tweetData['user']['avatars']}" alt=""> </img>
            <p2 class='name' >${tweetData['user']['name']}</p2>
            <p2 class='name-id'>${tweetData['user']['handle']}</p2>
          </header>
          <p class='body'> 
            ${escape(tweetData['content']['text'])}
          </p>
          <footer >
            <h6 class='tweet-date'>${date.toString()}</h6>
            <img name='tweet-icons' src="" alt="">test </img>
          </footer>

        </article> `;
  return $tweet
}

const renderTweets = (tweets) => {
  $('#tweets-container').empty()
  for(let tweet of tweets.reverse()) {
    $('#tweets-container').append(createTweetElement(tweet))
  }

  let $button = $('.submitTweet');
  const $text = $('.inputField')
  $button.on('click', function() {
    if ($('.new-tweet').find('.counter').text() >= 0) {
      $('.new-tweet').find('.counter').text(140);
      $text.val(function() {return '';})
    }
  })

}

const loadTweets = () => {

  let promise = new Promise ((resolve, reject) => {
      $(document).ready( () => {
        $.ajax({
          type: 'GET',
          url: '/tweets/'
        })
        .then( (data) => {
          resolve(data);
        })
      })
    }
  ) 
  promise.then( (data) => {
    return(data);
  } ).catch( (reason) => {
    console.log(reason);
  })

  return promise;
}

$(document).ready (function() {
  let hidden = false;

  $(".scroller").click(function() {
    if(hidden === false) {
      $('.new-tweet').slideUp( 500, 'swing')
      hidden = true;
    } else {
      $('.new-tweet').slideDown( 500, 'swing')
      hidden = false;
    }
  });
}) 




$(document).ready( function(){
  const $button = $('.submitTweet');
  let $text = $('.inputField')

  $button.on('click', function () {
    event.preventDefault()    
    if($text.val().length < 141 && $text.val().length > 0) {
      $.ajax({
        type: 'POST',
        url: '/tweets/',
        data: $text.serialize()
      })
      .done( function() {
        loadTweets().then( (data2) => { renderTweets(data2)})
      }
        
      )
      

    } else if ($text.val().length > 140) {
      alert("The text field is too full!")
    } else {
      alert('The field is empty!')
    }
    
  })

})
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str))
  return div.innerHTML
}

$(document).ready(function() {
  loadTweets().then( (data) => {renderTweets(data)} );
})


 
