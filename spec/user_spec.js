Screw.Unit(function() {
  describe("User", function() {
    describe("parsing user from xml", function() {
      var users
      before(function() {
        var parser = new DOMParser()
        var doc = parser.parseFromString('<?xml version="1.0" encoding="UTF-8"?>\
        <users type="array">\
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
        </users>\
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
    
  })
})