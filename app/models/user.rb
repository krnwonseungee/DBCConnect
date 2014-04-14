class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

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

  include PgSearch
  # These names are pretty atrocious.  what is a github?  What is a linked_in?
  # Based on other comments, it's not obvious as to what we're getting back.
  #
  # What's a current_location and  location?  Your names are very un-helpful.
  #
  # Also, for purposes of an MVP you're integrating with 5-6 social networks?
  # That's not very *minimal*.
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
    after_validation :geocode
  end
end


