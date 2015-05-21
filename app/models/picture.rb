class Picture < ActiveRecord::Base
  validates :title, :image, :user_id, :lat, :lng, presence: true
  validates :description, length: { maximum: 140, allow_nil: true }

  has_attached_file :image, :styles => { :thumb => "100x100>" }, :default_url => "missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  belongs_to :user
end
