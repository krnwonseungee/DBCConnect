class WelcomeController < ApplicationController
  def index
  end

  def main    
  end

  def quote
    @quote = Quote.all.sample
    render json: {content: @quote.content, author: @quote.author}.to_json
  end

  def user
    if current_user
      render json: {user_id: current_user.id, name: current_user.name, active: current_user.active}
    else
      render json: {}.to_json
    end
  end
end
