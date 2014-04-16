class PairingsController < ApplicationController
  before_action :set_pairing, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  def allow_cors
    set_headers
    head(:ok) if request.request_method == "OPTIONS"
    # or, render text: ''
    # if that's more your style
  end

  def index
    pairings = Pairing.where("requestor_id = ? OR responder_id = ?",current_user.id,current_user.id)
    render json: { pairings: pairings }.to_json
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
    @pairing = Pairing.find(params[:pairing_id])
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

  def get_hangout_url #DOES THIS COMPARISON ACCOUNT FOR STRING INSTEAD OF INT IN THE ID???
    @pairing = Pairing.where("requestor_id = ? AND responder_id = ?",params[:requestor_id],current_user.id).first
    
    if @pairing && @pairing.hangout_url
      @pairing.destroy      
      render json: { success: true, hangout_url: @pairing.hangout_url }
    else
      render json: { success: false}
    end
  end

  #The route waits for a put request created by the hangout app gadget
  def update_hangout_info
    set_headers
    # Down the road, should have a better way of finding the correct pair
    # Could break if there's more than one request e.g. returning one pair's link to a different pair
    # UPDATE -> SHOULD USE THE 'start_data' IN THE GOOGLE HANGOUT BUTTON TO PASS USER ID
    pairing = Pairing.last
    pairing.update(hangout_url: params[:hangout_url])
    render json: { success: false }
  end

  private
    def set_headers
      headers["Access-Control-Allow-Origin"] = "*"
      headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE}.join(",")
      headers["Access-Control-Allow-Headers"] =
        %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
    end

    def set_pairing
      @pairing = Pairing.find(params[:id])
    end

    def pairing_params
      params.require(:pairing).permit(:id,:requestor_id,:responder_id,
        :requestor_feedback,:responder_feedback,:hangout_url,:created_at,:updated_at)
    end
end


