desc "Wipe out the pairings and user activity"
task :nuke => :environment do
  puts "kaboom!"
  Request.destroy_all
  Pairing.destroy_all
  User.where(active: true).update_all(active: false)
end
