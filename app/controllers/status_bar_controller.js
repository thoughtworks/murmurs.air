StatusBarController = function() { 
  
  var set_info = function(element, text) {
    $(".info-panel", element).text(text)
  } 
  
  return {
   init: function(element) {
     element.bind("ajaxSend", function(){
       set_info(element, "request sending to server")
     }).bind("ajaxSuccess", function(){
       set_info(element, "")
     }).bind("ajaxError", function(event, xhr, options, error) {
       if(error) {
         set_info(element, error.message)
       } else {
         set_info(element, "error code: " + xhr.status)         
       }
     })
   }
 }
}()
 
