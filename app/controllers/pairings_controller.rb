class PairingsController < ApplicationController
  before_action :set_pairing, only: [:show, :edit, :update, :destroy]

  def index
    @pairings = Pairing.where("requestor_id = ? OR responder_id = ?",current_user.id,current_user.id)
    render json: { pairings: @pairings }.to_json
  end

  def show
    render json: { pairing: @pairing }.to_json
  end

  def create
    @pairing = Pairing.new(pairing_params)
    if @pairing.save
      render json: { success: true, pairing: @pairing }.to_json
    else
      render json: { success: false }
    end
  end

  def edit
    render json: { pairing: @pairing }.to_json
  end

  def destroy
    if @pairing.destroy
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  def update
    if @pairing.update(pairing_params)
      render json: { success: true, pairing: @pairing }.to_json
    else
      render json: { success: false }
    end
  end

  private
    def set_pairing
      @pairing = Pairing.find(params[:id])
    end

    def pairing_params
      params.require(:pairing).permit(:id,:requestor_id,:responder_id,
        :requestor_feedback,:responder_feedback,:created_at,:updated_at)
    end
end


