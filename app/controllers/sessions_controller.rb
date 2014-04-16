class SessionsController < ApplicationController
  def create
    puts "$" * 300
    puts "auth hash is:"
    p auth_hash
    puts "$" * 300
    if user = User.lookup_from_auth_hash(auth_hash)
      session[:user_id] = user.id
      redirect_to welcome_path
    else
      flash[:notice] = "DBC Grad Lookup failed. Linkedin account url or name does not match our records."
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