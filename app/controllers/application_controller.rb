class ApplicationController < ActionController::API
  helper_method :authenticate_token!, :current_user 

  private 

    def authenticate_token!
      if request.env["HTTP_AUTHORIZATION"]
        begin
          errors = []
          token = request.env["HTTP_AUTHORIZATION"].split(" ")[1]
          decoded = Auth.decode_token(token)
          @user_id = decoded[0]["user_id"] if decoded
        rescue JWT::DecodeError
          errors.push({ message: 'A valid token must be passed!' })
        rescue JWT::ExpiredSignature
          errors.push({ message: 'The token has expired.' })
        rescue JWT::InvalidIssuerError
          errors.push({ message: 'The token does not have a valid issuer.' })
        end

        if !current_user || !decoded || errors.length > 0
          render json: { 
            errors: errors
          }, status: 403
        end
      else 
        render json: { 
            errors: [ 
              { message:  "You must include a JWT Token!"  }
            ]
          }, status: 403
      end
    end 

    def current_user
      @user ||= User.find_by(id: @user_id) if @user_id
    end
end
