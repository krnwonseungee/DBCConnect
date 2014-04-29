class UserPresenter
  def initialize(user)
    @user = user
  end

  def to_json(opts={})
    { user_id: @user.id, name: @user.name, active: @user.active }.to_json
  end
end
