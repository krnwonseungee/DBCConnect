class WelcomeController < ApplicationController
  def index
  end

  def main
    @public_google_api_id = ENV["GOOGLE_API_ID"]
  end

  def quote
    @quote = Quote.all.sample
    render json: {content: @quote.content, author: @quote.author}.to_json
  end

  def user
    render json: (current_user ? UserPresenter.new(current_user).to_json : {}.to_json)
  end
end
