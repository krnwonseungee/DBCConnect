DBCconnect::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  # root 'users#index'
  
  get '/', to: 'welcome#index'
  get "/users/active", to: "users#get_active_users"

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/log_out', to: 'sessions#destroy', :as => 'log_out'
  post '/requests', to: 'requests#create', as: 'create'
  post '/users/active', to: 'users#active', as: 'active_mode'
  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]
end
