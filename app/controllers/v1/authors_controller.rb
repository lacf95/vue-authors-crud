module V1
  class AuthorsController < V1::ApplicationController
    before_action :find_author, only: %i[show update destroy]

    def index
      @authors = Author.order(last_name: :asc)
    end

    def show
    end

    def create
      @author = Author.new
      save_author
    end

    def update
      save_author
    end

    def destroy
      @author.destroy
    end

    private

    def save_author
      @author.assign_attributes(author_params)
      if @author.save
        render 'show'
      else
        render(json: @author.errors, status: 400)
      end
    end

    def find_author
      @author = Author.find(params[:id])
    end

    def author_params
      params.require(:author).permit(:first_name, :last_name, :email, :nationality)
    end
  end
end
