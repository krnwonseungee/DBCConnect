
all_boots = DBC::User.all
all_cohorts = DBC::Cohort.all

all_cohorts.each do |cohort|
  c = Cohort.create(
    dbc_cohort_id: cohort.id,
    name: cohort.name,
    location: cohort.location,
    start_date: cohort.start_date,
    email: cohort.email
    )
end

all_boots.each do |boot|
  user = User.create(
    dbc_user_id: boot.id,
    name: boot.name,
    email: boot.email,
    bio: boot.bio,
    dbc_cohort_id: boot.cohort_id,
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

  # cohort = all_cohorts.select{|c| c.id == user.cohort_id}.first
  # user.cohort_id = cohort
  # user.cohort.create()
end

# Users only seed part way, up to id 278 or 283
# DBCconnect [seed] :> be rake db:seed
# rake aborted!
# ActiveRecord::StatementInvalid: PG::StringDataRightTruncation: ERROR:  value too long for type character varying(255)
# : INSERT INTO "users" ("about", "blog", "created_at", "current_location", "dbc_cohort_id", "dbc_user_id", "email", "facebook", "github", "hometown", "linked_in", "name", "quora", "role", "twitter", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING "id"
# /Users/eric/Documents/DBC_Connect/DBCconnect/db/seeds.rb:16:in `block in <top (required)>'
# /Users/eric/Documents/DBC_Connect/DBCconnect/db/seeds.rb:15:in `each'
# /Users/eric/Documents/DBC_Connect/DBCconnect/db/seeds.rb:15:in `<top (required)>'
# Tasks: TOP => db:seed
# (See full trace by running task with --trace)
