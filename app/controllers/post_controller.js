/*
 * Copyright 2009 ThoughtWorks, Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

PostController = function() {
  var new_murmur = new Murmur()
  
  var public = {
    init: function() {
      $("button.post").click(public.post)
      $("textarea").change(function() {
        new_murmur.content(this.value)
      })
      $("textarea").focus()

      if(window.params && window.params['init_content']){
        $("textarea").text(window.params['init_content'])
      }
    },
    
    open: function(params) {
      var post_win = window.open("/app/views/post.html")
      post_win.resizeTo(400, 150)
      post_win.params = params
    },
    
    post: function() {
      MurmursService.post(new_murmur, function() {
        window.opener.TimelineController.refresh()
        window.close()
      })
    }
  }
  
  return public
}()