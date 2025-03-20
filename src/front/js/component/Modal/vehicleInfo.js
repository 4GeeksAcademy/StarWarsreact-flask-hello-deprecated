import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/info.css";

export const VehicleInfo = () => {
    const { store, actions } = useContext(Context);
    const { vehicleId } = useParams();

    useEffect(() => {
        actions.getVehicle(vehicleId); 
    }, [vehicleId]);

    const vehicle = store.vehicle; 

    const isFavorite = store.favorites.some(fav => fav.uid === vehicleId);

    return vehicle ? (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>{vehicle.name}</h1>
                </div>
                <div className="card-body">
                    <p><strong>Modelo:</strong> {vehicle.model}</p>
                    <p><strong>Fabricante:</strong> {vehicle.manufacturer}</p>
                    <p><strong>Velocidad Máxima:</strong> {vehicle.max_atmosphering_speed}</p>
                    <p><strong>Capacidad de Pasajeros:</strong> {vehicle.passengers}</p>

                    {/* Botón de favoritos */}
                    <button 
                        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"} mt-3`} 
                        onClick={() => actions.toggleFavorite({ 
                            uid: vehicleId, 
                            name: vehicle.name, 
                            type: "vehicle" 
                        })}
                    >
                        {isFavorite ? "❌ Quitar de Favoritos" : "⭐ Añadir a Favoritos"}
                    </button>
                </div>
            </div>
            <Link to="/"><button type="button" className="btn btn-danger">Volver</button></Link>
        </div>
    ) : (
        <p>Cargando información del vehículo...</p>
    );
};