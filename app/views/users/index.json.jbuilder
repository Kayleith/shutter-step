json.array! @users do |user|
  json.extract! user, :id, :first_name, :last_name, :username, :birthday, :sex,  :created_at, :updated_at
end
