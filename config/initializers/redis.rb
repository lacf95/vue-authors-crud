$redis = Redis.new(url: ENV['REDIS_URL'])

$redis.define_singleton_method(:save_token) do |token|
  set(token, true)
  expire(token, ENV['TOKEN_EXPIRATION_TIME'])
  get(token)
end
