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

    it "renders partial of user profile" do
      expect(response).to render_template(:partial => '_show')
    end
  end

  describe "create" do
    it "renders partial of user profile if valid user attributes" do
      post :create, user: FactoryGirl.attributes_for(:user)
      expect(response).to render_template(:partial => '_show')
    end

    it "add user to database if valid user attributes" do
      expect{
        post :create, user: FactoryGirl.attributes_for(:user)
      }.to change( User, :count ).by(1)
    end

  end

  describe "edit" do
    xit "renders partial for editing user information" do
      get :edit, user: { id: fake_user.id }
      expect(response).to render_template(:partial => '_edit')
    end
  end

  describe "update" do
    xit "updates a user table entry" do
      new_name = "Joe Blow"
      expect {
        put :update, id: fake_user.id, user: { name: new_name }
      }.to change { fake_user.name }.to eq new_name
    end
  end

end
