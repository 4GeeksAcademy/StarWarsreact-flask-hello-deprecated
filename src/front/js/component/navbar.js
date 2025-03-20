import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary p-3 mb-0">
		<div className="container justify-content-center">
				<img className="img-nav " src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Star_wars2.svg"  href="/" alt="..."/>
				<div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        ⭐ Favoritos ({store.favorites.length})
                    </button>
                    <ul className="dropdown-menu">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-muted">No hay favoritos</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between">
                                    <Link to={`/planets/${fav.uid}`} className="text-decoration-none">{fav.name}</Link>
                                    <button 
                                        className="btn btn-sm btn-danger ms-2" 
                                        onClick={() => actions.toggleFavorite(fav)}
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
				</div>
			</div>
		</nav>
	);
};
