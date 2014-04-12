class Pairing < ActiveRecord::Base
  belongs_to :requestor
  belongs_to :responder
end
