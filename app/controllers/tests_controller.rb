class TestsController < ApplicationController
  protect_from_forgery with: :exception
  def fake_route
  end

  def results #refactor to be skinner model
    @user_content_array = Array.new
    @pg_search_results = PgSearch.multisearch(params[:pgsearch]).each do |result|
      @user_content_array.push(result.content)
    end

    @resulting_names = Array.new
    @user_content_array.each do |user_content|
      @user_names = user_content.split(" ").take(2).join(" ")
      @resulting_names.push(@user_names)
    end
    @user_obj_array = Array.new
    @resulting_names.each do |name|
      @user_obj_array << User.find_by_name(name)
    end

    @user_obj_array
  end


end


 # PgSearch.multisearch("Matt").each{|result| puts "NEW #{result.content}"}
