class UserLinkedinInterface

  def self.user_lookup_by_linkedin_data(auth_hash)
      user = find_url_match(auth_hash.info.urls.public_profile)
      user ||= find_name_match(auth_hash.info.name)
  end

    def self.update_user_data(user, auth_hash)
      if pic_url = grab_picture_url_from_linkedin(auth_hash)
        user.update_attribute(:picture_url, pic_url)
      end
      if company_names = grab_company_names_from_linkedin(auth_hash)
        user.update_attribute(:company, company_names)
      end
      if location = grab_location_from_linkedin(auth_hash)
        user.update_attribute(:location, location)
      end
      user
    end

  private

 # Checks the database for a user match based on two formats of
 # linkedin profile urls (/in/ and /pub/)
  def self.find_url_match(linkedin_profile_url)
    url_substring_in = linkedin_profile_url[/(?<=in\/)[\w-]+/]
    url_substring_pub = linkedin_profile_url[/(?<=pub\/)[\w-]+/]
    if url_substring_in
      user = User.find(:all, :conditions => ["linked_in LIKE ?", "%#{url_substring_in}%"])
    elsif url_substring_pub
      user ||= User.find(:all, :conditions =>["linked_in LIKE ?", "%#{url_substring_pub}%"])
    end
    user = user[0] if user #grabs result out of array, only if there was a result (avoids nil[0] -> error)
  end

  # Checks the database for a user match based on name
  def self.find_name_match(linkedin_name)
    User.find_by_name(linkedin_name)
  end

  def self.grab_company_names_from_linkedin(auth_hash)
    company_names = []
    auth_hash.extra.raw_info.positions.values[1].each do |company_hash|
      c_name = company_hash['company']['name']
      company_names << c_name if c_name
    end
    company_names.join(", ")
  end

  def self.grab_picture_url_from_linkedin(auth_hash)
    auth_hash.extra.raw_info.pictureUrl
  end

  def self.grab_location_from_linkedin(auth_hash)
    auth_hash.extra.raw_info.location.name
  end

end
