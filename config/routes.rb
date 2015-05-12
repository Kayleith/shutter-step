Rails.application.routes.draw do
  root to: "root#root"
  get '/main', to: 'root#main', as: "main"
  resource :session, only: [:new, :create, :destroy]
  resources :users, except: [:index, :edit]
  
  get '/api/pictures/search', to: 'api/pictures#search', as: "search"
  namespace :api, defaults: {format: :json} do
    resources :pictures
  end
end
