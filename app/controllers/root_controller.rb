class RootController < ApplicationController

  def root
    render "root"
  end

  def test
    render "testLandingPage"
  end
end
