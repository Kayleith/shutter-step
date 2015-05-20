json.array! @users do |user|
  json.extract! user, :id, :first_name, :last_name, :username, :created_at, :updated_at
  json.thumb_image_url asset_path(user.avatar.url(:thumb))
end
