class RootController < ApplicationController
  before_action :require_signed_in!, only: [:root]
  before_action :require_signed_out!, only: [:main]

  def root
    render "root"
  end

  def main
    render "main"
  end
end
