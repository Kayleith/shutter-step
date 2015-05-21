module Api
  class PicturesController < ApiController
    def create
      @picture = current_user.pictures.new(picture_params)
      if @picture.save
        render :show
      else
        render json: @picture.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @picture = Picture.find(params[:id])
      @picture.destroy!
      render json: @picture
    end

    def show_by_user
      @pictures = User.find(params[:id]).pictures
      @pictures_total = @pictures.count
      @pictures = @pictures.page(params[:page]).per(20)
      @page = params[:page].to_i
      @total_pages = @pictures.total_pages
      render :search
    end

    def show
      @picture = Picture.find(params[:id])
      render :show
    end

    def search
      # @pictures = filter_pictures(filter_options)
      # render json: @pictures.page(params[:page])
      @pictures = Picture.all.page(params[:page]).per(20)
      @pictures_total = Picture.all.count
      @page = params[:page].to_i
      @total_pages = @pictures.total_pages # thanks kaminari!
      render :search
    end

    private
    def filter_options
      # Good to cover our bases with some defaults, in case no query string comes
      # in. :)
      options = {
        'lat' => [params[:lat1].to_f, params[:lat2].to_f],
        'lng' => [params[:lng1].to_f, params[:lng2].to_f]
      } || {}
      defaults = {
        'lat' => [40.611268808496895, 40.83867202705786],
        'lng' => [-74.119443744421, -73.87431129813194]
      }

      defaults.merge(options)
    end

    def filter_pictures(filter_data)
      # At the moment this only filters by latitude and longitude, but we can
      # expand it later to cover additional constraints.
      binds = {
        :lat_min => filter_data['lat'][0],
        :lat_max => filter_data['lat'][1],
        :lng_min => filter_data['lng'][0],
        :lng_max => filter_data['lng'][1]
      }

      if binds[:lng_min].to_f > binds[:lng_max].to_f
        # Wrap around the International Date Line
        Picture.where(<<-SQL, binds)
          pictures.lng BETWEEN :lng_min AND 180
            OR pictures.lng BETWEEN -180 AND :lng_max
        SQL
      else
        Picture.where(<<-SQL, binds)
          pictures.lat BETWEEN :lat_min AND :lat_max
            AND pictures.lng BETWEEN :lng_min AND :lng_max
        SQL
      end
    end

    def picture_params
      params.require(:picture).permit(:title, :user_id, :description, :image, :lng, :lat)
    end
  end
end
