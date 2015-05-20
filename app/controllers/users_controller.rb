class UsersController < ApplicationController
  before_action :set_user, :except => [:index, :new, :create, :search]
  wrap_parameters false

  def new
    @user = User.new
  end

  def index
    @users = User.all
    render :index
  end

  def create
    date = Date.new(params["DOBYear"].to_i, params["DOBMonth"].to_i, params["DOBDay"].to_i)
    @user = User.new(user_params.merge({birthday: date}))

    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
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
    @users = @user.following

    @following_total = @users.count
    @users = Kaminari.paginate_array(@users.shuffle).page(params[:page]).per(9)
    @page = params[:page].to_i
    @total_pages = @users.total_pages # thanks kaminari!

    render :following
  end

  def followers
    @users = @user.followers

    @followers_total = @users.count
    @users = Kaminari.paginate_array(@users.shuffle).page(params[:page]).per(9)
    @page = params[:page].to_i
    @total_pages = @users.total_pages # thanks kaminari!

    render :followers
  end

  def update
    if(@user.id == current_user.id)
      if @user.update(user_params)
        render :show, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end
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
      params.require(:user).permit(:first_name, :last_name, :sex, :username, :email, :password, :session_token, :avatar)
    end
end
