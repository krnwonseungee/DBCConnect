DBCconnect::Application.routes.draw do

  get '/auth/:provider/callback', to: 'sessions#create'

  root 'users#index'

  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]


end
