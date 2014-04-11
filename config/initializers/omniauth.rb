Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin, ENV['LINKEDIN_KEY'], ENV['LINKEDIN_SECRET']
  puts "linkedin_secret is: #{ENV['LINKEDIN_SECRET']}"
end