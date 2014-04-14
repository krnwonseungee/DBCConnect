class SessionsController < ApplicationController
  def create
    lookup_opts = {}
    lookup_opts[:linkedin_url] = auth_hash.info.urls.public_profile
    lookup_opts[:name] = auth_hash.info.name

    if user = User.lookup_from_auth_hash(lookup_opts)
      session[:user_id] = user.id
      redirect_to welcome_path 
    else
      flash[:notice] = "Lookup failed. Linkedin account url or name does not match our records."
      redirect_to root_path
    end
  end

  def destroy
    logout
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end

  def logout
    reset_session
    redirect_to root_path
  end
end



# CAN DELETE COMMENTS BELOW IF DESIRED!
# It's not code, never used, just a console log of what auth_hash is returning from omniauth_linkedin request:

# auth_hash (e.g. request.env['omniauth.auth']) is:

# #<OmniAuth::AuthHash
# credentials=#<OmniAuth::AuthHash expires=true expires_at=1402511642 token="AQXc3JwUR9CQw93DXCTDE1fDt1et-eJYLah4-deT4gnHXk0hmNz9y0VAnnGqgKLuaV-rabXt23gDnCfhNsTuSlVvbvpBOgC7cgBRGMEtOn57vs8mMFEbzlyU6eDxvf1wMnEDyHPSAXFVustTp6tuzq9YLRv1LDdStI-6MRpcjJIQgtoETiA">

# extra=#<OmniAuth::AuthHash

# raw_info=#<OmniAuth::AuthHash emailAddress="Matt.b.bechtel@gmail.com" firstName="Matt" headline="Staff Engineer at Northgate Environmental Management" id="KqO9Xhy3cn" industry="Environmental Services" lastName="Bechtel" location=#<OmniAuth::AuthHash country=#<OmniAuth::AuthHash code="us"> name="San Francisco Bay Area"> publicProfileUrl="http://www.linkedin.com/in/bechtelm">>

# info=#<OmniAuth::AuthHash::InfoHash description="Staff Engineer at Northgate Environmental Management" email="Matt.b.bechtel@gmail.com" first_name="Matt" image=nil last_name="Bechtel" location=#<OmniAuth::AuthHash country=#<OmniAuth::AuthHash code="us"> name="San Francisco Bay Area"> name="Matt Bechtel" nickname="Matt Bechtel"

# urls=#<OmniAuth::AuthHash public_profile="http://www.linkedin.com/in/bechtelm">> provider="linkedin" uid="KqO9Xhy3cn">