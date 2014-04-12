DBCconnect::Application.routes.draw do
  root 'users#index'
  get 'maps/index'

  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]
end
