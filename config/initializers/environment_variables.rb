module DBCconnect
  class Application < Rails::Application
    config.before_configuration do
      env_file = Rails.root.join("config", 'environment_variables.yml').to_s
      if File.exists?(env_file)
        #Note: original snippet for line below had "[Rails.env]" before each do
        #Couldn't make it work right, so removed.  [Rails.env] = ["development"]
        YAML.load_file(env_file).each do |key, value|
          ENV[key.to_s] = value
        end
      end
    end
  end
end


