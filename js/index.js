 // execute code after document has loaded
$(document).ready(function() {
  
  // initialize global array of all users you want to search
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

   // url used to check streams for all users
   // NOTE: twitch api will only return streams for users that are currently online and live
   // as a result, second JSON call comes later in code for users that are offline
   var url = "https://api.twitch.tv/kraken/streams?channel=ESL_SC2, OgamingSC2,cretetion,freecodecamp,storbeck,habathcx,RobotCaleb,noobs2ninjas&client_id=uoxr3607rgh8dhn3ybwc0lnd2ikltx";
  
  // make JSON request
  $.getJSON(url, function(response) {
    
    // to access key-value pairs, need to dig into an array within "streams"
    // this variable will be used to access that array
    var results = response.streams;
  
    // iterate through the JSON results
    for (var i = 0; i < results.length; i++) {
      
      // url to user's Twitch page
      var link = results[Object.keys(results)[i]].channel.url;
    
      // Twitch user's logo
      var logo = results[Object.keys(results)[i]].channel.logo;
      
      // Twitch user's name
      var name = results[Object.keys(results)[i]].channel.display_name;
    
      // game they're playing
      var game = results[Object.keys(results)[i]].channel.game;
    
      // construct HTML to be added to webpage
      var html = '<div class="row"><div class="col-xs-3"></div><div class="col-xs-3 act"><img src="' + logo + '"/><a href="' + link + '" target="_blank">' + name + '</a></div><div class="col-xs-3 act desc">' + game + '</div></div>';
      
      // append HTML to webpage
      $(html).appendTo("#result");    
      
      // if user is online, we want to delete them from our array to be used for later JSON call
      var x = users.indexOf(name);
      
      // delete online user from array to be used for later JSON call
      users.splice(x, 1);
      
  } // close for-loop
  
  // iterate through offline users
  for (var j = 0; j < users.length; j++) {
    
    // name of user [j] in array
    var name2 = users[j];
    
    // url for JSON call on individual
    // in order to get logo info, non-active users must be called with a different url, one at a time
    // such is the Twitch API
    var url2 = "https://api.twitch.tv/kraken/channels/" + name2 + "?client_id=uoxr3607rgh8dhn3ybwc0lnd2ikltx";
    
    // get JSON for offline users
    $.getJSON(url2, function(data) {
    
      // user's Twitch url
      var link2 = data.url;
    
      // user's Twitch logo
      var logo2 = data.logo;
    
      // user's display name
      // though name2 is defined earlier as the user's name, it needs to be redefined or else it doesn't work
      // don't know why, but since it works like this this is how I kept it
      var name2 = data.display_name;
          
      // construct HTML of offline users
      var remaining = '<div class="row"><div class="col-xs-3"></div><div class="col-xs-3 inact"><img src="' + logo2 + '"/><a href="' + link2 + '" target="_blank">'+ name2 +'</a></div><div class="col-xs-3 inact desc2"><i>Offline</i></div></div>';
    
      // append HTML to webpage
      $(remaining).appendTo("#result");
    
    }); // close JSON call for offline users
    
  } // close loop
    
}); // close first JSON call function
    // attempted to close this first JSON call prior to beginning of second JSON call, but that resulted in a bug
    // I don't know why this works, but since it does this is how I kept it

// when "ONL" is clicked
$("#online").on("click", function() {
   
  // hide offline users
  $(".inact").hide();
   
  // show online users
  $(".act").show();
   
}); // close function
  
// when "OFF" is clicked
$("#offline").on("click", function() {
  
  // hide online users
  $(".act").hide();
  
  // show offline users
  $(".inact").show();

}); // close function

// when "ALL" is clicked
$("#all").on("click", function() {
  
  // show all
  $(".act").show();
  $(".inact").show();

}); // close function

}); // close (document).ready function