FactoryGirl.define do
  factory :game do
    title  { Faker::GameOfThrones.unique.character }
    status 0
  end
end
