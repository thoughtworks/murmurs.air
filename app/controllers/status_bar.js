StatusBar = function() {
 var element = null
 
 return {
   init: function(el) {
     element = el
   },
   
   text: function(t) {
     element.text(t)
   }
 }
}()
 
