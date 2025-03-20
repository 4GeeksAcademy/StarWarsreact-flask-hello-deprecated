import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPeople();
		actions.getPlanets();
		actions.getVehicles();
	}, []);

	return (

		<div className="container">
			<h1 style={{ color: 'white' }}>Character:</h1>
			<div className="scroll-container">
				<div className=" d-flex justify-content-flex-start">
					{store.people.length > 0 ? (
						store.people.map((character) => (

							<div key={character.uid} className=" col-md-2 col-sm-2 mb-4">
								<Link to={`/characters/${character.uid}`} className="text-decoration-none">
									<div className="flip-card">
										<div className="flip-card-inner">
											<div className="flip-card-front col-6">
												<p className="title  text-align-center">{character.name}</p>

											</div>
											<div className="flip-card-back col-6">
												<p className="title">{character.name}</p>
												<p>Haz clic para más información</p>
											</div>
										</div>
									</div>
								</Link>

							</div>

						))
					) : (
						<p>Cargando personajes...</p>
					)}
				</div>
			</div>


			<h1 style={{ color: "white" }}>Planets:</h1>
			<div className="scroll-container d-flex">
				{store.planets.length > 0 ? (
					store.planets.map((planet) => (
						<div key={planet.id} className="col-md-2">
							<Link to={`/planets/${planet.uid}`}>
								<div className="flip-card">
									<div className="flip-card-inner">
										<div className="flip-card-front">
											<p className="title">{planet.name}</p>
											<p>Rotation Period: {planet.rotation_period}</p>
											<p>Population: {planet.population}</p>
										</div>
										<div className="flip-card-back">
											<p className="title">{planet.name}</p>
											<p>Haz clic para más información sobre el planeta</p>
											
										</div>
									</div>
								</div>
							</Link>
						</div>
					))
				) : (
					<p>Cargando planetas...</p>
				)}
			</div>


			<div className="container">
            <h1 style={{ color: "white" }}>Vehicles:</h1>
            <div className="scroll-container d-flex">
                {store.vehicles.length > 0 ? (
                    store.vehicles.map((vehicle) => (
                        <div key={vehicle.uid} className="col-md-2">
                            <Link to={`/vehicles/${vehicle.uid}`}>
                                <div className="flip-card">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                            <p className="title">{vehicle.name}</p>
                                        </div>
                                        <div className="flip-card-back">
                                            <p className="title">{vehicle.name}</p>
                                            <p>Haz clic para más información</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Cargando vehículos...</p>
                )}
            </div>
        </div>
		</div>
	);
};