function inline_ragefaces() {
  $(".tweet-text a").each(function() {
    if ($(this).data("ultimateUrl") && $(this).data("ultimateUrl").match(/^http:\/\/ragefac.es\/(\d+)/) && !$(this).data("has_rageface")) {
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
    } else if ($(this).data("ultimateUrl") && !$(this).data("has_rageface") && !$(this).data("has_redirection")) {
      $(this).data("has_redirection", true);
      $(this).html($(this).data("ultimateUrl"));
    }
  })
}

$(function() {
  console.log("Display Ragefaces Inline loaded.")
  setInterval(inline_ragefaces, 2000);
})

