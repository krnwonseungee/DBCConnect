# In general this style of test is really not helpful.  Note on the comments
# that you're really only testing that Ruby works.
#
#
require 'spec_helper'

describe CohortsController do
  let(:fake_cohort){FactoryGirl.create(:cohort)}
  let(:fake_cohorts){[FactoryGirl.create(:cohort),
                      FactoryGirl.create(:cohort),
                      FactoryGirl.create(:cohort)]}

  describe "index" do
    before(:each) { get :index }
    # I'm not sure what the value of the test is?  You're testing that the
    # assigned thing is rendered like the assigned thing
    it "renders @cohorts to json" do
      # Why is this an iVar?
      @expected = { cohorts: assigns(:cohorts) }.to_json
      expect(response.body).to eq @expected
    end
  end

  describe "show" do
    before(:each) { get :show, id: fake_cohort.id }
    it "loads a cohort tuple into 'cohort'" do
      # you're merely testing Ruby assignment here.  You're not testing that
      # you're geting back the thing you want.  You probably want to look at
      # testing something like `JSON.parse(response.body)[:razzle] == 'true'`
      # or some such
      expect(assigns(:cohort)).to eq fake_cohort
    end

    it "renders cohort to json" do
      @expected = { cohort: assigns(:cohort) }.to_json
      expect(response.body).to eq @expected
    end
  end

end
