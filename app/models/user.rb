class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

  def self.lookup_from_auth_hash(opts = {})
    #Regex in next line finds "in/" then grabs the user public profile id after
    # e.g. 'http://www.linkedin.com/in/bechtelm' becomes 'bechtelm'
    li_url_substring_in = opts[:linkedin_url][/(?<=in\/)[\w-]+/]
    li_url_substring_pub = opts[:linkedin_url][/(?<=pub\/)[\w-]+/]
    puts "$" *200
    puts "strings are:"
    p li_url_substring_in, li_url_substring_pub
    if li_url_substring_in  #don't want to waste time if match was nil due to other url format
      user = User.find(:all, :conditions => ["linked_in LIKE ?", "%#{li_url_substring_in}%"])
    elsif li_url_substring_pub
      user ||= User.find(:all, :conditions =>["linked_in LIKE ?", "%#{li_url_substring_pub}%"])
    end
    user = user[0] if user #grabs result out of array, only if there was a result (avoids nil[0] -> error)
    user ||= User.find_by_name(opts[:name])
    puts "THE USER IS:"
    p user
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
end


