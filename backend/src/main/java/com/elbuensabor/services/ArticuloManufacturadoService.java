package com.elbuensabor.services;


import com.elbuensabor.entities.ArticuloManufacturado;
import org.json.JSONObject;

public interface ArticuloManufacturadoService extends BaseService<ArticuloManufacturado, Long> {
    ArticuloManufacturado saveDetalle(JSONObject jsonString) throws Exception;
}
