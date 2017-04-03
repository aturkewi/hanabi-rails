FactoryGirl.define do
  factory :game_card do
    game
    hand nil
    location 1
    display_color false
    display_number false
    color "Blue"
    number 1
  end
end
