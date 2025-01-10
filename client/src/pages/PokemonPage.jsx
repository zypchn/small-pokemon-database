import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBolt,
    faBug,
    faCircle,
    faDotCircle,
    faDove,
    faDragon,
    faDumbbell,
    faFire,
    faFistRaised,
    faGem,
    faGhost,
    faHatWizard,
    faIcicles,
    faMagic,
    faMountain,
    faPenToSquare,
    faPlus,
    faSeedling,
    faSkullCrossbones,
    faTint,
    faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import CustomNavbar from "../components/Navbar.jsx";

const PokemonPage = () => {
    
    const [data, setData] = useState([]);
    const {id} = useParams();
    const [editID, setEditID] = useState("");
    const [editName, setEditName] = useState("");
    const [editType, setEditType] = useState("");
    const [createID, setCreateID] = useState("");
    const [createName, setCreateName] = useState("");
    const [createType, setCreateType] = useState("");
    const navigate = useNavigate();
    
    const types = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground",
        "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
    
    const popupStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid #ddd',
        minWidth: '300px'
    }
    
    useEffect( () => {
        if (localStorage.token === undefined) {
            navigate("/login");
        }
    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/pokemon/`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);
    
    const deletePokemon = async (id) => {
        await axios.delete(`http://localhost:5000/api/pokemon/${id}`)
        .then((res) => {
            setData(data.filter(pokemon => pokemon.dbID !== id));
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    
    const updatePokemon = async (id) => {
        await axios.post(`http://localhost:5000/api/pokemon/${id}`, {
            pokedexID: editID,
            pokemonName: editName,
            type: editType,
            id: id
        }).then((res) => {
            setData(data.map(pokemon =>
                pokemon.dbID === id
                    ? {...pokemon, pokedexID: editID, pokemonName: editName, type: editType}
                    : pokemon
            ));
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    
    const createPokemon = async () => {
        await axios.post(`http://localhost:5000/api/pokemon/create`, {
            pokedexID: createID,
            pokemonName: createName,
            type: createType
        }).then((res) => {
            setData(data => [
                ...data,
                {pokedexID: createID, pokemonName: createName, type: createType}
            ]);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    
    const getTypeIcon = (type) => {
        switch (type) {
            case "Normal":
                return faDotCircle;
            case "Fire":
                return faFire;
            case "Water":
                return faTint;
            case "Electric":
                return faBolt;
            case "Grass":
                return faSeedling;
            case "Ice":
                return faIcicles;
            case "Fighting":
                return faFistRaised;
            case "Poison":
                return faSkullCrossbones
            case "Ground":
                return faMountain;
            case "Flying":
                return faDove;
            case "Psychic":
                return faHatWizard;
            case "Bug":
                return faBug;
            case "Rock":
                return faGem;
            case "Ghost":
                return faGhost;
            case "Dragon":
                return faDragon;
            case "Dark":
                return faCircle;
            case "Steel":
                return faDumbbell;
            case "Fairy":
                return faMagic;
        }
        
    }
    
    return (
        <div>
            <CustomNavbar/>
            <div id={"pokemons"}>
                <table className={"pokemons-table"}>
                    <thead>
                    <tr>
                        <th scope={"col"} style={{paddingRight: 25}}>Pokedex ID</th>
                        <th scope={"col"} style={{paddingRight: 25}}>Pokemon Name</th>
                        <th scope={"col"} style={{paddingRight: 50}}>Pokemon Type</th>
                        <th scope={"col"}>
                            <Popup
                                trigger={<button className={"btn btn-secondary"}><FontAwesomeIcon icon={faPlus}/> Add
                                    Pokemon </button>}
                                position={"left top"}
                                contentStyle={popupStyle}>
                                {close => (
                                    <form className={"popup-form"} onSubmit={(e) => {
                                        e.preventDefault();
                                        createPokemon().then();
                                        close();
                                    }}>
                                        <label className={"d-block mb-2"}> <strong>Pokedex ID:</strong>
                                            <input type={"number"}
                                                   className={"form-control"}
                                                   onChange={(e) => setCreateID(e.target.valueAsNumber)}/>
                                        </label>
                                        <label className={"d-block mb-2"}> <strong>Pokemon Name:</strong>
                                            <input type={"text"}
                                                   className={"form-control"}
                                                   onChange={(e) => setCreateName(e.target.value)}/>
                                        </label>
                                        <label className={"d-block mb-2"}> <strong>Pokemon Type:</strong>
                                            <select className={"form-control"}
                                                    onChange={(e) => setCreateType(e.target.value)}>
                                                {types && types.map((type) => (
                                                    <option key={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <input type={"submit"}/>
                                    </form>
                                )}
                            </Popup>
                        </th>
                    </tr>
                    </thead>
                    {data && data.map((pokemon) => (
                        <tbody key={pokemon.dbID}>
                        <tr>
                            <td>{pokemon.pokedexID}</td>
                            <td>{pokemon.pokemonName}</td>
                            <td style={{paddingRight: 50}}><FontAwesomeIcon
                                icon={getTypeIcon(pokemon.type)}/> &nbsp; {pokemon.type}</td>
                            <td>
                                <Popup
                                    trigger={<button className={"btn btn-primary"}><FontAwesomeIcon
                                        icon={faPenToSquare}/>
                                    </button>}
                                    position={"left top"}
                                    contentStyle={popupStyle}
                                    onOpen={() => {
                                        setEditID(pokemon.pokedexID);
                                        setEditName(pokemon.pokemonName);
                                        setEditType(pokemon.type)
                                    }}>
                                    {close => (
                                        <form className={"popup-form"} onSubmit={(e) => {
                                            e.preventDefault();
                                            updatePokemon(pokemon.dbID).then();
                                            close();
                                        }}>
                                            <label className={"d-block mb-2"}> <strong>Pokedex ID:</strong>
                                                <input type={"number"} placeholder={pokemon.pokedexID}
                                                       defaultValue={pokemon.pokedexID}
                                                       className="form-control"
                                                       onChange={(e) => setEditID(e.target.valueAsNumber)}/>
                                            </label>
                                            <label className={"d-block mb-2"}> <strong>Pokemon Name:</strong>
                                                <input type={"text"} defaultValue={pokemon.pokemonName}
                                                       className={"form-control"}
                                                       onChange={(e) => setEditName(e.target.value)}/>
                                            </label>
                                            <label className={"d-block mb-2"}> <strong>Pokemon Type:</strong>
                                                <select defaultValue={pokemon.type} className={"form-control"}
                                                        onChange={(e) => setEditType(e.target.value)}>
                                                    {types && types.map((type) => (
                                                        <option key={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                            <input type={"submit"}/>
                                        </form>
                                    )}
                                </Popup>
                                <button className={"btn btn-danger"} onClick={() => deletePokemon(pokemon.dbID)}>
                                    <FontAwesomeIcon icon={faTrashCan}/></button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default PokemonPage;