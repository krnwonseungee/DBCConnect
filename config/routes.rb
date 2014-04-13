DBCconnect::Application.routes.draw do

  get '/auth/:provider/callback', to: 'sessions#create'

  root 'users#index'

  #test route for sidebar_avail_users
  # get 'users/sidebar_avail', to: 'users#sidebar_avail', as: 'sidebar_avail'

  resources :cohorts, only: [:index, :show]


end
