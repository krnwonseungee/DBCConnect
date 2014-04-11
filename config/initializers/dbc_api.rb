APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
# Twitter
env_config = YAML.load_file(APP_ROOT.join('dbc_api_key.yml'))

ENV['DBC_API'] = env_config['DBC-API']

# HTTParty.get('http://example.com', :headers => {"User-Agent" => APPLICATION_NAME})
# HTTParty.get("https://api.devbootcamp.com/v1/users/869", :headers => {DBC-API: "3d81ab0f46b40ea0546b1d64976180df"})
