require 'spec_helper'

describe User do

  context "associations" do
    it { should have_many(:requestors) }
    it { should have_many(:responders) }
    it { should belong_to(:cohort) }
  end

  context "looking up oauth response in db" do
    user = FactoryGirl.create(:user, first_name: "Joe")
    good_url  = user.linked_in
    bad_url = "www.invalidurl.me"

    it "returns the correct user when given valid input" do
      expect(User.lookup_from_auth_hash({linkedin_url: good_url})).to eq user
    end
    it "returns false when there's no lookup match" do
      expect(User.lookup_from_auth_hash(linkedin_url: bad_url)).to be false
    end
  end
end