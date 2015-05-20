json.models do
  json.array! @users do |user|
    json.extract! user, :id, :first_name, :last_name, :username, :created_at, :updated_at
    json.thumb_image_url asset_path(user.avatar.url(:thumb))
  end
end
json.page @page
json.total_pages @total_pages
json.following_total @following_total
