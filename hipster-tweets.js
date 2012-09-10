var options = {}

function switch_names(tweet) {
  if (!option_is_set("switch-names"))
    return;

  // name
  if (!tweet.data("has_name_changed")) {
    var user_profile_link = tweet.find("div.stream-item-header a.js-user-profile-link");
    var fullname = user_profile_link.find(".fullname");
    var username = user_profile_link.find(".username");
    var tmp = fullname.html();
    fullname.html(username.html().replace(/<[^>]+>/g, "").replace(/\s/g, ""));
    username.html(tmp);
    tweet.data("has_name_changed", true);
  }

  // retweet name
  if (!tweet.data("has_retweet_name_changed")) {
    var user_profile_link = tweet.find("div.stream-item-footer a.js-user-profile-link");

    if (user_profile_link.length) {
      var user_profile_href = user_profile_link.attr("href"); 
      var user_name = user_profile_href.substring(user_profile_href.lastIndexOf("/") +  1);
      user_profile_link.html("<b>@" + user_name + " <b>(" + user_profile_link.html() + ")");
    }

    tweet.data("has_retweet_name_changed", true);
  }

}

function show_rageface_inline(link) {
  if (true ||
      !option_is_set("show-ragefaces-inline") ||
      !link.data("ultimateUrl") ||
      !link.data("ultimateUrl").match(/^http:\/\/ragefac.es\/(\d+)/) ||
      link.data("has_rageface"))
    return;

  link.data("has_rageface", true);
  console.log("starting xhr");

  $.get("http://ragefac.es/api/id/" + RegExp.$1, function(data) {
    console.log(data[0][0].image_filename);
    var parent = link.parent();
    link.detach();
    parent.append($("<div>").css("clear", "both"));
    parent.prepend(
      $("<div>").
      css("float", "right").
      html(link.html($("<img>").attr("src", "http://ragefaces.s3.amazonaws.com/" + data[0][0]._id + "/thumb_" + data[0][0].image_filename + ".png")))
    );
  }, "json");

}

function unshorten_url(link) {
  if (!option_is_set("unshorten-urls") ||
      !link.data("ultimateUrl") ||
      link.data("has_rageface") ||
      link.data("has_redirection"))
    return;
  link.data("has_redirection", true);
  link.html(link.data("ultimateUrl"));
}

function process_tweet(tweet) {
  tweet.find("p.js-tweet-text a").each(function() {
    show_rageface_inline($(this));
    unshorten_url($(this));
  });

  switch_names(tweet);
  tweet.addClass("processed");
}

function hipster_loop() {
  get_options();

  // process tweets that are offscreen
  $("#offscreen").find(".stream-item").each(function() {
    process_tweet($(this));
    console.log("process")
  });

  // send offscreen tweets to timeline
  var offscreen_height = $("#offscreen").outerHeight();
  $("#offscreen").find(".stream-item").each(function() {
    $("#stream-items-id").prepend($(this));
    console.log("prepend");
  });
  $(document).scrollTop($(document).scrollTop() + offscreen_height);

  // send new tweets offscreen
  $("#stream-items-id .stream-item").not(".processed").each(function() {
    $("#offscreen").prepend($(this));
  });

  // click new tweets button
  $(".new-tweets-bar").click();
}

$(function() {
  console.log("Hipster Tweets loaded.")
  get_options();
  $("<div id='offscreen'></div>").appendTo("body");

  // give the page some time to settle
  setTimeout(function() {
    
    $("#stream-items-id .stream-item").each(function() {
      console.log("hello?");
      process_tweet($(this));
    });

    $("body").addClass("hipster-tweets-loaded");
    setInterval(hipster_loop, 1000);
  }, 5000);


  // $("#page-container").on("click", ".new-tweets-bar", function() {

  //   if (option_is_set("new-tweets-scroll")) {
  //     console.log("New Tweets Bar clicked.");
  //     var last_new_tweet = $("#stream-items-id .last-new-tweet");

  //     if (last_new_tweet.length > 0) {
  //       // last_new_tweet.addClass("before-expanded").css("margin-bottom", "8px").next().addClass("after-expanded");
  //       $(window).scrollTop(last_new_tweet.offset().top - $(window).height() + last_new_tweet.outerHeight());
  //     }

  //   }

  // });
});

function get_options() {
  chrome.extension.sendRequest({}, function(response) {
    options = response;
  });
}

function option_is_set(option) {
  return options[option] == "true";
}

