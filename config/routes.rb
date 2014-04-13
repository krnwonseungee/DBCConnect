DBCconnect::Application.routes.draw do

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/log_out', to: 'sessions#destroy', :as => 'log_out'
  root 'users#index'

  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]


end
