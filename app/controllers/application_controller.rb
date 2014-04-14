class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  private

  def current_user
    # Do you realize that if session[:user_id] is nil this will return nil and
    # will break your serialization in places e.g. WelcomeController.
    #
    # This app is dead.  I can't sign in.  I don't know how to test this.
    # Furthermore I don't get any feedback.
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
