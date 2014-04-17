#This file can be required just like spec_helper
# Do so if you want access to omniauth auth_hash mocks,
# After requiring, testing auth_hashs can be initialized in this way:
# my_test_auth_hash = OmniAuth.config.mock_auth[:linkedin_dbc]

# Test mode enables all requests to OmniAuth to be short circuited to use the mock authentication hash
# (as opposed to actual linkedin request/callback process)
OmniAuth.config.test_mode = true

dbc_omniauth_hash = {
                   provider: 'linkedin',
                   info: {
                        name: 'Om Niauth',
                        urls: {
                          public_profile:
                            "omniauth.test/in/dbcuser"
                              }
                            }
                          }

nondbc_omniauth_hash = {
                   provider: 'linkedin',
                   info: {
                        name: 'Non DBC User',
                        urls: {
                          public_profile:
                            "omniauth.test/in/nondbcuser"
                              }
                            }
                          }

OmniAuth.config.add_mock(:linkedin_dbc, dbc_omniauth_hash)
OmniAuth.config.add_mock(:linkedin_nondbc, nondbc_omniauth_hash)
