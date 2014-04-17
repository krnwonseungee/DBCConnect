
all_boots = DBC::User.all
all_cohorts = DBC::Cohort.all

NUM_OF_QUOTES = 6

quote_author_arr = [
    "Confusion is the feeling that comes before understanding.",
    "The middle of every successful project looks like a disaster.",
    "Luck is when preparedness meets opportunity, and opportunity is everywhere.",
    "Make no little plans; they have no magic to stir men's blood.",
    "The indispensable first step to getting the things you want out of life is this: decide what you want.",
    "Opportunity dances with those who are already on the dance floor."
]
quote_content_arr = [
    "Shereef Bishay",
    "Rosabeth Moss Cantor",
    "Earl Nightingale",
    "Daniel Burnham",
    "Ben Stein",
    "H. Jackson Brown Jr."
]

all_cohorts.each do |cohort|
  c = Cohort.create(
    id: cohort.id,
    name: cohort.name,
    location: cohort.location,
    start_date: cohort.start_date,
    email: cohort.email
    )
end

all_boots.each do |boot|
  user = User.create(
    id: boot.id,
    name: boot.name,
    email: boot.email,
    bio: boot.bio,
    cohort_id: boot.cohort_id,
    role: boot.roles[0],
    github: boot.profile[:github],
    quora: boot.profile[:quora],
    twitter: boot.profile[:twitter],
    facebook: boot.profile[:facebook],
    linked_in: boot.profile[:linked_in],
    blog: boot.profile[:blog],
    about: boot.profile[:about],
    hometown: boot.profile[:hometown],
    current_location: boot.profile[:current_location]
    )
end

NUM_OF_QUOTES.times do |i|
    quote = Quote.create(
        content: quote_author_arr[i - 1],
        author: quote_content_arr[i - 1]
    )
end
