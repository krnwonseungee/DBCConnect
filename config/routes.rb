DBCconnect::Application.routes.draw do
  root 'users#index'
  resources :users do
    resources :requestors
    resources :responders
  end

  # resources :pairings, only: [:index, :show, :create, :update]
  resources :cohorts, only: [:index, :show]
end
