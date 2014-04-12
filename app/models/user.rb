class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requestors
  has_many :responders

  def self.lookup_by_auth_hash(auth_hash)
    user = User.find_by_linked_in(auth_hash.info.urls.public_profile)
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
end


