class SessionsController < ApplicationController
  def create
    if user = User.lookup_from_auth_hash(auth_hash)
      session[:user_id] = user.id
      user.update_records_from_linkedin_auth_hash(auth_hash)
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