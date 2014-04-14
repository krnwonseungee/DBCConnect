require 'spec_helper'

# low-value test.  Yay.  associations work.
#
describe Cohort do
  context "associations" do
    it { should have_many(:users) }
  end
end
