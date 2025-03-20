import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/info.css";

export const CharacterInfo = () => {
    const { store, actions } = useContext(Context);
    const { characterId } = useParams();

    useEffect(() => {
        actions.getCharacter(characterId); 
    }, [characterId]);

    const character = store.character; 

    // Verificar si el personaje está en favoritos
    const isFavorite = store.favorites.some(fav => fav.uid === characterId);

    return character ? (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>{character.name}</h1>
                </div>
                <div className="card-body">
                    <p><strong>Altura:</strong> {character.height}</p>
                    <p><strong>Peso:</strong> {character.mass}</p>
                    <p><strong>Color de Ojos:</strong> {character.eye_color}</p>
                    <p><strong>Género:</strong> {character.gender}</p>

                    {/* Botón de favoritos corregido */}
                    <button 
                        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-primary"} mt-3`} 
                        onClick={() => actions.toggleFavorite({ 
                            uid: characterId, 
                            name: character.name, 
                            type: "character" // Para diferenciar entre planetas y personajes
                        })}
                    >
                        {isFavorite ? "❌ Quitar de Favoritos" : "⭐ Añadir a Favoritos"}
                    </button>
                </div>
            </div>
            <Link to="/"><button type="button" className="btn btn-danger">Volver</button></Link>
        </div>
    ) : (
        <p>Cargando información del personaje...</p>
    );
};