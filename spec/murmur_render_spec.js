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

Screw.Unit(function() {
  describe("MurmurRenderPipes", function() {
    var preference

    before(function() {
      preference = new Preference()
      preference.reset()
    })

    var render = function(content) {
      return MurmurRenderPipes.render(content)
    }

    it("should escape html tag", function() {
      expect(render("<h1>dddd</h1>")).to(equal, "&lt;h1&gt;dddd&lt;/h1&gt;")
    })

    it("should append cr with br", function() {        
      expect(render("sss\nxxx")).to(equal, "sss\n<br/>xxx")
    })

    it("should replace #ddd with card link", function() {
      preference.host("http://example.com")
      preference.project_id("n1")
      expect(render("fix bug #111.")).to(equal, 'fix bug <a class="card-number" href="http://example.com/projects/n1/cards/111">#111</a>.')
    })
    
    it("should extract mentions", function() {
      expect(render("RT @jay, @mike // this is cool")).to(equal, 'RT <span class="mention">@jay</span>, <span class="mention">@mike</span> // this is cool')
    })
    
    describe("substitue url", function(){
      it("should replace http://bla.bla with link", function(){
        link_html = 'this is <a href="http://phoenixchu.com">http://phoenixchu.com</a>'
        expect(render("this is http://phoenixchu.com")).to(equal, link_html)
        link_html = 'this is <a href="http://phoenixchu.com">http://phoenixchu.com</a> web site'
        expect(render("this is http://phoenixchu.com web site")).to(equal, link_html)
      })

      it("should replace https://bla.bla with link", function(){
        link_html = 'this is <a href="https://phoenixchu.com">https://phoenixchu.com</a>'
        expect(render("this is https://phoenixchu.com")).to(equal, link_html)
      })

      it('should replace special char in url', function(){
        link_html = 'this is <a href="http://phoenixchu.com?blog_id=3&page=1&icon=1#middle">http://phoenixchu.com?blog_id=3&page=1&icon=1#middle</a>'
        expect(render("this is http://phoenixchu.com?blog_id=3&page=1&icon=1#middle")).to(equal, link_html)
      })

      it('should replace nested url', function(){
        link_html = 'this is <a href="http://phoenixchu.com?blogs/blog_id=1">http://phoenixchu.com?blogs/blog_id=1</a>'
        expect(render("this is http://phoenixchu.com?blogs/blog_id=1")).to(equal, link_html)
      })
      
      it('should replace url with - + : %', function(){
        link_html = 'this is <a href="http://phoenixchu.com?blog_name=i-hate-gfw+stupidness:foolish%damn">http://phoenixchu.com?blog_name=i-hate-gfw+stupidness:foolish%damn</a>'
        expect(render("this is http://phoenixchu.com?blog_name=i-hate-gfw+stupidness:foolish%damn")).to(equal, link_html)
      })
      
      it('should match url starts with www', function(){
        link_html = 'this is <a href="www.phoenixchu.com">www.phoenixchu.com</a>'
        expect(render("this is www.phoenixchu.com")).to(equal, link_html)
      })

      it('should not be too greedy on link matching', function() {
        link_html = 'this is <a href="https://phoenixchu.com">https://phoenixchu.com</a>(haha)'
        expect(render("this is https://phoenixchu.com(haha)")).to(equal, link_html)
      })
    })
    // todo
    // it("should should not take nonesense as mentions", function() {
    //   expect(render("obama:a@localhost:8080")).to(equal, 'obama:a@localhost:8080')
    // })
    
  })
})
