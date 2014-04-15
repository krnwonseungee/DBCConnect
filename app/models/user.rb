class User < ActiveRecord::Base
  belongs_to :cohort
  has_many :requests

  def self.lookup_from_auth_hash(opts = {})
    user = User.find_by_linked_in(opts[:linkedin_url])
    user ||= User.find_by_name(opts[:name])
  end

  def refresh_fields_from_web(opts = {})
    if opts[:provider] = "linkedin"
      refresh_fields_from_linkedin(opts[:token])
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

  def refresh_fields_from_linkedin(token)
    linkedin_client = LinkedIn::Client.new(ENV['LINKEDIN_KEY'], ENV['LINKEDIN_SECRET'])
    linkedin_client.authorize_from_access(token)
    puts "in 'refresh_fields_from_linkedin'... profile is:"
    user = linkedin_client.profile(:fields => %w(last-modified-timestamp))
    p user
  end

end


