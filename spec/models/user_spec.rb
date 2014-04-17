require 'spec_helper'
require 'spec_helper_omniauth_mocks'

describe User do

  context "associations" do
    it { should belong_to(:cohort) }
  end
end
