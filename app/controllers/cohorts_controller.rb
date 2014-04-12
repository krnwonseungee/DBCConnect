class CohortsController < ApplicationController

  def index
    @cohorts = Cohort.all
    # print "***** { cohorts: @cohorts }.to_json = "; p { cohorts: @cohorts }.to_json
    render json: { cohorts: @cohorts }.to_json
  end

  def show
    @cohort = Cohort.find(params[:id])
    render json: { cohort: @cohort }.to_json
  end

end
