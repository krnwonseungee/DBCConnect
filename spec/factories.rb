FactoryGirl.define do
  factory :cohort do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    location { Faker::Address.city }
    start_date { "2000-01-01" }
    in_session { true }
  end

  factory :user do
    name { Faker::Company.name }
    email { Faker::Internet.email }
    bio { Faker::Lorem.paragraph }
    role { Faker::Lorem.word }
    github { Faker::Internet.url }
    quora { Faker::Internet.url }
    twitter { Faker::Internet.url }
    facebook { Faker::Internet.url }
    linked_in { Faker::Internet.url('example.com/in') }
    blog { Faker::Internet.url }
    about { Faker::Lorem.paragraph }
    hometown { Faker::Address.city }
    current_location { Faker::Address.city }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    position { Faker::Lorem.word }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    company { Faker::Company.name }
    location { Faker::Address.city }
    picture_url { Faker::Internet.url }
    created_at { "2000-01-01" }
    updated_at { "2000-01-01" }
    cohort
  end

  factory :pairing do
    requestor_id { 98 }
    responder_id { 99 }
    requestor_feedback { Faker::Lorem.paragraph }
    responder_feedback { Faker::Lorem.paragraph }
    hangout_url  { Faker::Internet.url }
    created_at { "2000-01-01" }
    updated_at { "2000-01-01" }
  end

end
