require 'spec_helper'

describe SessionsController do
  context "logout" do
    it "session#destroy clears the session on logout" do
      session[:user_id] = 999
      get :destroy
      expect(session[:user_id]).to eq(nil)
    end
  end
end