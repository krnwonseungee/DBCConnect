class PairingsController < ApplicationController
  def index
    pairings = Pairing.all
    render json: { pairings: pairings }.to_json
  end

  def show
    pairing = Pairing.find(params[:id])
    render json: { pairing: pairing }.to_json
  end

  def create
    pairing = Pairing.new(params)
    if pairing.save
      redirect_to root_path
    else
      redirect_to new_pairing_path
    end
  end

  def edit
    pairing = Pairing.find(params[:id])
    render json: { pairing: pairing }.to_json
  end

  def update
    pairing = Pairing.find(params[:id])
    if pairing.update(params)
      redirect_to pairing_path, notice: 'Pairing was successfully updated.'
      render json: { success: true, pairing: pairing }.to_json
    else
      render json: { success: false }
    end
  end

end
