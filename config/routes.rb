DBCconnect::Application.routes.draw do
  root 'users#index'
  #test route for sidebar_avail_users
  get 'users/sidebar_avail', to: 'users#sidebar_avail', as: 'sidebar_avail'

  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]


end
