DBCconnect::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  get '/', to: 'welcome#index'
  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]
end
