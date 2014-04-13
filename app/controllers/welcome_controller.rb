class WelcomeController < ApplicationController
  def index
  end

  def main    
  end

  def user
    render json: {user_id: current_user.id, name: current_user.name, active: current_user.active}
  end
end