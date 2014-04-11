class TestsController < ApplicationController
  protect_from_forgery with: :exception
  def fake_route
  end

  def results
    @results = PgSearch.multisearch(params[:pgsearch])
    p "PARAMS #{params}"

  end


end
