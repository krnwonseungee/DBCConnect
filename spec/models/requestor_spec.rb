require 'spec_helper'

describe Requestor do
  context "assocations" do
    it { should belong_to(:user)}
  end
end
