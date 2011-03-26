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
  describe("Murmur", function() {
    var account
    var current_user
    
    var without_user_current = function(expect) {
      var backup = account.current_user
      try {
        account.current_user = function() { return null }
        expect()
      } finally {
        account.current_user = backup          
      }
    }
    
    before(function() {
      account = new Account();
      current_user = new User()
      current_user.name('wang pengchao')
      current_user.login('wpc')
      account.current_user = function() { return current_user }
    })

    describe("a murmur can tell author info", function() {
      var m
      
      before(function() {
        m = new Murmur(account, 1)
      })
      
      it("should be author's info if provided", function() {
        m.author({name: 'name', login: 'login', icon_path: 'author icon'})
        m.jabber_user_name("jabber")
        expect(m.author_name()).to(equal, 'name')
        expect(m.author_icon()).to(equal, 'author icon')
      })
      
      it("should be jabber user's info if can not get author info", function() {
        m.jabber_user_name("jabber")
        expect(m.author_name()).to(equal, 'jabber (jabber)')
        expect(m.author_icon()).to(be_null)
      })
      
      it("author_name should be null when both author and jabber name are absent", function() {
        expect(m.author_name()).to(be_null)        
        expect(m.author_icon()).to(be_null)        
      })
      
    })
    
    
    describe("a murmur can detect mentions", function() {
      var murmur_with_mention
      var murmur_without_mention
      before(function() {
        murmur_with_mention = new Murmur(account, 1)
        murmur_with_mention.content('@space @bug hello there @wpc')
        
        murmur_without_mention = new Murmur(account, 2)
        murmur_without_mention.content('no mention wpc')
      })

      it("when username is different case", function() {
        current_user.login('WpC')
        expect(murmur_with_mention.mentions_current_user()).to(equal, true)
      })
      
      it("when form is @login", function() {
        current_user.login('wpc')
        expect(murmur_with_mention.mentions_current_user()).to(equal, true)
      })
      
      it("unless current user can not be detected", function() {
        without_user_current(function() {
          expect(murmur_with_mention.mentions_current_user()).to(equal, false)
        })
      })
      
      it("unless there is no @ symbol", function() {
        current_user.login('wpc')
        expect(murmur_without_mention.mentions_current_user()).to(equal, false)
      })
      
      it("when form is @first_part_of_display_name", function() {
        current_user.login("mike")
        current_user.name("space garbage")
        expect(murmur_with_mention.mentions_current_user()).to(equal, true)
      })
      
      it("when form is @last_part_of_display_name", function() {
        current_user.login("mike")
        current_user.name("yucky bug")
        expect(murmur_with_mention.mentions_current_user()).to(equal, true)
      })
      
      it("unless they only begin with username", function() {
        current_user.login("wp")
        expect(murmur_with_mention.mentions_current_user()).to(equal, false)
      })
      
      it("when they end with a non-word character", function() {
        current_user.login('maleksiu')
        current_user.name('space baby')
        murmur_with_mention.content("@space: what's up?")
        expect(murmur_with_mention.mentions_current_user()).to(equal, true)
      })
    })
    
    describe("#from_current_user", function() {
      
      var murmur_by = function(author) {
        var m = new Murmur(account, 1)
        m.author(author)
        return m
      }
      
      describe("when murmur author are same with current user", function() {
        it("is from_current_user", function() {
          expect(murmur_by({login: 'wpc'}).from_current_user()).to(be_true)
        })
      })
      
      describe("when murmur author are others", function() {
        it("is not from_current_user", function() {
          expect(murmur_by({login: 'mike'}).from_current_user()).to(be_false)
        })
      })
      
      describe("when can not decide who is current user", function() {
        it("is not from_current_user", function() {
          without_user_current(function() {
            expect(murmur_by({login: 'wpc'}).from_current_user()).to(be_false)
          })
        })
      })
      
      describe("when murmur has no author", function() {
        it("is not from_current_user", function() {
          expect(murmur_by().from_current_user()).to(be_false)
        })
      })
    })

    
    describe("murmur is blank when", function() {
      it("content is null", function() {
        var murmur = new Murmur(account, 1)
        expect(murmur.blank()).to(be_true)
      })
      
      it("content is empty string", function() {
        var murmur = new Murmur(account, 1)
        murmur.content("")
        expect(murmur.blank()).to(be_true)
      })
      
      it("content only contain spaces", function() {
        var murmur = new Murmur(account, 1)
        murmur.content("    ")
        expect(murmur.blank()).to(be_true)
      })
      
      it("content only contain cr or spaces", function() {
        var murmur = new Murmur(account, 1)
        murmur.content("  \n  ")
        expect(murmur.blank()).to(be_true)
      })
      
    })
    
    describe("remurmur", function(){
      it("to valide author", function(){
        var murmur = new Murmur(account, 1)
        murmur.author({login : 'phoenix'})
        murmur.content('hi')
        expect(murmur.remurmur()).to(equal, 'RM @phoenix: hi // ')
      })
      
      it("to valide jabber user name", function(){
        var murmur = new Murmur(account, 1)
        murmur.jabber_user_name('phoenix')
        murmur.content('hi')
        expect(murmur.remurmur()).to(equal, 'RM @phoenix: hi // ')
      })
    })
    
    describe("reply", function(){
      it("valid user login", function(){
        var murmur = new Murmur(account, 1)
        murmur.author({login : 'phoenix'})
        expect(murmur.reply()).to(equal, '@phoenix ')
      })
      
      it("valid user jabber user name", function(){
        var murmur = new Murmur(account, 1)
        murmur.jabber_user_name('phoenix')
        expect(murmur.reply()).to(equal, '@phoenix ')
      })
    })
    
    
  })
})