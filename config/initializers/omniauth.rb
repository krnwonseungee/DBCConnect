Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin,
                ENV['LINKEDIN_KEY'],
                ENV['LINKEDIN_SECRET'],
                :scope => 'r_fullprofile r_emailaddress',
                :fields =>[
                  'first-name',
                  'last-name',
                  'picture-url',
                  'public-profile-url',
                  'location',
                  'email-address',
                  'positions'
                ], :provider_ignores_state => true
end