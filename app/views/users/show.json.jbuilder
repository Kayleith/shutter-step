json.extract! @user, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
json.followers @user.followers do |follower|
  json.extract! follower, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
end
json.following @user.following do |following|
  json.extract! following, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
end
json.pictures @user.pictures do |picture|
	json.extract! picture, :user_id, :title, :description, :url, :lat, :lng,  :created_at, :updated_at
end
