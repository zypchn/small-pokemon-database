import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";

const GymPage = () => {
    
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [region, setRegion] = useState("");
    const [editName, setEditName] = useState("");
    const [editRegion, setEditRegion] = useState("");
    const [createName, setCreateName] = useState("");
    
    const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"];
    
    const popupStyle = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid #ddd',
        minWidth: '300px'
    }
    
    useEffect(() => {
        const currentURL = window.location.href
        const paramString = currentURL.split("?")[1];
        const region = paramString.split("=")[1];
        axios.get(`http://localhost:5000/api/gym/${region}`)
        .then((res) => {
            setData(res.data);
            setRegion(region);
        })
        .catch((err) => console.log(err));
    }, [id, data]);
    
    const deleteGym = async (id) => {
        await axios.delete(`http://localhost:5000/api/gym/${id}`)
        .then((res) => {
            setData(data.filter(gym => gym.gymID !== id));
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    
    const updateGym = async (id) => {
        await axios.post(`http://localhost:5000/api/gym/${id}`, {
            gymName: editName,
            gymRegion: editRegion
        }).then((res) => {
            if (editRegion === region) {
                setData(data.map(gym =>
                    gym.gymID === id
                        ? {...gym, gymName: editName}
                        : gym
                ));
            }
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    
    const createGym = async () => {
        await axios.post(`http://localhost:5000/api/gym/create`, {
            gymName: createName,
            gymRegion: region
        }).then((res) => {
            setData(data => [
                ...data,
                {gymName: createName, gymRegion: region}
            ]);
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    
    return (
        <div id={"trainers"}>
            <table className={"trainers-table"}>
                <thead>
                <tr>
                    <th scope={"col"} style={{paddingRight: 25, paddingLeft: 100}}>Gym Name</th>
                    <th scope={"col"}>
                        <Popup
                            trigger={<button className={"btn btn-secondary"}><FontAwesomeIcon icon={faPlus}/> Add Gym </button>}
                            position={"left top"}
                            contentStyle={popupStyle}>
                            {close => (
                                <form className={"popup-form"} onSubmit={(e) => {
                                    e.preventDefault();
                                    createGym().then();
                                    close();
                                }}>
                                    <label className={"d-block mb-2"}> <strong>Gym Name:</strong>
                                        <input type={"text"}
                                               className={"form-control"}
                                               onChange={(e) => setCreateName(e.target.value)}/>
                                    </label>
                                    <label className={"d-block mb-2"}> <strong>Gym Region:</strong>
                                        <select className={"form-control"}>
                                            <option>{region}</option>
                                        </select>
                                    </label>
                                    <input type={"submit"}/>
                                </form>
                            )}
                        </Popup>
                    </th>
                </tr>
                </thead>
                {data && data.map((gym) => (
                    <tbody key={gym.gymName}>
                    <tr>
                        <td style={{paddingRight: 25, paddingLeft: 100}}>{gym.gymName}</td>
                        <td>
                            <Popup
                                trigger={<button className={"btn btn-primary"}><FontAwesomeIcon icon={faPenToSquare}/>
                                </button>}
                                position={"left top"}
                                contentStyle={popupStyle}
                                onOpen={() => {
                                    setEditName(gym.gymName);
                                    setEditRegion(gym.gymRegion)
                                }}>
                                {close => (
                                    <form className={"popup-form"} onSubmit={(e) => {
                                        e.preventDefault();
                                        updateGym(gym.gymID).then();
                                        close();
                                    }}>
                                        <label className={"d-block mb-2"}> <strong>Gym Name:</strong>
                                            <input type={"text"} defaultValue={gym.gymName}
                                                   className={"form-control"}
                                                   onChange={(e) => setEditName(e.target.value)}/>
                                        </label>
                                        <label className={"d-block mb-2"}> <strong>Gym Region:</strong>
                                            <select defaultValue={region} className={"form-control"}
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
                            <button className={"btn btn-danger"} onClick={() => deleteGym(gym.gymID)}>
                                <FontAwesomeIcon icon={faTrashCan}/></button>
                        </td>
                    </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default GymPage;