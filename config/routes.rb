Rails.application.routes.draw do
  root 'home#index'

  namespace :v1, defaults: { format: :json } do
    resources :authors
    post '/sign-up', to: 'users#sign_up'
    post '/sign-in', to: 'users#sign_in'
  end

  get '/*path', to: 'home#index'
end
