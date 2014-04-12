require 'spec_helper'

describe CohortsController do
  let(:fake_cohort){FactoryGirl.create(:cohort)}
  # TODO - create factory for cohorts (plural) to enable testing cohorts#index
  context "index" do
    it "loads all cohorts into @cohorts" do
    end

    it "renders @cohorts to json" do
    end
  end

  context "show" do
    before(:each) { get :show, id: fake_cohort.id }
    it "loads a cohort tuple into 'cohort'" do
      # print "***** fake_cohort = "; p fake_cohort
      # print "***** assigns(:cohort) = "; p assigns(:cohort) # assigns(:cohort) = @cohort
      expect(assigns(:cohort)).to eq fake_cohort
    end

    it "renders cohort to json" do
      @expected = { cohort: assigns(:cohort) }.to_json
      # print "***** assigns(:cohort) = "; p assigns(:cohort)
      # print "***** @expected = "; p @expected
      # print "***** response.body = "; p response.body
      expect(response.body).to eq @expected
    end
  end

end
