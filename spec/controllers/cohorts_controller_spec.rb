require 'spec_helper'

describe CohortsController do
  let(:fake_cohort){FactoryGirl.create(:cohort)}
  let(:fake_cohorts){[FactoryGirl.create(:cohort),
                      FactoryGirl.create(:cohort),
                      FactoryGirl.create(:cohort)]}


  # TODO - create factory for cohorts (plural) to enable testing cohorts#index
  context "index" do
    before(:each) { get :index }
    it "loads all cohorts into @cohorts" do
      # print "***** fake_cohorts = "; p fake_cohorts
      # print "***** assigns(:cohorts) = "; p assigns(:cohorts)
      # expect(assigns(:cohorts)).to eq fake_cohorts
    end

    it "renders @cohorts to json" do
      @expected = { cohorts: assigns(:cohorts) }.to_json
      # print "***** assigns(:cohorts) = "; p assigns(:cohorts)
      # print "***** @expected = "; p @expected
      # print "***** response.body = "; p response.body
      expect(response.body).to eq @expected
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
