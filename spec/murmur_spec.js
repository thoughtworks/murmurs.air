Screw.Unit(function() {
  describe("Murmur", function() {
    describe("parsing murmur from xml", function() {
      var murmurs
      before(function() {
        var parser = new DOMParser()
        var doc = parser.parseFromString('<?xml version="1.0" encoding="UTF-8"?> \
        <murmurs type="array"> \
          <murmur> \
            <id type="integer">118</id>\
            <author>\
              <id type="integer">638</id>\
              <name>wpc</name>\
              <login>wpc</login>\
              <email>\
              </email>\
              <light type="boolean">false</light>\
              <icon_path>/user/icon/638/wpc_copy.jpg</icon_path>\
            </author>\
            <body>hello</body>\
            <created_at type="datetime">Sun Sep 27 14:50:34 UTC 2009</created_at>\
            <jabber_user_name nil="true"></jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur>\
            <id type="integer">119</id>\
            <author nil="true"></author>\
            <body>hello</body>\
            <created_at type="datetime">Wed Sep 30 02:50:04 UTC 2009</created_at>\
            <jabber_user_name>admin</jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
          <murmur>\
            <id type="integer">120</id>\
            <author nil="true"></author>\
            <body>where is the dirty star?</body>\
            <created_at type="datetime">Wed Sep 30 02:50:16 UTC 2009</created_at>\
            <jabber_user_name>admin</jabber_user_name>\
            <is_truncated type="boolean">false</is_truncated>\
          </murmur>\
        ', "text/xml")
        murmurs = Murmur.parse_collection(doc)
      })
      
      it("should extract id", function() {
        expect($.pluck(murmurs, 'id')).to(equal, [118, 119, 120])
      })
      
      it("should extract content", function() {
        expect($.invoke(murmurs, 'content')).to(equal, ['hello', 'hello', 'where is the dirty star?'])
      })
      
      it("should extract created at", function() {
        expect($.invoke(murmurs, 'created_at')).to(equal, ['Sun Sep 27 14:50:34 UTC 2009', 'Wed Sep 30 02:50:04 UTC 2009', 'Wed Sep 30 02:50:16 UTC 2009'])
      })
      
      it("should extract author name when it exists", function() {
        var authors = $.invoke(murmurs, 'author')
        expect(authors[0].name).to(equal, 'wpc')
      })
    })
    
    describe("when you have a valid murmur", function() {
      var murmurWithMention
      var murmurWithoutMention
      before(function() {
        murmurWithMention = new Murmur('one')
        murmurWithMention.content('hello there @wpc')
        
        murmurWithoutMention = new Murmur('two')
        murmurWithoutMention.content('no mention wpc')
      })
      
      it("should know when murmur mentions user", function() {
        expect(murmurWithMention.mentions_user('wpc')).to(equal, true)
        expect(murmurWithMention.mentions_user('WpC')).to(equal, true)
        expect(murmurWithoutMention.mentions_user('wpc')).to(equal, false)
        expect(murmurWithMention.mentions_user('qianqian')).to(equal, false)
      })
    })
    
  })
})