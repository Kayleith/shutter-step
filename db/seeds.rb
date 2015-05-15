# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'json'
require 'open-uri'

bot1 = User.create({first_name: "wiki",
                     last_name: "bot",
                     password: "robotsrule",
                     username:"robot1",
                     email: "bot1@robotrevolution.com",
                     birthday: Date.new(1997,8,29),
                     sex: "robot" })

100.times do
  User.create(
    {first_name: Faker::Name.first_name,
     last_name: Faker::Name.last_name,
     password: "password",
     username: Faker::Internet.user_name,
     email: Faker::Internet.email,
     birthday: Faker::Date.backward(36500),
     sex: rand(2) == 1 ? "Male" : "Female"})
end
usernumber = User.all.count

3000.times do
  Picture.create(
    user_id: (rand(usernumber) + 1),
    title: Faker::HipsterIpsum.words(4),
    description: Faker::Hacker.say_something_smart,
    url: gallery.sample['url'],
    lat: (rand * 170) - 85,
    lng: (rand * 360) - 180
  )
end

1000.times do
  user1 = (rand(usernumber) + 1);
  user2 = (rand(usernumber) + 1);
  until(user1 != user2) do
    user1 = (rand(usernumber) + 1);
    user2 = (rand(usernumber) + 1);
  end
  Relationship.create({follower_id: user1, followed_id: user2})
end
