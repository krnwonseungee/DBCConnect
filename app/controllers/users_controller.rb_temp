class UsersController < ApplicationController
  def index
    users = User.all
    render json: { users: users }.to_json
  end

  def show
    user = User.find(params[:id])
    render json: { user: user }.to_json
  end

  def create
    user = User.new(params)
    if user.save
      redirect_to root_path
    else
      redirect_to new_user_path
    end
  end

  def edit
    user = User.find(params[:id])
    render json: { user: user }.to_json
  end

  def update
    user = User.find(params[:id])
    if user.update(params)
      redirect_to user_path, notice: 'User was successfully updated.'
      render json: { success: true, user: user }.to_json
    else
      render json: { success: false }
    end
  end

end
