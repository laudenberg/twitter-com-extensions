$("#new-tweets-bar").live("click", function() {
  console.log("New Tweets Bar clicked.");
  var last_new_tweet = $("#home-stream-manager .last-new-tweet");
  $(window).scrollTop(last_new_tweet.offset().top - $(window).height() + last_new_tweet.outerHeight());
});

