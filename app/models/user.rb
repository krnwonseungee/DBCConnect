class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requestors
  has_many :responders

  def self.lookup_from_auth_hash(opts = {})
    user = User.find_by_linked_in(opts[:linkedin_url])
    #Can eventually add in secondary checks by name/gmail etc if no linkedin url on socrates
    return user || false
  end

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
    after_validation :geocode
  end
end


