DBCconnect::Application.routes.draw do

  root to: 'users#index'

  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]

  get '/auth/:provider/callback', to: 'sessions#create'

end
