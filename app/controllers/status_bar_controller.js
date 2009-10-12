StatusBarController = function() {
 var element = null
 
 var public = {
   init: function(el) {
     element = el
   },
   
   text: function(t) {
     element.text(t)
   }
 }
 
 return public
}()
 
