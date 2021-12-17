/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    tweets.forEach((tw) => {
      let tweet = createTweetElement(tw);
      $('#tweets-container').prepend(tweet);
    });

  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`
    <article>
      <header>
        <div class = "user">
          <img src = "${tweet.user.avatars}"/ > 
          <span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <div class = "icons">
          <i class="fa-solid fa-flag flag"></i>
          <i class="fa-solid fa-share share"></i>
          <i class="fa-solid fa-heart heart"></i> 
        </div>
      </footer>
  </article>`);
  
    return $tweet;
  
  };

  $(".post-tweet").submit(function(event) {
    event.preventDefault();
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
      .then((data) => {});
  });

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET"
    })
      .then((data) => {
        renderTweets(data);
      });
  };
  loadTweets();
});

