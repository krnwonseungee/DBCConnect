
all_boots = DBC::User.all
all_cohorts = DBC::Cohort.all

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
