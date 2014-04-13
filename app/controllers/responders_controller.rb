class RespondersController < ApplicationController
  before_action :set_responder, only: [:show, :edit, :update]

  def index
    @responders = Responder.all
    render json: { responders: @responders }.to_json
  end

  def show
    render json: { responder: @responder }.to_json
  end

  def create
    user = User.find(params[:user_id])
    @responder = user.responders.new
    if @responder.save
      render json: { success: true, responder: @responder }.to_json
    else
      render json: { success: false }
    end

  end

  def edit
    render json: { responder: @responder }.to_json
  end

  def update
    if @responder.update(responder_params)
      render json: { success: true, responder: @responder }.to_json
    else
      render json: { success: false }
    end
  end

  private
    def set_responder
      @responder = Responder.where(id: params[:id], user_id: params[:user_id]).first
    end

    def responder_params
      params.require(:responder).permit(:id,:user_id,:feedback,:created_at,:updated_at)
    end

end
