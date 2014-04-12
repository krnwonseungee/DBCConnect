class UsersController < ApplicationController
  def index
  end

  def sidebar_avail
    # CHANGE line 7 once retrieving avail users is finalized (Matt is working on sessions)
    @avail_users =  User.all.limit(10)

  end
end
