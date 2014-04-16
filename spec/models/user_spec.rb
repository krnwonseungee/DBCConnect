require 'spec_helper'

describe User do

  context "associations" do
    it { should belong_to(:cohort) }
  end

  context "looking up oauth response in db" do
    let(:auth_hash) { OmniAuth.config.mock_auth[:linkedin] }
    # The omniauth auth_hash is created in spec_helper,
    # so has to be a set string (the 'moniauth.test/in/faked_user')
    user = FactoryGirl.create(:user, name: "Om Niauth", linked_in: "omniauth.test/in/faked_user")
    good_url  = user.linked_in
    bad_url = "www.invalidurl.edu"
    it "returns the correct user when given valid input" do
      puts "$" * 999
      puts "mock auth_hash is:"
      p auth_hash
      puts "$" * 999

      #see: http://natashatherobot.com/rails-test-omniauth-sessions-controller/
      expect(User.lookup_from_auth_hash({linkedin_url: good_url})).to eq user
    end
    it "returns false when there's no lookup match" do
      expect(User.lookup_from_auth_hash(linkedin_url: bad_url)).to be nil
    end
  end
end
