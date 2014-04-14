require 'spec_helper'

describe CohortsController do
  let(:fake_cohort){FactoryGirl.create(:cohort)}
  let(:fake_cohorts){[FactoryGirl.create(:cohort),
                      FactoryGirl.create(:cohort),
                      FactoryGirl.create(:cohort)]}

  describe "index" do
    before(:each) { get :index }
    it "renders @cohorts to json" do
      @expected = { cohorts: assigns(:cohorts) }.to_json
      expect(response.body).to eq @expected
    end
  end

  describe "show" do
    before(:each) { get :show, id: fake_cohort.id }
    it "loads a cohort tuple into 'cohort'" do
      expect(assigns(:cohort)).to eq fake_cohort
    end

    it "renders cohort to json" do
      @expected = { cohort: assigns(:cohort) }.to_json
      expect(response.body).to eq @expected
    end
  end

end
