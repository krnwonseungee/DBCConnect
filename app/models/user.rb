class User < ActiveRecord::Base
  include PgSearch
  belongs_to :cohort
  has_many :requests

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

  def self.lookup_from_auth_hash(opts = {})
    if user = User.find_by_linked_in(opts[:linkedin_url])
      return user
    elsif
      user = User.find_by_name(opts[:name])
      return user
    else
    #Can eventually add in secondary checks by name/gmail etc if no linkedin url on socrates
      return false
    end
  end

  geocoded_by :current_location
  unless Rails.env.test?
    after_validation :geocode
  end
end


