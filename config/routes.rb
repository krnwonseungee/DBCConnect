DBCconnect::Application.routes.draw do

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/log_out', to: 'sessions#destroy', :as => 'log_out'
  root 'users#index'
  get 'maps/index'

  resources :pairings
  resources :users
  resources :cohorts, only: [:index, :show]

end
