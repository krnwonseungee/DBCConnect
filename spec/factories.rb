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
    github { Faker::Internet.email }
    quora { Faker::Internet.email }
    twitter { Faker::Internet.email }
    facebook { Faker::Internet.email }
    linked_in { Faker::Internet.email }
    blog { Faker::Internet.email }
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
    picture_url { Faker::Internet.email }
    created_at { "2000-01-01" }
    updated_at { "2000-01-01" }
    cohort
  end

  factory :pairing do
    created_at { "2000-01-01" }
    updated_at { "2000-01-01" }
    requestor
    responder
  end


  factory :requestor do
    user
    feedback { Faker::Lorem.paragraph }
    created_at { "2000-01-01" }
    updated_at { "2000-01-01" }
  end

end
