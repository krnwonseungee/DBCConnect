class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

  include PgSearch
  multisearchable :against => [ :name,
                                :email,
                                :bio,
                                :role,
                                :github,
                                :quora,
                                :twitter,
                                :facebook,
                                :linked_in,
                                :blog,
                                :about,
                                :hometown,
                                :current_location,
                                :first_name,
                                :last_name,
                                :position,
                                :company,
                                :location
                              ]
  geocoded_by :current_location
  unless Rails.env.test?
    after_validation :geocode,
      :if => lambda{ |user| user.current_location_changed? }
  end

  def self.get_list_of_user_obj(search_term)
    user_obj_array = Array.new
    PgSearch.multisearch(search_term).each do |result|
      user_name = result.content.split(" ").take(2).join(" ")
      user_obj = User.find_by_name(user_name)
      user_obj_array << user_obj
    end

    user_obj_array
  end

  private
  def user_params
    params.require(:user).permit(:current_location, :company, :github, :twitter, :facebook, :blog)
  end

end


