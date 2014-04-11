# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
DBCconnect::Application.config.secret_key_base = '749a201be8b4c749aa4410db25aa2894df7213db9dcfc227dd1cae7a53f9ce51b660a3740bea0be710053bdb727d0d21e6b13acc6de7c73713c0dd42ad1debfc'
