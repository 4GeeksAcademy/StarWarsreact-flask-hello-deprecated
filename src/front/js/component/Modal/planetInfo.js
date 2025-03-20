import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/info.css";

export const PlanetInfo = () => {
    const { store, actions } = useContext(Context);
    const { planetId } = useParams(); 

    useEffect(() => {
        if (planetId) {
            actions.getPlanet(planetId);
        }
    }, [planetId]);

    const planet = store.planet || {};

    const isFavorite = store.favorites.some((fav) => fav.uid === planet.uid);

    if (!planet.name) {
        return <p>🔄 Cargando información del planeta...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="..." className="img-fluid rounded-start" alt="Planet" />
                    </div>
                    <div className="col-md-8">
                        <div className="modal-header mt-0">
                            <h5 className="modal-title">{planet.name}</h5>
                            <Link to="/">
                                <button type="button" className="btn-close" aria-label="Close"></button>
                            </Link>
                        </div>
                        <p className="card-text">{planet.description}</p>
                        <div className="card-footer">
                            <h6>Climate:</h6> <p>{planet.climate}</p>
                            <h6>Terrain:</h6> <p>{planet.terrain}</p>
                            <h6>Population:</h6> <p>{planet.population}</p>
                            <h6>Rotation Period:</h6> <p>{planet.rotation_period}</p>
                            <h6>Orbital Period:</h6> <p>{planet.orbital_period}</p>
                            <h6>Diameter:</h6> <p>{planet.diameter}</p>

                           
                            <button 
                                className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"} mt-3`} 
                                onClick={() => actions.toggleFavorite(planet)}
                            >
                                {isFavorite ? "❌ Quitar de Favoritos" : "⭐ Añadir a Favoritos"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};