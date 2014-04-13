class RequestsController < ApplicationController
  def create
    p "$"*200
    p params
    current_user.requests.create(responder_id: params[:responder_id].to_i)
    render json: {success: "hello"}
  end

  def index
    search_result = Request.find_by_responder_id(current_user.id)
    if search_result
      #do the hangout thing
      search_result.destroy
      render json: {found: true}
    else
      render json: {found: false}
    end
  end
end
