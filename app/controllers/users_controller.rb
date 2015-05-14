class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :require_signed_out!, only: [:new]
  before_action :require_signed_in!, only: [:edit, :update, :destroy,
                                        :following, :followers]

  def new
    @user = User.new
  end

  def create
    date = Date.new(params["DOBYear"].to_i, params["DOBMonth"].to_i, params["DOBDay"].to_i)
    @user = User.new(user_params.merge({birthday: date}))

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def search
    if params[:query].present?
      @users = User.where("username ~ ? OR first_name ~ ? OR last_name ~ ?", params[:query], params[:query], params[:query])
    else
      @users = nil
    end
    render :search
  end

  def show
  end

  def following
    @user  = User.find(params[:id])
    @users = @user.following.page(params[:page])
    render json: @users
  end

  def followers
    @user  = User.find(params[:id])
    @users = @user.followers.page(params[:page])
    render json: @users
  end
  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  # def update
  #   respond_to do |format|
  #     if @user.update(user_params)
  #       format.html { redirect_to @user, notice: 'User was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @user }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @user.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end
  #
  # # DELETE /users/1
  # # DELETE /users/1.json
  # def destroy
  #   @user.destroy
  #   respond_to do |format|
  #     format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :sex, :username, :email, :password, :session_token)
    end
end
