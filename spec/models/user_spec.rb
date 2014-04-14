require 'spec_helper'

describe User do

  context "associations" do
    it { should belong_to(:cohort) }
  end

  context "looking up oauth response in db" do
    user = FactoryGirl.create(:user, first_name: "Joe")
    # What in the name of all that is unholy in the seven black rivers of the
    # underworld is a `user.linked_in`?  Is it a `linked_in_profile_url` or is
    # it a `linked_in_id` or is it a......it's an email address (according to
    # faker?)  Bad name.

    # But wait, you're compairng a user.linked in (an email) to an invalidurl?
    # What?  Huh?  You name the variable "good_url" but in the factory a
    # linked_in is an email.  Chagrinned.
    #
    #
    # whoever did this:
    #
    # commit d6446b21e84c0899ca91c1a48261a28c3fcb50d0
    # Author: Apprentice <apprentice@dbc28.local>
    # Date:   Sat Apr 12 16:43:15 2014 -0700
    #
    #     Tests added for user mode "lookup_from_auth_hash" method
    #
    # Should have had their code examined better.
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
