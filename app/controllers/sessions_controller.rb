class SessionsController < ApplicationController
  def create
    if user = UserLinkedinInterface.user_lookup_by_linkedin_data(auth_hash)
      UserLinkedinInterface.update_user_data(user, auth_hash)
      session[:user_id] = user.id
      redirect_to welcome_path
    else
      flash[:notice] = "LinkedIn account does not match our records."
      redirect_to root_path
    end
  end

  def destroy
    logout
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

  def logout
    reset_session
    redirect_to root_path
  end
end