package com.elbuensabor.services;

import com.elbuensabor.entities.*;
import com.elbuensabor.repositories.ArticuloManufacturadoDetalleRepository;
import com.elbuensabor.repositories.ArticuloManufacturadoRepository;
import com.elbuensabor.repositories.BaseRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticuloManufacturadoServiceImpl extends BaseServiceImpl<ArticuloManufacturado, Long> implements ArticuloManufacturadoService {
    public ArticuloManufacturadoServiceImpl(BaseRepository<ArticuloManufacturado, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private ArticuloManufacturadoRepository articuloManufacturadoRepository;
    @Autowired
    private ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository;

    @Override
    public ArticuloManufacturado saveDetalle(JSONObject jsonString) throws Exception {
        try {
            System.out.println("Entra al metodo y trae");
            ObjectMapper objectMapper = new ObjectMapper();
            // Parsear el JSON recibido
            JSONObject json = new JSONObject(jsonString);
            ArticuloManufacturado articuloManufacturado = new ArticuloManufacturado();
            articuloManufacturado.setId(json.getLong("id"));
            articuloManufacturado.setTiempoEstimadoCocina(json.getInt("tiempoEstimadoCocina"));
            articuloManufacturado.setDenominacion(json.getString("denominacion"));
            articuloManufacturado.setPrecioVenta(json.getDouble("precioVenta"));
            articuloManufacturado.setImagen(json.getString("imagen"));
            articuloManufacturado.setEstado(json.getBoolean("estado"));
            articuloManufacturado.setPrecioCosto(json.getDouble("precioCosto"));

            //Seteo articuloManufacturadoDetalles
            JSONObject rubroJson = jsonString.getJSONObject("rubroArticuloManufacturado");
            objectMapper = new ObjectMapper();
            RubroArticuloManufacturado rubro = objectMapper.readValue(rubroJson.toString(), RubroArticuloManufacturado.class);
            articuloManufacturado.setRubroArticuloManufacturado(rubro);

            //Seteo detallesPedido
            JSONArray pedidoArray = json.getJSONArray("detallesPedido");
            objectMapper = new ObjectMapper();
            List<DetallePedido> detallesPedido = objectMapper.readValue(pedidoArray.toString(), new TypeReference<List<DetallePedido>>() {
            });
            articuloManufacturado.setDetallesPedido(detallesPedido);

            //Seteo DetalleFactura
            JSONArray facturasArray = json.getJSONArray("detallesFactura");
            objectMapper = new ObjectMapper();
            List<DetalleFactura> detallesFactura = objectMapper.readValue(facturasArray.toString(), new TypeReference<List<DetalleFactura>>() {
            });
            articuloManufacturado.setDetallesFactura(detallesFactura);


            //Creo array de articulos manufacturados para poder iterar y hacer los Save correspondientes
            JSONArray detallesArray = json.getJSONArray("articuloManufacturadoDetalles");
            List<ArticuloManufacturadoDetalle> detalles = new ArrayList<>();

            // Guardar y asignar los IDs a los ArticuloManufacturadoDetalle
            for (int i = 0; i < detallesArray.length(); i++) {
                JSONObject detalleJson = detallesArray.getJSONObject(i);
                ArticuloManufacturadoDetalle detalle = new ObjectMapper().readValue(detalleJson.toString(), ArticuloManufacturadoDetalle.class);

                // Guardar el ArticuloManufacturadoDetalle en la base de datos
                detalle = articuloManufacturadoDetalleRepository.save(detalle);
                // Obtener el ID asignado
                Long detalleId = detalle.getId();
                // Asignar el ID al objeto ArticuloManufacturadoDetalle en el JSON
                detalleJson.put("id", detalleId);

                detalles.add(detalle);
            }

            // Asignar los detalles al ArticuloManufacturado
            articuloManufacturado.setArticuloManufacturadoDetalles(detalles);

            // Guardar el ArticuloManufacturado en la base de datos
            articuloManufacturado = articuloManufacturadoRepository.save(articuloManufacturado);
            return articuloManufacturado;

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }


    }
}
