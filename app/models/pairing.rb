class Pairing < ActiveRecord::Base
  belongs_to :requstor
  belongs_to :responder
end
