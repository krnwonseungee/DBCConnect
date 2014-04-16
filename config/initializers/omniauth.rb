Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin, ENV['LINKEDIN_KEY'], ENV['LINKEDIN_SECRET'], {provider_ignores_state: true}
end