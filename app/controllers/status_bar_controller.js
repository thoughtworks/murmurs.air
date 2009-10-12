StatusBarController = function() {
 var container
 
 var public = {
   init: function(element) {
     container = element
   },
   
   text: function(t) {
     $(".info-panel", container).text(t)
   }
 }
 
 return public
}()
 
