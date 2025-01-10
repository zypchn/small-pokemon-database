import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import CustomNavbar from "../components/Navbar.jsx";

const TrainerPage = () => {
    
    const [data, setData] = useState([]);
    const [deckData, setDeckData] = useState([]);
    const {id} = useParams();
    const [editName, setEditName] = useState("");
    const [editRegion, setEditRegion] = useState("");
    const [createName, setCreateName] = useState("");
    const [createRegion, setCreateRegion] = useState("");
    const navigate = useNavigate();
    
    const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"];
    
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
        axios.get(`http://localhost:5000/api/trainer/`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/deck/`)
        .then((res) => {
            setDeckData(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
    
    const deleteTrainer = async (id) => {
        await axios.delete(`http://localhost:5000/api/trainer/${id}`)
        .then((res) => {
            setData(data.filter(trainer => trainer.trainerID !== id));
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    
    const updateTrainer = async (id) => {
        await axios.post(`http://localhost:5000/api/trainer/${id}`, {
            trainerName: editName,
            trainerRegion: editRegion
        }).then((res) => {
            setData(data.map(trainer =>
                trainer.trainerID === id
                    ? {...trainer, trainerName: editName, trainerRegion: editRegion}
                    : trainer
            ));
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    
    const createTrainer = async () => {
        await axios.post(`http://localhost:5000/api/trainer/create`, {
            trainerName: createName,
            trainerRegion: createRegion
        }).then((res) => {
            setData(data => [
                ...data,
                {trainerName: createName, trainerRegion: createRegion}
            ]);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    
    const getDeckByID = async (id) => {
        await axios.get(`http://localhost:5000/api/deck/${id}`)
        .then((res) => {
            const response = (res.data);
            let deck = [];
            response.forEach((r) => {
                deck.push(r["pokemonName"]);
            });
            const text = deck.toString();
            return text;
        })
        .catch((err) => console.log(err));
    }
    
    return (
        <div>
            <CustomNavbar />
            <div id={"trainers"}>
                <table className={"trainers-table"}>
                    <thead>
                    <tr>
                        <th scope={"col"} style={{paddingRight: 25}}>Trainer Name</th>
                        <th scope={"col"} style={{paddingRight: 25}}>Trainer Region</th>
                        <th scope={"col"} style={{paddingRight: 50}}>Trainer Deck</th>
                        <th scope={"col"}>
                            <Popup
                                trigger={<button className={"btn btn-secondary"}><FontAwesomeIcon icon={faPlus}/> Add
                                    Trainer </button>}
                                position={"left top"}
                                contentStyle={popupStyle}>
                                {close => (
                                    <form className={"popup-form"} onSubmit={(e) => {
                                        e.preventDefault();
                                        createTrainer().then();
                                        close();
                                    }}>
                                        <label className={"d-block mb-2"}> <strong>Trainer Name:</strong>
                                            <input type={"text"}
                                                   className={"form-control"}
                                                   onChange={(e) => setCreateName(e.target.value)}/>
                                        </label>
                                        <label className={"d-block mb-2"}> <strong>Trainer Region:</strong>
                                            <select className={"form-control"}
                                                    onChange={(e) => setCreateRegion(e.target.value)}>
                                                {regions && regions.map((region) => (
                                                    <option key={region}>
                                                        {region}
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
                    {data && data.map((trainer) => (
                        <tbody key={trainer.trainerID}>
                        <tr>
                            <td>{trainer.trainerName}</td>
                            <td>{trainer.trainerRegion}</td>
                            <td style={{paddingRight: 25}}> {getDeckByID(trainer.trainerID)} </td>
                            <td>
                                <Popup
                                    trigger={<button className={"btn btn-primary"}><FontAwesomeIcon
                                        icon={faPenToSquare}/>
                                    </button>}
                                    position={"left top"}
                                    contentStyle={popupStyle}
                                    onOpen={() => {
                                        setEditName(trainer.trainerName);
                                        setEditRegion(trainer.trainerRegion)
                                    }}>
                                    {close => (
                                        <form className={"popup-form"} onSubmit={(e) => {
                                            e.preventDefault();
                                            updateTrainer(trainer.trainerID).then();
                                            close();
                                        }}>
                                            <label className={"d-block mb-2"}> <strong>Trainer Name:</strong>
                                                <input type={"text"} defaultValue={trainer.trainerName}
                                                       className={"form-control"}
                                                       onChange={(e) => setEditName(e.target.value)}/>
                                            </label>
                                            <label className={"d-block mb-2"}> <strong>Trainer Region:</strong>
                                                <select defaultValue={trainer.trainerRegion} className={"form-control"}
                                                        onChange={(e) => setEditRegion(e.target.value)}>
                                                    {regions && regions.map((region) => (
                                                        <option key={region}>
                                                            {region}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                            <input type={"submit"}/>
                                        </form>
                                    )}
                                </Popup>
                                <button className={"btn btn-danger"} onClick={() => deleteTrainer(trainer.trainerID)}>
                                    <FontAwesomeIcon icon={faTrashCan}/></button>
                                <button onClick={() => {
                                    getDeckByID(trainer.trainerID).then()
                                }}>hey
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default TrainerPage;