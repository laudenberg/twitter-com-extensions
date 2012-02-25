var options = {}

function hipster_loop() {
  get_options();

  $("#stream-items-id div.stream-item").each(function() {
    var stream_item = $(this);

    stream_item.find("p.js-tweet-text a").each(function() {
      if (option_is_set("show-ragefaces-inline") &&
          $(this).data("ultimateUrl") &&
          $(this).data("ultimateUrl").match(/^http:\/\/ragefac.es\/(\d+)/) &&
          !$(this).data("has_rageface")) {
        // ragefaces
        var elem = $(this);
        elem.data("has_rageface", true);
        console.log("starting xhr")
        $.get("http://ragefac.es/api/id/" + RegExp.$1, function(data) {
          console.log(data.items[0].face_filename);
          var parent = elem.parent();
          elem.detach();
          parent.append($("<div>").css("clear", "both"));
          parent.prepend(
            $("<div>").
            css("float", "right").
            html(elem.html($("<img>").attr("src", "http://ragefac.es/faces/thumb_" + data.items[0].face_filename + ".png")))
          );
        }, "json");
      } else if (option_is_set("unshorten-urls") &&
                 $(this).data("ultimateUrl") &&
                 !$(this).data("has_rageface") &&
                 !$(this).data("has_redirection")) {
        // redirection
        $(this).data("has_redirection", true);
        $(this).html($(this).data("ultimateUrl"));
      }
    });

    if (option_is_set("switch-names")) {

      // name
      if (!stream_item.data("has_name_changed")) {
        var user_profile_link = stream_item.find("div.stream-item-header a.js-user-profile-link");
        var fullname = user_profile_link.find(".fullname");
        var username = user_profile_link.find(".username");
        var tmp = fullname.html();
        fullname.html(username.html().replace(/<[^>]+>/g, "").replace(/\s/g, ""));
        username.html(tmp);
        stream_item.data("has_name_changed", true);
      }

      // retweet name
      if (!stream_item.data("has_retweet_name_changed")) {
        var user_profile_link = stream_item.find("div.stream-item-footer a.js-user-profile-link");

        if (user_profile_link.length) {
          user_profile_link.html("<b>@" + user_profile_link.attr("href").substring(4) + " <b>(" + user_profile_link.html() + ")");
        }

        stream_item.data("has_retweet_name_changed", true);
      }

    }

  });

}

$(function() {
  console.log("Hipster Twitter loaded.")
  setInterval(hipster_loop, 2000);

  $("#page-container").on("click", ".new-tweets-bar", function() {

    if (option_is_set("new-tweets-scroll")) {
      console.log("New Tweets Bar clicked.");
      var last_new_tweet = $("#stream-items-id .last-new-tweet");

      if (last_new_tweet.length > 0) {
        last_new_tweet.addClass("before-expanded").css("margin-bottom", "8px").next().addClass("after-expanded");
        $(window).scrollTop(last_new_tweet.offset().top - $(window).height() + last_new_tweet.outerHeight());
      }

    }

  });

});

function get_options() {
  chrome.extension.sendRequest({}, function(response) {
    options = response;
  });
}

function option_is_set(option) {
  return options[option] == "true";
}

