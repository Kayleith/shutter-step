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

alb = ('a'..'z').to_a
sampleProfiles = alb.map{|letter| letter + ".png"}.concat(alb.map{|letter| letter*2 + ".png"}).concat(alb.map{|letter| letter*3 + ".png"})

100.times do
  a = User.new(
    {first_name: Faker::Name.first_name,
     last_name: Faker::Name.last_name,
     password: "password",
     username: Faker::Internet.user_name,
     email: Faker::Internet.email,
     birthday: Faker::Date.backward(36500),
     sex: rand(2) == 1 ? "Male" : "Female"})

  a.avatar = File.new(::Rails.root.join("app", "assets", "images", "testuser", sampleProfiles[rand(78)]))
  a.save
end

usernumber = User.all.count
samplePictures = alb.map{|letter| letter + ".jpg"}.concat(alb.map{|letter| letter*2 + ".jpg"}).concat(alb.map{|letter| letter*3 + ".jpg"}).concat(alb.map{|letter| letter*4 + ".jpg"}).concat(alb.map{|letter| letter*5 + ".jpg"}).concat(alb.map{|letter| letter*6 + ".jpg"})

1000.times do
  a = Picture.new(
    user_id: (rand(usernumber) + 1),
    title: Faker::Hacker.ingverb,
    description: Faker::Hacker.say_something_smart,
    lat: (rand * 170) - 85,
    lng: (rand * 360) - 180
  )
  a.image = File.new(::Rails.root.join("app", "assets", "images", "testpicture", samplePictures[rand(78)]))
  a.save
end

usernumber.times do |i|
  user1 = i + 1
  user2 = (user1 + rand(usernumber - user1) + 1)
  while(user1 < user2) do
    a = Relationship.new({follower_id: user1, followed_id: user2})
    a.save
    user1 += 1
  end
end

usernumber.times do |i|
  user1 = usernumber - (i)
  user2 = (rand(usernumber - user1) + 1)
  while(user1 > user2) do
    a = Relationship.new({follower_id: user1, followed_id: user2})
    a.save
    user1 -= 1
  end
end
