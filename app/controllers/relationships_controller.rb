class RelationshipsController < ApplicationController
  before_action :signed_in?

 def create
   @user = User.find(params[:followed_id])
   @follow = current_user.follow(@user)
   render json: {}
 end

 def destroy
   @user = User.find(params[:id])
   @follow = current_user.unfollow(@user)
   render json: {}
 end
end
