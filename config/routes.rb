DBCconnect::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  # root 'users#index'
  
  get '/', to: 'welcome#index'
  get '/welcome', to: 'welcome#main'
  get '/welcome/getuser', to: 'welcome#user'
  
  get "/users/active", to: "users#get_active_users"

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/log_out', to: 'sessions#destroy', :as => 'log_out'
  
  post '/requests', to: 'requests#create', as: 'create'
  get '/requests', to: 'requests#index', as: 'index' #show the ones that asked for you
  
  resources :users 

  resources :cohorts, only: [:index, :show]
  resources :pairings
end
