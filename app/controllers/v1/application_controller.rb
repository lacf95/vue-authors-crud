module V1
  class ApplicationController < ActionController::API
    protected

    def authenticate_request!
      unless user_id_token? && User.find_by(id: @auth_token[:user_id])
        return render auth_error
      end
    rescue JWT::VerificationError, JWT::DecodeError
      render auth_error
    end

    private

    def auth_error
      {
        json: { credentials: ['Not Authenticated'] },
        status: :unauthorized
      }
    end

    def http_token
      auth_string if auth_present?
    end

    def auth_present?
      request.headers['Authorization'].present?
    end

    def auth_string
      request.headers['Authorization'].split(' ').last
    end

    def decode_auth_token
      @auth_token ||= JsonWebToken.decode(http_token)
    end

    def user_id_token?
      http_token && decode_auth_token && @auth_token[:user_id].to_i
    end
  end
end
