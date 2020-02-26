/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


const createTweetElement = (tweetData) => {
  let $tweet = $(`
  <article class='old-tweet'>
          <header>
            <img class='profile-pic' src="${tweetData['user']['avatars']}" alt=""> ge</img>
            <p2 class='name' >${tweetData['user']['name']}</p2>
            <p2 class='name-id'>${tweetData['user']['handle']}</p2>
          </header>
          <p class='body'> 
            ${tweetData['content']['text']}
          </p>
          <footer >
            <h6 class='tweet-date'>${tweetData['user']['created_at']}</h6>
            <img name='tweet-icons' src="" alt="">test </img>
          </footer>

        </article> `).addClass('tweet');

  return $tweet
}


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.