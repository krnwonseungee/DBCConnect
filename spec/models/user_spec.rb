require 'spec_helper'
require 'spec_helper_omniauth_mocks'

describe User do

  context "associations" do
    it { should belong_to(:cohort) }
  end

  context "looking up oauth response in db" do
    let(:auth_hash_dbc) { OmniAuth.config.mock_auth[:linkedin_dbc] }
    let(:auth_hash_nondbc) { OmniAuth.config.mock_auth[:linkedin_nondbc]}
    let(:dbc_user){FactoryGirl.create(:user, name: "Om Niauth", linked_in: "omniauth.test/in/dbcuser")}

    it "returns the correct user when given valid url" do
      valid_linkedin_user = dbc_user
      expect(User.lookup_from_auth_hash(auth_hash_dbc)).to eq valid_linkedin_user
    end
    it "returns nil when there's no lookup match (e.g. non-DBC linkedin)" do
      expect(User.lookup_from_auth_hash(auth_hash_nondbc)).to be nil
    end

  end
end
