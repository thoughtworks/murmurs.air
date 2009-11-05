$('a[href^=http]').live("click", function(event){
   event.preventDefault()
   air.navigateToURL(new air.URLRequest(this.href))
})