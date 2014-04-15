class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

  def self.lookup_from_auth_hash(opts = {})
    user = User.find_by_linked_in(opts[:linkedin_url])
    user ||= User.find_by_name(opts[:name])
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


