# frozen_string_literal: true

module Kit
  class ComponentsController < ApplicationController
    before_action :set_kit_component, only: %i[show edit update destroy]

    # GET /kit/components or /kit/components.json
    def index
      @kit_components = Kit::Component.all
    end

    # GET /kit/components/1 or /kit/components/1.json
    def show; end

    # GET /kit/components/new
    def new
      @kit_component = Kit::Component.new
    end

    # GET /kit/components/1/edit
    def edit; end

    # POST /kit/components or /kit/components.json
    def create
      @kit_component = Kit::Component.new(kit_component_params)

      respond_to do |format|
        if @kit_component.save
          format.html { redirect_to(kit_component_url(@kit_component), notice: 'Component was successfully created.') }
          format.json { render(:show, status: :created, location: @kit_component) }
        else
          format.html { render(:new, status: :unprocessable_entity) }
          format.json { render(json: @kit_component.errors, status: :unprocessable_entity) }
        end
      end
    end

    # PATCH/PUT /kit/components/1 or /kit/components/1.json
    def update
      respond_to do |format|
        if @kit_component.update(kit_component_params)
          format.html { redirect_to(kit_component_url(@kit_component), notice: 'Component was successfully updated.') }
          format.json { render(:show, status: :ok, location: @kit_component) }
        else
          format.html { render(:edit, status: :unprocessable_entity) }
          format.json { render(json: @kit_component.errors, status: :unprocessable_entity) }
        end
      end
    end

    # DELETE /kit/components/1 or /kit/components/1.json
    def destroy
      @kit_component.destroy

      respond_to do |format|
        format.html { redirect_to(kit_components_url, notice: 'Component was successfully destroyed.') }
        format.json { head(:no_content) }
      end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_kit_component
      @kit_component = Kit::Component.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def kit_component_params
      params.require(:kit_component).permit(:product_id, :name)
    end
  end
end
