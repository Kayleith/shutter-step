Rails.application.routes.draw do
  root to: "root#root"
  get '/login', to: 'root#login', as: "login"
  get '/users/search', to: 'users#search', as: "searchUser"
  resource :session, only: [:show, :create, :destroy], defaults: {format: :json}
  resource :relationships, only: [:create, :destroy], defaults: {format: :json}
  resources :users, defaults: {format: :json} do
    member do
      get :following, :followers
    end
  end
  get '/api/pictures/search', to: 'api/pictures#search', as: "searchPicture"
  namespace :api, defaults: {format: :json} do
    resources :pictures
  end
end
