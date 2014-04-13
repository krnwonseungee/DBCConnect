class RequestorController < ApplicationController
  before_action :set_requestor, only: [:show, :edit, :update]

  def index
    @requestors = Requestor.all
    render json: { requestors: @requestors }.to_json
  end

  def show
    render json: { requestor: @requestor }.to_json
  end

  def create
    @requestor = Requestor.new(requestor_params)
    if @requestor.save
      redirect_to root_path
    else
      redirect_to new_requestor_path
    end
  end

  def edit
    render json: { requestor: @requestor }.to_json
  end

  def update
    if @requestor.update(requestor_params)
      render json: { success: true, requestor: @requestor }.to_json
    else
      render json: { success: false }
    end
  end

  private
    def set_requestor
      @requestor = Requestor.where(id: params[:id], user_id: params[:user_id])
    end

    def requestor_params
      params.require(:requestor).permit(:id,:user_id,:feedback,:created_at,:updated_at)
    end

end
