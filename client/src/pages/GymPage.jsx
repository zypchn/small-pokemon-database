import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const GymPage = () => {
    
    const [data, setData] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/gym/`)
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => console.log(err));
    }, [id]);
    
    return (
        <div id={"gyms"}>
            <table className={"gyms-table"}>
                <thead>
                    <tr>
                        <th scope={"col"} style={{paddingRight: 25}}>Gym Name</th>
                        <th scope={"col"} style={{paddingRight: 50}}>Gym Region</th>
                        <th scope={"col"}><button className={"btn btn-secondary"}>Add Gym</button></th>
                    </tr>
                </thead>
                <tbody>
                {data && data.map((gym) => (
                    <tr key={gym.id}>
                        <td>{gym.gymName}</td>
                        <td style={{paddingRight: 50}}>{gym.gymRegion}</td>
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

export default GymPage;