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
  var account = window.params['account']
  var init_content = window.params['content']
  var callback = window.params['after_post']
  var new_murmur = new Murmur(account)
  var murmurs_service = new MurmursService(account)

  var post = function() {
    murmurs_service.post(new_murmur, function() { 
      if (callback) {
        callback(new_murmur)
      }
      window.close() 
    })
  }
  
  $("button.post").click(post)

  $("textarea").change(function() { new_murmur.content(this.value) })
  $("textarea").focus()

  if(init_content){
    $("textarea").text(init_content)
  }
};

PostController.open = function(account, options) {
  var post_win = window.open("/app/views/post.html")
  post_win.resizeTo(400, 150)
  post_win.params = options
  post_win.params["account"] = account
  return post_win
}