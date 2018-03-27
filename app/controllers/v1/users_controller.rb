module V1
  class UsersController < V1::ApplicationController
    wrap_parameters include: User.attribute_names + %i[password]

    def sign_up
      @user = User.new
      save_user
    end

    def sign_in
      @user = User.sign_in(credential_params)
      if @user
        @token = JsonWebToken.encode(user_id: @user.id)
        render 'show'
      else
        render json: {
          credentials: ['Wrong email and password combination']
        }, status: :unauthorized
      end
    end

    private

    def save_user
      @user.assign_attributes(user_params)
      if @user.save
        @token = JsonWebToken.encode(user_id: @user.id)
        render 'show'
      else
        render json: @user.errors, status: :bad_request
      end
    end

    def user_params
      params.require(:user).permit(
        :first_name, :last_name, :email, :password
      )
    end

    def credential_params
      params.permit(:email, :password)
    end
  end
end
