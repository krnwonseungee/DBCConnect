class HackController < ApplicationController
  def hack_user
    session[:user_id] = params[:gibson].to_i
    hack_user = User.find(session[:user_id])
    Rails.logger.debug("Congratulations '#{hack_user.name}'")
    params[:id] = hack_user.email # WTF, team DBCConnect...id's are numbers
    redirect_to :welcome
  end
end
