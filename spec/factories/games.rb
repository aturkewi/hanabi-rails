FactoryGirl.define do
  factory :game do
    title  { Faker::GameOfThrones.unique.character }
    status 0
    
    factory :game_ready do
      transient do
        users_count 4
      end
      
      after(:create) do |game, evaluator|
        create_list(:user, evaluator.users_count, games: [game])
      end
    end
    
  end
end
