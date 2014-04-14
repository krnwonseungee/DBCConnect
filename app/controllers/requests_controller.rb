class RequestsController < ApplicationController
  def create
    req = current_user.requests.create(responder_id: params[:responder_id].to_i)
    render json: {success: "hello"}
  end

  def index
    search_result = Request.find_by_responder_id(current_user.id)
    if search_result
      #do the hangout thing
      requestor_id = search_result.user_id
      search_result.destroy
      render json: {found: true, requestor_id: requestor_id}
    else
      render json: {found: false}
    end
  end
end
