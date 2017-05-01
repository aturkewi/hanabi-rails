module ApplicationCable
  class Channel < ActionCable::Channel::Base
    
    def render_errors(errors) 
      ApplicationController.renderer.render(json: { errors: errors })
    end
    
  end
end
