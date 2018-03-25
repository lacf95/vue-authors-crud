Rails.application.routes.draw do
  root 'home#index'

  namespace :v1, defaults: { format: :json } do
    resources :authors
  end

  get '/*path', to: 'home#index'
end
