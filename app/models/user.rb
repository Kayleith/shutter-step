class User < ActiveRecord::Base

  has_attached_file :avatar, :styles => { :large => "600x600>", :thumb => "100x100>" }, :default_url => "missing.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  attr_reader :password

  after_initialize :ensure_session_token

  validates :first_name, :last_name, :sex, :birthday, :username, :email, :password_digest, :session_token, presence: true
  validates :username, length: { minumm: 6, maximum: 14}
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :username, :email, uniqueness: true

  has_many :pictures, dependent: :destroy
  has_many :active_relationships,  class_name:  "Relationship",
                                   foreign_key: "follower_id",
                                   dependent:   :destroy
  has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy

  has_many :following, through: :active_relationships,  source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  def self.find_by_credentials(name, password)
    if(User.exists?(username: name))
      user = User.find_by(username: name)
    elsif(User.exists?(email: name))
      user = User.find_by(email: name)
    end
    user.try(:is_password?, password) ? user : nil
  end

  def self.generate_session_token
    loop do
      random_token = SecureRandom::urlsafe_base64(16)
      return random_token unless User.exists?(session_token: random_token)
    end
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(unencrypted_password)
    if unencrypted_password.present?
      @password = unencrypted_password
      self.password_digest = BCrypt::Password.create(unencrypted_password)
    end
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  # Follows a user.
  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  # Unfollows a user.
  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end

  protected

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
