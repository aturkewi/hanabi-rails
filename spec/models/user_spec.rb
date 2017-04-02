require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do 

    it 'requires a username, email, and password upon creation' do 
      user = build(:user, username: nil, email: nil, password: nil)

      expect(user.valid?).to equal(false)
      expect(user.errors.full_messages).to eq(["Password can't be blank", "Email can't be blank", "Username can't be blank"])
    end 

    it 'requirs that a username and email are unique' do 
      create(:user)
      user = build(:user)

      expect(user.valid?).to equal(false)
      expect(user.errors.full_messages).to eq(["Email has already been taken", "Username has already been taken"])
    end
  end
end
