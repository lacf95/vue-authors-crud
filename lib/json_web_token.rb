class JsonWebToken
  def self.encode(payload)
    encode_token(payload)
  end

  def self.decode(token)
    decode_token(token)
  end

  private

  def self.encode_token(payload)
    JWT.encode(payload, secret_key)
  end

  def self.decode_token(token)
    payload_hash(JWT.decode(token, secret_key)[0])
  end

  def self.payload_hash(decoded_token)
    HashWithIndifferentAccess.new(decoded_token)
  end

  def self.secret_key
    Rails.application.secrets.secret_key_base
  end
end
