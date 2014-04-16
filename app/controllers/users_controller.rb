class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
    render json: { users: @users }.to_json
  end

  def show
    render partial: 'show', locals: { user: @user }
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
    render partial: 'edit', locals: { user: @user }
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render partial: 'show', locals: { user: user }
    else
      render partial: 'edit', locals: { user: @user }
    end
  end

  def get_active_users
    active_users = User.where(active: true).map { |user| user.to_json }
    render json: { activeUsers: active_users }
  end

  def results
    @user_obj_array = User.get_list_of_user_obj(params[:pgsearch])
    render partial: 'results', locals: { results: @user_obj_array }
  end

  def active
    user = current_user
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:id,:name,:email,:bio,:role,:github,:quora,
        :twitter,:facebook,:linked_in,:blog,:about,:hometown, :current_location,
        :first_name,:last_name,:position,:company,:location, :active)
    end

end
