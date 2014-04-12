DBCconnect::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  get '/', to: 'welcome#index'
  get "/users/active", to: "users#get_active_users"

  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]
end
