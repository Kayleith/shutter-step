json.models do
  json.array! @pictures do |picture|
    json.extract! picture, :id, :user_id, :title, :description, :lat, :lng, :created_at, :updated_at
    json.thumb_image_url asset_path(picture.image.url(:thumb))
    json.original_image_url asset_path(picture.image.url(:original))
  end
end
json.page @page
json.total_pages @total_pages
json.pictures_total @pictures_total
