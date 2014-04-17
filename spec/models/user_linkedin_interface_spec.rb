require 'spec_helper'
require 'spec_helper_omniauth_mocks'

describe UserLinkedinInterface do
  context "looking up oauth response in db" do
    let(:auth_hash_dbc) { OmniAuth.config.mock_auth[:linkedin_dbc] }
    let(:auth_hash_nondbc) { OmniAuth.config.mock_auth[:linkedin_nondbc]}
    let(:dbc_user){FactoryGirl.create(:user, name: "Om Niauth", linked_in: "omniauth.test/in/dbcuser")}

    it "returns the correct user when given valid url" do
      valid_linkedin_user = dbc_user
      expect(UserLinkedinInterface.user_lookup_by_linkedin_data(auth_hash_dbc)).to eq valid_linkedin_user
    end
    it "returns nil when there's no lookup match (e.g. non-DBC linkedin)" do
      expect(UserLinkedinInterface.user_lookup_by_linkedin_data(auth_hash_nondbc)).to be nil
    end
  end
end