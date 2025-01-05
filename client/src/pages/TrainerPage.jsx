import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const TrainerPage = () => {
    
    const [data, setData] = useState([]);
    const [groupedDeck, setGroupedDeck] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/trainer/`)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => console.log(err));
        
    }, [id]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/api/deck")
        .then((res) => {
            const grouped = res.data.reduce((acc, item) => {
                const { trainerID, pokemonName } = item;
                if (!acc[trainerID]) acc[trainerID] = [];
                acc[trainerID].push(pokemonName);
                return acc;
            }, {});
            setGroupedDeck(grouped);
        })
        .catch((err) => console.error(err));
    }, []);
    
    
    
    return (
        <div id={"pokemons"}>
            <table className={"pokemons-table"}>
                <thead>
                <tr>
                    <th scope={"col"} style={{paddingRight: 25}}>Trainer Name</th>
                    <th scope={"col"} style={{paddingRight: 25}}>Trainer Region</th>
                    <th scope={"col"} style={{paddingRight: 50}}>Trainer Deck</th>
                    <th scope={"col"}><button className={"btn btn-secondary"}
                    onClick={() => console.log(groupedDeck[1])}
                    >Add Trainer</button></th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((trainer) => (
                    <tr key={trainer.trainerID}>
                        <td style={{paddingRight: 25}}>{trainer.trainerName}</td>
                        <td style={{paddingRight: 25}}>{trainer.trainerRegion}</td>
                        <td style={{paddingRight: 50}}>{String(groupedDeck[trainer.trainerID])}</td>
                        <td>
                            <button className={"btn btn-primary"}><FontAwesomeIcon icon={faPenToSquare}/></button>
                            <button className={"btn btn-danger"}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TrainerPage;