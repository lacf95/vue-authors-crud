class User < ApplicationRecord
  has_secure_password

  validates :first_name, presence: true, length: {
    minimum: 3, maximum: 30
  }, on: %i[create update]
  validates :last_name, presence: true, length: {
    minimum: 3, maximum: 30
  }, on: %i[create update]
  validates :email, uniqueness: true, format: { 
      with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
  }, on: %i[create update]

  def self.sign_in(credential)
    user = User.find_by(email: credential[:email])
    user if user && user.authenticate(credential[:password])
  end
end
