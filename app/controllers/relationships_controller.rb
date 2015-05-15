class RelationshipsController < ApplicationController
  before_action :signed_in?

 def create
   @user = User.find(params[:followed_id])
   @follow = current_user.follow(@user)
   render @follow
 end

 def destroy
   @user = Relationship.find(params[:id]).followed
   @follow = current_user.unfollow(@user)
   render @follow
 end
end
