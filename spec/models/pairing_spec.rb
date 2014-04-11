require 'spec_helper'

describe Pairing do
  context "associations" do
    it { should belong_to(:requestor) }
    it { should belong_to(:responder) }
  end
end
