class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
    render json: { users: @users }.to_json
  end

  def show
    render partial: 'show', locals: { user: @user }
    # render json: { user: user }.to_json
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
    # render partial: 'edit', locals: { user: @user }
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      redirect_to user_path(user)
    else
      render json: { success: false }
    end
  end

  def get_active_users
    active_users = User.where(active: true).map { |user| user.to_json }
    render json: { activeUsers: active_users }
  end

  def active
    user = current_user
  end

  def results #refactor to be skinner model
    user_content_array = Array.new
    pg_search_results = PgSearch.multisearch(params[:pgsearch]).each do |result|
      user_content_array.push(result.content)
    end

    resulting_names = Array.new
    user_content_array.each do |user_content|
      user_names = user_content.split(" ").take(2).join(" ")
      resulting_names.push(user_names)
    end
    @user_obj_array = Array.new
    resulting_names.each do |name|
      @user_obj_array << User.find_by_name(name)
    end

    p "*"*80
    p @user_obj_array
    p "*"*80

    # render json: { user_obj_array: @user_obj_array }.to_json
    render partial: 'results', locals: { results: @user_obj_array }
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
