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
      
      it("should extract author when it exists", function() {
        var authors = $.invoke(murmurs, 'author')
        expect(authors[0].name).to(equal, 'wpc')
        expect(authors[0].login).to(equal, 'wpc')
      })
    })
    
    describe("a valid murmur can detect mentions", function() {
      var murmur_with_mention
      var murmur_without_mention
      before(function() {
        murmur_with_mention = new Murmur(1)
        murmur_with_mention.content('hello there @wpc')
        
        murmur_without_mention = new Murmur(2)
        murmur_without_mention.content('no mention wpc')
      })
      
      it("should be case insensitive", function() {
        expect(murmur_with_mention.mentions_user('WpC')).to(equal, true)
      })
      
      it("should be in form @xxx", function() {
        expect(murmur_with_mention.mentions_user('wpc')).to(equal, true)
        expect(murmur_without_mention.mentions_user('wpc')).to(equal, false)
      })
      
      it("should only find user xyz if mention is @xyz", function() {
        expect(murmur_with_mention.mentions_user('qianqian')).to(equal, false)
      })
      
    })
    
    describe("murmur is blank when", function() {
      it("content is null", function() {
        var murmur = new Murmur(1)
        expect(murmur.blank()).to(be_true)
      })
      
      it("content is empty string", function() {
        var murmur = new Murmur(1)
        murmur.content("")
        expect(murmur.blank()).to(be_true)
      })
      
      it("content only contain spaces", function() {
        var murmur = new Murmur(1)
        murmur.content("    ")
        expect(murmur.blank()).to(be_true)
      })
      
      it("content only contain cr or spaces", function() {
        var murmur = new Murmur(1)
        murmur.content("  \n  ")
        expect(murmur.blank()).to(be_true)
      })
      
    })
    
    describe("remurmur", function(){
      it("to valide author", function(){
        var murmur = new Murmur(1)
        murmur.author({login : 'phoenix'})
        murmur.content('hi')
        expect(murmur.remurmur()).to(equal, 'RM @phoenix: hi // ')
      })
      
      it("to valide jabber user name", function(){
        var murmur = new Murmur(1)
        murmur.jabber_user_name('phoenix')
        murmur.content('hi')
        expect(murmur.remurmur()).to(equal, 'RM @phoenix: hi // ')
      })
    })
    
    
  })
})