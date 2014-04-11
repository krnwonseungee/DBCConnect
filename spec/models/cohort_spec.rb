require 'spec_helper'

describe Cohort do
  context "associations" do
    it { should have_many(:users) }
  end
end
