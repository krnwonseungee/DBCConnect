require 'spec_helper'

describe UsersController do
  let(:fake_user){FactoryGirl.create(:user)}
  let(:fake_users){[FactoryGirl.create(:user),
                      FactoryGirl.create(:user),
                      FactoryGirl.create(:user)]}

  context "index" do
    before(:each) { get :index }
    it "renders @users to json" do
      @expected = { users: assigns(:users) }.to_json
      # print "***** assigns(:users) = "; p assigns(:users)
      # print "***** @expected = "; p @expected
      # print "***** response.body = "; p response.body
      expect(response.body).to eq @expected
    end
  end

  context "show" do
    before(:each) { get :show, id: fake_user.id }
    it "loads a user tuple into 'user'" do
      # print "***** fake_user = "; p fake_user
      # print "***** assigns(:user) = "; p assigns(:user) # assigns(:user) = @user
      expect(assigns(:user)).to eq fake_user
    end

    it "renders user to json" do
      @expected = { user: assigns(:user) }.to_json
      # print "***** assigns(:user) = "; p assigns(:user)
      # print "***** @expected = "; p @expected
      # print "***** response.body = "; p response.body
      expect(response.body).to eq @expected
    end
  end

  context "create" do
    it "add user to database" do
      expect {
        post :create, user: FactoryGirl.attributes_for(:user)
        expect(response).to be_redirect
      }.to change { User.count }.by(1)
    end

  end

end