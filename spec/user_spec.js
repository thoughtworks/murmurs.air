Screw.Unit(function() {
  describe("User", function() {
    describe("parsing user from xml", function() {
      var users
      before(function() {
        var parser = new DOMParser()
        var doc = parser.parseFromString('<?xml version="1.0" encoding="UTF-8"?>\
        <projects_members>\
          <projects_member>\
            <id type="integer">10262</id>\
            <admin type="boolean">false</admin>\
            <readonly_member type="boolean">true</readonly_member>\
            <user>\
              <id type="integer">2</id>\
              <name>Sarah</name>\
              <login>s</login>\
              <email>sarah@mailinator.com</email>\
              <light type="boolean">false</light>\
              <icon_path>/user/icon/2/PurpGuy.gif</icon_path>\
              <activated type="boolean">true</activated>\
              <admin type="boolean">true</admin>\
              <version_control_user_name nil="true"></version_control_user_name>\
              <jabber_user_name>suzie_tester</jabber_user_name>\
            </user>\
            <project url="https://mingle09.thoughtworks.com/api/v2/projects/mingle.xml">\
              <name>Mingle</name>\
              <identifier>mingle</identifier>\
            </project>\
          </projects_member>\
          <projects_member>\
            <id type="integer">10263</id>\
            <admin type="boolean">true</admin>\
            <readonly_member type="boolean">false</readonly_member>\
            <user>\
              <id type="integer">1</id>\
              <name>TW</name>\
              <login>tworker</login>\
              <email>\
              </email>\
              <light type="boolean">false</light>\
              <icon_path nil="true"></icon_path>\
              <activated type="boolean">true</activated>\
              <admin type="boolean">true</admin>\
              <version_control_user_name nil="true"></version_control_user_name>\
              <jabber_user_name nil="true"></jabber_user_name>\
            </user>\
            <project url="https://mingle09.thoughtworks.com/api/v2/projects/mingle.xml">\
              <name>Mingle</name>\
              <identifier>mingle</identifier>\
            </project>\
          </projects_member>\
        </projects_members>\
        ', "text/xml")
        users = User.parse_collection(doc)
      })
      
      it("should extract id", function() {
        expect($.pluck(users, 'id')).to(equal, [2, 1])
      })
      
      it("should extract login", function() {
        expect($.invoke(users, 'login')).to(equal, ['s', 'tworker'])
      })
      
      it("should extract name", function() {
        expect($.invoke(users, 'name')).to(equal, ['Sarah', 'TW'])
      })
    })
    
    describe("keywords used for mentions", function() {
      it("should include login and all words in name", function() {
        user = new User()
        user.login('the_login')
        user.name('the name')
        expect(user.possible_mention_strings()).to(equal, ['the_login', 'the', 'name'])
      })
    })
  })
})