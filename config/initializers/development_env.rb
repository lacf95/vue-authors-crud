unless Rails.env.production?
  ENV['TOKEN_EXPIRATION_TIME'] = '120'
end
