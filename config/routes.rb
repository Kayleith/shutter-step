Rails.application.routes.draw do
  root to: "root#root"
  get '/main', to: 'root#main', as: "main"
  resource :session, only: [:new, :create, :destroy]
  resources :users, except: [:index, :edit]

  namespace :api, defaults: {format: :json} do
    # resources(:root)
  end
end
