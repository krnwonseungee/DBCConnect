DBCconnect::Application.routes.draw do
  get '/', to: 'welcome#index'
  resources :users do
    resources :requestors
    resources :responders
  end

  resources :cohorts, only: [:index, :show]
end
