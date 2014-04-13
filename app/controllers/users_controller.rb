class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
    render json: { users: @users }.to_json
  end

  def sidebar_avail
    # CHANGE line 7 once retrieving avail users is finalized (Matt is working on sessions)
    @avail_users =  User.all.limit(10)

  end

  def show
    render json: { user: @user }.to_json
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path
    else
      redirect_to new_user_path
    end
  end

  def edit
    render json: { user: @user }.to_json
  end

  def update
    if @user.update(user_params)
      render json: { success: true, user: @user }.to_json
    else
      render json: { success: false }
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:id,:name,:email,:bio,:role,:github,:quora,
        :twitter,:facebook,:linked_in,:blog,:about,:hometown, :current_location,
        :first_name,:last_name,:position,:company,:location)
    end

end
