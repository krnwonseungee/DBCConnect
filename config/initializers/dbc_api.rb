APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))

env_config = YAML.load_file(APP_ROOT.join('dbc_api_key.yml'))

ENV['DBC_API'] = env_config['DBC-API']

