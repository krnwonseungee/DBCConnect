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
    #wait, didn't your before filter already calculate this for you?
    #  I would almost call this a bad use of DRY. You did something to be DRY
    #  but it wound up kind of sucking.

    pairing = Pairing.find(params[:id])
    if pairing.update(pairing_params)
      render json: { success: true, pairing: pairing }.to_json
    else
      render json: { success: false }
    end
  end


  # should this be private?
  #The route waits for a put request created by the hangout app gadget
  def update_hangout_info
    # Down the road, should have a better way of finding the correct pair
    # Could break if there's more than one request e.g. returning one pair's link to a different pair
    pairing = Pairing.last
    pairing.update(hangout_url: params[:hangout_url])
    render json: { success: false }
  end

  private
    def set_pairing
      @pairing = Pairing.find(params[:id])
    end

    def pairing_params
      params.require(:pairing).permit(:id,:requestor_id,:responder_id,
        :requestor_feedback,:responder_feedback,:hangout_url,:created_at,:updated_at)
    end
end


