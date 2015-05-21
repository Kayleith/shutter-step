Rails.application.routes.draw do
  root to: "root#root"
  get '/test', to: 'root#test', as: "test"
  get '/users/search', to: 'users#search', as: "searchUser"
  get 'followers', to: 'users#followers', as: "getFollowers", defaults: {format: :json}
  get 'following', to: 'users#following', as: "getFollowing", defaults: {format: :json}
  resource :session, only: [:show, :create, :destroy], defaults: {format: :json}
  resource :relationships, only: [:create, :destroy], defaults: {format: :json}
  resources :users, defaults: {format: :json}
  get '/api/pictures/showbyuser', to: 'api/pictures#show_by_user', as: "showByUser"
  get '/api/pictures/search', to: 'api/pictures#search', as: "searchPicture"
  namespace :api, defaults: {format: :json} do
    resources :pictures, only: [:create, :show, :destroy]
  end
end
