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

  def self.lookup_from_auth_hash(auth_hash)
    opts = {}
    opts[:linkedin_url] = auth_hash.info.urls.public_profile
    opts[:name] = auth_hash.info.name
    li_url_substring_in = opts[:linkedin_url][/(?<=in\/)[\w-]+/]
    li_url_substring_pub = opts[:linkedin_url][/(?<=pub\/)[\w-]+/]
    if li_url_substring_in
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


