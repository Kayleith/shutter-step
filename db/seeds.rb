# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bot1 = User.create([{first_name: "wiki",
                     last_name: "bot",
                     password: "robotsrule",
                     username:"bot1",
                     email: "bot1@robotrevolution.com",
                     birthday: Date.new(1997,8,29),
                     sex: "robot" }])
