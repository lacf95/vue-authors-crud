Rails.application.routes.draw do
  root 'authors#index'
  resources :authors
  namespace :v1 do
    resources :authors
  end
end
