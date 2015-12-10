// RestHelper simplifies REST requests and keeps AJAX out of app logic
var $ = require('jquery');

module.exports = {
  get: function(url){
    return new Promise(function(success, error){
      $.ajax({
        url: url,
        dataType: "json",
        success: success,
        error: error
      })
    })
  },
  post: function(url, data){
    return new Promise(function(success, error){
      $.ajax({
        url: url,
        data: data,
        type: "POST",
        success: success,
        error: error
      })
    })
  },
  patch: function(url, data){
    return new Promise(function(success, error){
      $.ajax({
        url: url,
        data: data,
        type: "PATCH",
        success: success,
        error: error
      })
    })
  },
  del: function(url){
    return new Promise(function(success, error){
      $.ajax({
        url: url,
        type: "DELETE",
        success: success,
        error: error
      })
    })
  }
};
