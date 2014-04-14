DBCconnect::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  # root 'users#index'

  get '/', to: 'welcome#index', as: 'root'

  get '/welcome', to: 'welcome#main'
  get '/welcome/getuser', to: 'welcome#user'

  get "/users/active", to: "users#get_active_users"
  post "/users/results", to: "users#results"

  get '/auth/:provider/callback', to: 'sessions#create'
  get '/log_out', to: 'sessions#destroy', :as => 'log_out'

  post '/requests', to: 'requests#create', as: 'create'
  get '/requests', to: 'requests#index', as: 'index' #show the ones that asked for you

  # Hangout app gadget sends ajax to this once hangout created
  put '/pairings/update_hangout_info', to: 'pairings#update_hangout_info'

  resources :users

  resources :cohorts, only: [:index, :show]
  resources :pairings
end
