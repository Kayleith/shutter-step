json.extract! @current_user, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
json.followers @current_user.followers do |follower|
  json.extract! follower, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
end
json.following @current_user.following do |following|
  json.extract! following, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
end
json.pictures @current_user.pictures do |picture|
	json.extract! picture, :user_id, :title, :description, :url, :lat, :lng,  :created_at, :updated_at
end