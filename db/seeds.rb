# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

seed_data_hash = { :name => ["Janet Yi", "Zohar Liran", "Katherine Hayden", "Eric Johnson", "Matt Bechtel", "Matt Higgins"],
  :first_name => ["Janet", "Zohar", "Katherine", "Eric", "Matt", "Matt"],
  :last_name => ["Yi", "Liran", "Hayden", "Johnson", "Bechtel", "Higgins"],
  :position => ["Awesome developer", "Developer", "Engineer", "Engineer", "Programmer", "Hacker"],
  :company => ["Google", "Thoughbot", "Paypal", "Uber", "Pivotal Labs", "Google"],
  :location => ["San Francisco", "San Francisco", "San Francisco", "Palo Alto", "San Mateo", "Mountain View"],
  :picture_url => ["Faker::Internet.url", "Faker::Internet.url", "Faker::Internet.url", "Faker::Internet.url", "Faker::Internet.url", "Faker::Internet.url", "Faker::Internet.url"],
  :cohort_id => [1, 1, 2, 2, 3, 4, 5],
  :bio => ["i like traveling", "i like vegan food", "i like making dragons", "i like stanfurd", "i like trolling", "i like cleaning stuff"],
  :email => ["Faker::Internet.email", "Faker::Internet.email", "Faker::Internet.email", "Faker::Internet.email", "Faker::Internet.email", "Faker::Internet.email", "Faker::Internet.url"],
  :github => ["www.github.com", "www.github.com", "www.github.com", "www.github.com", "www.github.com", "www.github.com", "www.github.com"],
  :linkedin => ["www.linkedin.com", "www.linkedin.com", "www.linkedin.com", "www.linkedin.com", "www.linkedin.com", "www.linkedin.com", "www.linkedin.com"],
  :quora => ["www.quora.com", "www.quora.com", "www.quora.com", "www.quora.com", "www.quora.com", "www.quora.com", "www.quora.com"],
  :twitter => ["www.twitter.com", "www.twitter.com", "www.twitter.com", "www.twitter.com", "www.twitter.com", "www.twitter.com", "www.twitter.com"],
  :facebook => ["www.facebook.com", "www.facebook.com", "www.facebook.com", "www.facebook.com", "www.facebook.com", "www.facebook.com", "www.facebook.com"],
  :blog => ["www.wordpress.com", "www.wordpress.com", "www.wordpress.com", "www.wordpress.com", "www.wordpress.com", "www.wordpress.com", "www.wordpress.com"] }

i = 0
6.times do
  sample_user_attr = { name: seed_data_hash[:name][i],
    first_name: seed_data_hash[:first_name][i],
    last_name: seed_data_hash[:last_name][i],
    position: seed_data_hash[:position][i],
    company: seed_data_hash[:company][i],
    location: seed_data_hash[:location][i],
    picture_url: seed_data_hash[:picture_url][i],
    cohort_id: seed_data_hash[:cohort_id][i],
    bio: seed_data_hash[:bio][i],
    email: seed_data_hash[:email][i],
    github: seed_data_hash[:github][i],
    linkedin: seed_data_hash[:linkedin][i],
    quora: seed_data_hash[:quora][i],
    twitter: seed_data_hash[:twitter][i],
    facebook: seed_data_hash[:facebook][i],
    blog:  seed_data_hash[:blog][i] }
  User.create!(sample_user_attr)
  i+=1
end
