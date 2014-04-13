require 'spec_helper'

describe PairingsController do
  let(:fake_pairing){FactoryGirl.create(:pairing)}
  let(:fake_pairings){[FactoryGirl.create(:pairing),
                      FactoryGirl.create(:pairing),
                      FactoryGirl.create(:pairing)]}

  context "index" do
  end

  context "show" do
    before(:each) { get :show, id: fake_pairing.id }
    it "loads a pairing tuple into @pairing" do
      expect(assigns(:pairing)).to eq fake_pairing
    end

    it "renders pairing to json" do
      @expected = { pairing: assigns(:pairing) }.to_json
      expect(response.body).to eq @expected
    end
  end

  context "create" do
    it "adds requestor to database if valid requestor attributes" do
      expect{
        post :create, pairing: FactoryGirl.attributes_for(:pairing)
        }.to change{ Pairing.count }.by(1)
    end
  end

  # No test for edit is required because tests would be same as for #show
  context "edit" do
  end

  context "destroy" do
  end

  context "update" do
    it "updates a pairing table entry" do
      new_requestor_feedback = "bla bla bla"
      expect {
        put(:update, id: fake_pairing.id, pairing: { requestor_feedback: new_requestor_feedback })
      }.to change { fake_pairing.reload.requestor_feedback }.to(new_requestor_feedback)
    end
  end

end