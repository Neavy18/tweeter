/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $(".post-tweet").submit(function(event) { 
    event.preventDefault(); 
    $(".errMessage").slideUp(1000);
    const tweetLength = event.target[0].value.length;
      if (!tweetLength || tweetLength > 140) {
      return detectError(tweetLength);
    }
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
      .then((data) => {
        loadTweets();
        $("#tweet-text").val('');
        $(".counter").val(140); 
      });
  });

  const createTweetElement = function(tweet) {
    let $tweet = $(`
    <article>
      <header>
        <div class = "user">
          <img class = "avatar" src = "${tweet.user.avatars}"/ > 
          <span>${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
      <p> ${escape(tweet.content.text)}</p>
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

  const renderTweets = function(tweets) {
    tweets.forEach((tw) => {
      let tweet = createTweetElement(tw);
      $('#tweets-container').prepend(tweet);
    });

  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const detectError = function(tweet) {
    let errorMsg = undefined;
    if (!tweet) {
      errorMsg = "Please make sure to be tweetin' about something!";
    }
    if (tweet > 140) {
      errorMsg = "Please respect our arbitrary number of 140 characters! #kthxbye";
    }
    return $errorMessage(errorMsg).appendTo(".error-container").hide().slideDown(1000);
  };

  const $errorMessage = function(message) {
    let $errMsg = $(`
    <div class="errMessage">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h4>${message}</h4>
      <i class="fa-solid fa-triangle-exclamation"></i>
    </div>`);  
    return $errMsg;
  };

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

