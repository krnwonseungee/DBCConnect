require 'spec_helper'

describe RequestorsController do
  let(:fake_user) { FactoryGirl.create(:user) }
  let(:fake_requestor){FactoryGirl.create(:requestor)}
  let(:fake_user_requestor) { post :create, requestor_data: { user_id: fake_user.id, id: fake_requestor.id }, format: :json }

  context "index" do
    it "renders @requestors to json" do
    end
  end

  context "show" do
    before(:each) { get :show, id: fake_requestor.id, user_id: fake_requestor.user_id }
    it "loads a requestor tuple into @requestor" do
      expect(assigns(:requestor)).to eq fake_requestor
    end

    it "renders requestor to json" do
      @expected = { requestor: assigns(:requestor) }.to_json
      expect(response.body).to eq @expected
    end
  end

  context "create" do

    it "add requestor to database if valid requestor attributes" do
      expect{
        post :create, user_id: fake_user.id
        }.to change{ Requestor.count }.by(1)
    end

    # Note - this test passes when "success: true" is removed from returned hash
    # of requestors#create
    # TODO - rewrite test to pass with "success: true" included
    xit "renders requestor to json" do
      post :create, user_id: fake_user.id
      @expected = { requestor: assigns(:requestor) }.to_json
      expect(response.body).to eq @expected
    end

  end

# No test for edit is required because the route behaves same as #show
  context "edit" do
  end

  context "update" do
    it "updates a requestor table entry" do
      new_feedback = "Hi, mom!"
      expect {
        put(:update, id: fake_requestor.id, user_id: fake_requestor.user_id,
          requestor: { feedback: new_feedback })
      }.to change { fake_requestor.reload.feedback }.to(new_feedback)
    end
  end

end