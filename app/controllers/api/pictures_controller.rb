class PicturesController < ApplicationController
  def create
    @picture =
  end
  def picture_params
    params.require(:picture).permit(:title, :user_id, :description, :url, :lng, :lat)
  end
end
