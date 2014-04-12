require 'spec_helper'

describe User do
  context "associations" do
    it { should have_many(:requestors) }
    it { should have_many(:responders) }
    it { should belong_to(:cohort) }
  end

  context "looking up db values using omniauth_hash values" do
    it "returns the correct user when given valid input" do
    end
    it "returns false when there's no lookup match" do
    end
  end

end
