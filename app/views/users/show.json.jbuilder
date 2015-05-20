json.extract! @user, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
json.original_image_url asset_path(@user.avatar.url(:original))
json.thumb_image_url asset_path(@user.avatar.url(:thumb))
