const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [], // Inicializamos como un array vacío
            character: {},
			planets: [],
			planet: {},
			favorites: [],
			vehicles: [],
			vehicle: {},
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				const store = getStore();

				
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				
				setStore({ demo: demo });
			},

			getPeople: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/people/");
					const data = await response.json();
					
					setStore({ people: data.results }); 
				} catch (error) {
					console.error("Error al obtener los personajes:", error);
				}
			},

			getCharacter: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
					if (!response.ok) throw new Error("Error en la respuesta de la API");
			
					const data = await response.json();
					if (data.result) {
						setStore({ character: data.result.properties });
					} else {
						console.error("No se encontraron datos del personaje.");
					}
				} catch (error) {
					console.error("Error al obtener el personaje:", error);
				}
			},

	
			getPlanets: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/planets/");
					const data = await response.json();
					console.log("Planets API response:", data); 
			
					if (!data.results) {
						console.error("No se encontraron planetas en la API.");
						return;
					}
			
					const planetsList = data.results.map((planet) => ({
						uid: planet.uid, 
						name: planet.name,
					}));
			
					setStore({ planets: planetsList });
				} catch (error) {
					console.error("Error al obtener los planetas:", error);
				}
			},

			getPlanet: async (id) => {
				try {
					console.log("🔍 Buscando planeta con ID:", id); 
					if (!id) {
						console.error("❌ ID de planeta no válido.");
						return;
					}
			
					const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
					if (!response.ok) throw new Error("Error en la respuesta de la API");
			
					const data = await response.json();
			
					if (!data.result) {
						console.error("❌ No se encontraron datos del planeta.");
						return;
					}
			
					const planetDetails = {
						uid: id,
						name: data.result.properties.name,
						climate: data.result.properties.climate,
						terrain: data.result.properties.terrain,
						population: data.result.properties.population,
						rotation_period: data.result.properties.rotation_period,
						orbital_period: data.result.properties.orbital_period,
						diameter: data.result.properties.diameter,
						description: `A planet with a ${data.result.properties.climate} climate and a population of ${data.result.properties.population}.`,
					};
			
					console.log(" Detalles del planeta:", planetDetails);
			
					setStore({ planet: planetDetails });
				} catch (error) {
					console.error("Error al obtener el planeta:", error);
				}
			},
			toggleFavorite: (item) => {
				const store = getStore();
				const exists = store.favorites.some(fav => fav.uid === item.uid);
			
				if (exists) {
					setStore({ favorites: store.favorites.filter(fav => fav.uid !== item.uid) });
				} else {
					setStore({ favorites: [...store.favorites, item] });
				}
			},

			getVehicles: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/vehicles/");
                    const data = await response.json();
                    const vehiclesWithDetails = data.results.map(vehicle => ({
                        uid: vehicle.uid,
                        name: vehicle.name
                    }));
                    setStore({ vehicles: vehiclesWithDetails });
                } catch (error) {
                    console.error("Error al obtener vehículos:", error);
                }
            },

            
            getVehicle: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
                    if (!response.ok) throw new Error("Error en la respuesta de la API");
            
                    const data = await response.json();
                    if (data.result) {
                        setStore({ vehicle: data.result.properties });
                    } else {
                        console.error("No se encontraron datos del vehículo.");
                    }
                } catch (error) {
                    console.error("Error al obtener el vehículo:", error);
                }
            },
		},
			
	};
};

export default getState;
