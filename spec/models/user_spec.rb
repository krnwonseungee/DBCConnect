require 'spec_helper'

describe User do
  context "associations" do
    it { should have_many(:requestors) }
    it { should have_many(:responders) }
    it { should belong_to(:cohort) }
  end

  context "matching oauth return to db" do
    good_url  = "www.validurl.edu"
    bad_url = "www.invalidurl.me"
    before(:each) do
      target_user = User.create(name: "Charles Dickens", linked_in: good_url)
      puts "CREATED A USER FOR TEST"
      p target_user
    end

    after(:each) do
      User.last.destroy
    end

    it "returns the correct user when given valid input" do
      puts "IN FIRST TEST"
      puts "lookup running."
      expect(User.lookup_from_auth_hash({linkedin_url: good_url})).to eq target_user
    end
    it "returns false when there's no lookup match" do
      expect(User.lookup_from_auth_hash(linkedin_url: bad_url)).to be false
    end
  end
end
