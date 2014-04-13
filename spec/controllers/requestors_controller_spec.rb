require 'spec_helper'

describe RequestorsController do
  let(:fake_requestor){FactoryGirl.create(:requestor)}
  let(:fake_requestors){[FactoryGirl.create(:requestor),
                      FactoryGirl.create(:requestor),
                      FactoryGirl.create(:requestor)]}

  context "index" do
    before(:each) { get :index }
    it "renders @requestors to json" do
      @expected = { requestors: assigns(:requestors) }.to_json
      expect(response.body).to eq @expected
    end
  end

  context "show" do
    before(:each) { get :show, id: fake_requestor.id }
    it "loads a requestor tuple into 'requestor'" do
      expect(assigns(:requestor)).to eq fake_requestor
    end

    it "renders requestor to json" do
      @expected = { requestor: assigns(:requestor) }.to_json
      expect(response.body).to eq @expected
    end
  end

  context "create" do

    it "redirects to root path if valid requestor attributes" do
      post :create, requestor: FactoryGirl.attributes_for(:requestor)
      expect(response).to redirect_to(root_path)
    end

    it "add requestor to database if valid requestor attributes" do
      expect {
        post :create, requestor: FactoryGirl.attributes_for(:requestor)
        expect(response).to be_redirect
      }.to change { Requestor.count }.by(1)
    end

  end

# No test for edit is required because the route behaves same as #show
  context "edit" do
  end

  context "update" do
    it "updates a requestor table entry" do
      new_feedback = "Hi, mom!"
      expect {
        put(:update, id: fake_requestor.id, requestor: { feedback: new_feedback })
      }.to change { fake_requestor.reload.feedback }.to(new_feedback)
    end
  end

end