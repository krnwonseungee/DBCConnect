DBCconnect::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # source a YML file for development-mode configuration data.  If there's
  # nothing in here or it doesn't exist, nothing happens.
  #
  # I'm using this to store e.g. my credentials for Google Hangouts.  This ID
  # is used to figure out which callback for the google widget is to be used.
  # Based on this cred, you define the XML file that defines the callback
  # server and other JS code.

  personal_config_file_name = File.join(Rails.root, ".myconfig.yml")
  if File.exists?(personal_config_file_name)
    config = YAML.load(File.open(personal_config_file_name))
    config.each_pair { |k, v| ENV[k.to_s] = v.to_s }
  end

end
