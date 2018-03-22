class Author < ActiveRecord::Base
  validates :first_name, presence: true, length: { minimum: 3, maximum: 30 }, on: %i[create update]
  validates :last_name, presence: true, length: { minimum: 3, maximum: 30 }, on: %i[create update]
  validates :email, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: %i[create update]}

  def full_name
    "#{first_name} #{last_name}"
  end
end
