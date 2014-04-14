require 'spec_helper'

describe UsersController do
  let(:fake_user){FactoryGirl.create(:user)}
  let(:fake_users){[FactoryGirl.create(:user),
                      FactoryGirl.create(:user),
                      FactoryGirl.create(:user)]}

  describe "index" do
    before(:each) { get :index }
    it "renders @users to json" do
      @expected = { users: assigns(:users) }.to_json
      expect(response.body).to eq @expected
    end
  end

  describe "show" do
    before(:each) { get :show, id: fake_user.id }
    it "loads a user tuple into @user" do
      expect(assigns(:user)).to eq fake_user
    end

    it "renders user to json" do
      @expected = { user: assigns(:user) }.to_json
      expect(response.body).to eq @expected
    end
  end

  describe "create" do
    it "redirects to root path if valid user attributes" do
      post :create, user: FactoryGirl.attributes_for(:user)
      expect(response).to redirect_to(root_path)
    end

    it "add user to database if valid user attributes" do
      expect {
        post :create, user: FactoryGirl.attributes_for(:user)
        expect(response).to be_redirect
      }.to change { User.count }.by(1)
    end

  end

# No test for edit is required because the route behaves same as #show
  describe "edit" do
  end

  describe "update" do
    it "updates a user table entry" do
      new_name = "Joe Blow"
      expect {
        put(:update, id: fake_user.id, user: { name: new_name })
      }.to change { fake_user.reload.name }.to(new_name)
    end
  end

end