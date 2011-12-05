$(function() {
  console.log("New Tweets Click loaded.")
  $("#page-container").on("click", "#new-tweets-bar", function() {
    console.log("New Tweets Bar clicked.");
    var last_new_tweet = $("#stream-items-id .last-new-tweet");
    $(window).scrollTop(last_new_tweet.offset().top - $(window).height() + last_new_tweet.outerHeight());
  });
});

