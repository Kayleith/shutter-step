json.extract! @current_user, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
json.followers @current_user.followers do |follower|
  json.extract! follower, :id, :first_name, :last_name, :username
  json.thumb_image_url asset_path(follower.avatar.url(:thumb))
end
json.following @current_user.following do |following|
  json.extract! following, :id, :first_name, :last_name, :username
  json.thumb_image_url asset_path(following.avatar.url(:thumb))
end
json.pictures @current_user.pictures do |picture|
	json.extract! picture, :user_id, :title, :description, :url, :lat, :lng,  :created_at, :updated_at
end

json.original_image_url asset_path(@current_user.avatar.url(:original))
json.thumb_image_url asset_path(@current_user.avatar.url(:thumb))
