FactoryGirl.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    username { Faker::Internet.unique.user_name }
    email { Faker::Internet.unique.email }
    password "passsword"
  end
end