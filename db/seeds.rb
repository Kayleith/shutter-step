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

500.times do
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
randomURL = ["http://i667.photobucket.com/albums/vv39/marie58_bucket/Funny/485588_481258538613952_550173339_n.jpg",
             "http://i223.photobucket.com/albums/dd245/2ndsite/Funny%20Stuff/i3608_kxc8zdesandcastly.jpg",
             "http://i223.photobucket.com/albums/dd245/2ndsite/Funny%20Stuff/OhGRATE.jpg",
             "http://i210.photobucket.com/albums/bb270/Lizaer/All%20things%20witch/Oceanfullmoon.jpg",
             "http://i905.photobucket.com/albums/ac251/YelowRose_2010/YelowRose_2010-Nature%20and%20Others/enna-nature-labrujita-inspiration_large.jpg",
             "http://i905.photobucket.com/albums/ac251/YelowRose_2010/YelowRose_2010-Nature%20and%20Others/256_1276413047476jpg-image-nature-flowers_large.jpg",
             "http://i905.photobucket.com/albums/ac251/YelowRose_2010/YelowRose_2010-Nature%20and%20Others/Picture001.jpg",
             "http://i661.photobucket.com/albums/uu332/ilovemooks/nature-1.jpg",
             "http://i203.photobucket.com/albums/aa93/wakebabe414/nature-438907.jpg",
             "http://i197.photobucket.com/albums/aa231/sterling_red/landscape.jpg",
             "http://i378.photobucket.com/albums/oo229/fairydancer464/Nature/storm.jpg",
             "http://i952.photobucket.com/albums/ae3/redbulldrinker9/weather101_tornadoes7.jpg",
             "http://i414.photobucket.com/albums/pp228/sweetblonda/NATURE-nice-.jpg",
             "http://i414.photobucket.com/albums/pp228/sweetblonda/Nature-forest.jpg",
             "http://i952.photobucket.com/albums/ae3/redbulldrinker9/16083.jpg",
             "http://i952.photobucket.com/albums/ae3/redbulldrinker9/16083.jpg",
             "http://i278.photobucket.com/albums/kk105/gesells/AumZoQ350744-021.jpg",
             "http://i952.photobucket.com/albums/ae3/redbulldrinker9/16826.jpg",
             "http://i414.photobucket.com/albums/pp228/sweetblonda/natura-sprin.jpg",
             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78jNxZ0GAc06aNykodUan8IPWgrz7SaM6v11YvUZl5WhCY59lavrUctTf"
            ]
5000.times do
  Picture.create(
    user_id: (rand(usernumber) + 1),
    title: Faker::Hacker.ingverb,
    description: Faker::Hacker.say_something_smart,
    url: randomURL[rand(20)],
    lat: (rand * 170) - 85,
    lng: (rand * 360) - 180
  )
end

usernumber.times do |i|
  user1 = i + 1
  user2 = (user1 + rand(usernumber - user1) + 1)
  while(user1 < user2) do
    Relationship.create({follower_id: user1, followed_id: user2})
    user1 += 1
  end
end
