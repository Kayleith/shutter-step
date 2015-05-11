class Picture < ActiveRecord::Base
  validates :title, :url, :user_id, :lat, :lng, presence: true
  validates :description, length: { maximum: 140, allow_nil: true }

  belongs_to :user
end
