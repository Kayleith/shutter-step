class SessionsController < ApplicationController
  before_action :require_signed_out!, only: [:new, :create]
  before_action :require_signed_in!, only: [:destroy]

  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:name],
      params[:password]
    )

    if @user
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email or password."]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to main_url
  end
end
