class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

  def self.lookup_from_auth_hash(auth_hash)
    opts = {}
    opts[:linkedin_url] = auth_hash.info.urls.public_profile
    opts[:name] = auth_hash.info.name
    #Regex in next line finds "in/" then grabs the user public profile id after
    # e.g. 'http://www.linkedin.com/in/bechtelm' becomes 'bechtelm'
    li_url_substring_in = opts[:linkedin_url][/(?<=in\/)[\w-]+/]
    # Same as above but for "pub/" form of linkedin url.  Others unsupported!
    li_url_substring_pub = opts[:linkedin_url][/(?<=pub\/)[\w-]+/]
    if li_url_substring_in  #don't want to waste time if match was nil due to other url format
      user = User.find(:all, :conditions => ["linked_in LIKE ?", "%#{li_url_substring_in}%"])
    elsif li_url_substring_pub
      user ||= User.find(:all, :conditions =>["linked_in LIKE ?", "%#{li_url_substring_pub}%"])
    end
    user = user[0] if user #grabs result out of array, only if there was a result (avoids nil[0] -> error)
    user ||= User.find_by_name(opts[:name])
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


