/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


const createTweetElement = (tweetData) => {
  let date = tweetData['created_at']
  let daysPassed = Math.round((Date.now() - date) / 86400000)
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
            <h6 class='tweet-date'>${daysPassed} Days Ago</h6>
            <p3 class='tweet-icons' >🏳♺ 🤍 </p3>
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


$(document).ready( function(){
  $('.alert').hide();
  const $button = $('.submitTweet');
  let $text = $('.inputField')

  let sassyEmpty = ['This is empty!', 'Come on, put something in here!', 'Only boring people don\'t put anything in their tweets!', 'What are you, lame? Put something in here', 'You tried to tweet nothing! That\'s boring!', "This error message was specially made to tell you to put something in this tweet!", "I didn't get paid to make this site! You clearly didn't get paid to write!"];
  let sassyFull = ['This is too full! Less than 141 characters pls thx', 'Ugh, I feel too full - just like thanksgiving', 'No mom, I don\'t want any more characters!', 'I\'m gonna pop! Take some characters out!', 'You\'re not thaaaaat interesting bub, take some chars out', 'A wise man once said:"Tweets were made to be shorter than 140 chars"',"Less characters, more time for other activities! It's a win-win!" ];

  $button.on('click', function () {
    event.preventDefault()    
    if($text.val().length < 141 && $text.val().length > 0) {
      $('.alert').slideUp( 300, 'swing')
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
      $('.alert').text(`${sassyFull[Math.floor(Math.random() * sassyFull.length)]}`)
      $('.alert').slideDown( 500, 'swing')
      
    } else {
      $('.alert').text(`${sassyEmpty[Math.floor(Math.random() * sassyEmpty.length)]}`)
      $('.alert').slideDown( 500, 'swing')
    
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


 
