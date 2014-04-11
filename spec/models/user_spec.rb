require 'spec_helper'

describe User do
  context "associations" do
    it { should have_many(:requestors) }
    it { should have_many(:responders) }
    it { should belong_to(:cohort) }
  end
end
