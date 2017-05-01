module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user 

    def connect 
      self.current_user = find_verified_user 
    end 

    private 

      def find_verified_user
        begin
          token = request.params[:token]
          decoded_token = Auth.decode_token(token)
          user_id = decoded_token[0]["user_id"]
          if current_user = User.find_by(id: user_id)
            current_user
          else
            reject_unauthorized_connection
          end
        rescue
          reject_unauthorized_connection
        end
      end
  end
end
