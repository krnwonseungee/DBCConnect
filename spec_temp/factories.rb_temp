FactoryGirl.define do
  factory :cohort do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    location { Faker::Address.city }
    start_date { "2000-01-01" }
    in_session { true }
  end

  factory :user do
   cohort_id { 99 }
   name { Faker::Company.name }
   email { Faker::Internet.email }
   bio { Faker::Lorem.sentences(sentence_count = 4, supplemental = false) }
   role { Faker::Lorem.words(num = 1) }
   github { Faker::Internet.email }
   quora { Faker::Internet.email }
   twitter { Faker::Internet.email }
   facebook { Faker::Internet.email }
   linked_in { Faker::Internet.email }
   blog { Faker::Internet.email }
   about { Faker::Lorem.sentences(sentence_count = 4, supplemental = false) }
   hometown { Faker::Address.city }
   current_location { Faker::Address.city }
   first_name { Faker::Name.first_name }
   last_name { Faker::Name.last_name }
   position { Faker::Lorem.words(num = 1) }
   lat { Faker::Geo.latitude }
   lon { Faker::Geo.longitude }
   company { Faker::Company.name }
   location { Faker::Address.city }
   picture_url { Faker::Internet.email }
   created_at
   updated_at
  end
end
