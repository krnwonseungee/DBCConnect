require '../spec_helper'

describe Responder do
  context "associations" do
    it { should belong_to(:user)}
  end
end
