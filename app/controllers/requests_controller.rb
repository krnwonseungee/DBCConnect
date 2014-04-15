class RequestsController < ApplicationController
  def create
    req = current_user.requests.create(responder_id: params[:responder_id].to_i)
    Pairing.create(requestor_id: current_user.id, 
      responder_id: params[:responder_id].to_i)
    render json: {success: "hello"}
  end

  def request_polling
    current_user_id = current_user.id
    search_result = Request.find_by_responder_id(current_user_id)
    if search_result
      render json: {found: true, requestor_id: requestor_id}
    else  
      render json: {found: false, current_user_id: current_user_id}
    end
  end

  # def index
  #   current_user_id = current_user.id
  #   search_result = Request.find_by_responder_id(current_user_id)
  #   if search_result
  #     #do the hangout thing
  #     requestor_id = search_result.user_id
  #     #this line needs refactoring to get the right
  #     poll_for_url = Thread.new do 
  #       while (!hangout_url = Pairing.find_by_responder_id(current_user_id).hangout_url)
  #         sleep(0.5)
  #       end
  #       render json: {found: true, requestor_id: requestor_id, url: hangout_url}
  #     end
  #     Thread.kill(poll_for_url)
  #     search_result.destroy
  #     render json: {found: false, current_user_id: current_user_id}
  #   else
  #     render json: {found: false, current_user_id: current_user_id}
  #   end
  # end
end
#pending refactor - mode the delete to its own route