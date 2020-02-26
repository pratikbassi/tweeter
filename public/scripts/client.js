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
            ${tweetData['content']['text']}
          </p>
          <footer >
            <h6 class='tweet-date'>${date.toString()}</h6>
            <img name='tweet-icons' src="" alt="">test </img>
          </footer>

        </article> `;
  return $tweet
}

const renderTweets = (tweets) => {
  for(let tweet of tweets.reverse()) {
    $('#tweets-container').append(createTweetElement(tweet))
  }
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
    //console.log(data)
    return(data);
  } ).catch( (reason) => {
    console.log(reason);
  })

  return promise;
}



$(document).ready( function(){
  const $button = $('.submitTweet');
  //$button.preventDefault();
  const $text = $('.inputField')
  $button.on('click', function () {
    $.ajax({
      type: 'POST',
      url: '/tweets/',
      data: $text.serialize()
    })
  })

})





$(document).ready(function() {
  loadTweets().then( (data) => {renderTweets(data)} );
})


 
