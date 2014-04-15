class WelcomeController < ApplicationController
  def index
  end

  def main    
  end

  def user
    if current_user
      render json: {user_id: current_user.id, name: current_user.name, active: current_user.active}
    else
      render json: {}.to_json
    end
  end
end
