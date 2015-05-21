json.extract! @picture, :id, :user_id, :title, :description, :lat, :lng, :created_at, :updated_at
json.thumb_image_url asset_path(@picture.image.url(:thumb))
json.original_image_url asset_path(@picture.image.url(:original))
