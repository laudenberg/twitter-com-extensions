var options = ["new-tweets-scroll", "switch-names", "unshorten-urls", "show-ragefaces-inline"];

$(function() {

  $.each(options, function(i, option) {

    if (localStorage[option] === undefined)
      localStorage[option] = true;

  });
  
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var response = {};
    
    $.each(options, function(i, option) {
      response[option] = localStorage[option];      
    });
    
    sendResponse(response);
  });
  
});
