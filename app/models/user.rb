class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

  def self.lookup_from_auth_hash(auth_hash)
    UserLinkedinInterface.db_lookup_based_on_linkedin_data(auth_hash)
  end

  def update_records_from_linkedin_auth_hash(auth_hash)
    if pic_url = grab_picture_url_from_linkedin(auth_hash)
      self.update_attribute(:picture_url, pic_url)
    end
    if company_names = grab_company_names_from_linkedin(auth_hash)
      self.update_attribute(:company, company_names)
    end
    if location = grab_location_from_linkedin(auth_hash)
      self.update_attribute(:location, location)
    end
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
    after_validation :geocode,
      :if => lambda{ |user| user.current_location_changed? }
  end

  private
  def user_params
    params.require(:user).permit(:current_location, :company, :github, :twitter, :facebook, :blog)
  end

  def grab_company_names_from_linkedin(auth_hash)
    company_names = []
    auth_hash.extra.raw_info.positions.values[1].each do |company_hash|
      c_name = company_hash['company']['name']
      company_names << c_name if c_name
    end
    company_names.join(", ")
  end

  def grab_picture_url_from_linkedin(auth_hash)
    auth_hash.extra.raw_info.pictureUrl
  end
  def grab_location_from_linkedin(auth_hash)
    auth_hash.extra.raw_info.location.name
  end

end


