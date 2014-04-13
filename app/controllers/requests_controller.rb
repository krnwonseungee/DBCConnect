class RequestsController < ApplicationController
  def create
    p "$"*100
    p params
    current_user.requests.create(responder_id: params[:responder_id].to_i)
    render json: {success: "hello"}
  end
end
