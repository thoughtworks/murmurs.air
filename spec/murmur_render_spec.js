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
      expect(render("fix bug #111.")).to(equal, 'fix bug <a href="http://example.com/projects/n1/cards/111">#111</a>.')
    })
    
    it("should extract mentions", function() {
      expect(render("RT @jay, @mike // this is cool")).to(equal, 'RT <span class="mention">@jay</span>, <span class="mention">@mike</span> // this is cool')
    })
    
    it("should replace http://bla.bla with link", function(){
      link_html = 'this is <a href="http://phoenixchu.com">http://phoenixchu.com</a>'
      expect(render("this is http://phoenixchu.com")).to(equal, link_html)
      link_html = 'this is <a href="http://phoenixchu.com">http://phoenixchu.com</a> web site'
      expect(render("this is http://phoenixchu.com web site")).to(equal, link_html)
    })
    
    it('should replace http://bla.bla?a=b', function(){
      link_html = 'this is <a href="http://phoenixchu.com?blog_id=3">http://phoenixchu.com?blog_id=3</a>'
      expect(render("this is http://phoenixchu.com?blog_id=3")).to(equal, link_html)
    })
    // todo
    // it("should should not take nonesense as mentions", function() {
    //   expect(render("obama:a@localhost:8080")).to(equal, 'obama:a@localhost:8080')
    // })
    
  })
})
