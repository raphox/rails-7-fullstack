Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :kit do
    resources :products, :components
  end

  scope :api, as: 'api', defaults: { format: 'json' } do
    namespace :kit do
      resources :products, :components
    end
  end

  # Defines the root path route ("/")
  root 'kit/products#index'
end
