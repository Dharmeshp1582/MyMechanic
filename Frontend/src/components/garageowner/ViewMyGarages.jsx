import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustLoder } from "../common/CustLoder";
import "../../../src/assets/css/Garage.css"

export const ViewMyGarages = () => {
  const [garage, setGarage] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getAllMyGarages = async () => {
    const res = await axios.get(
      "/garage/getgaragebyuserid/" + localStorage.getItem("id")
    );
    console.log(res.data); //api response...
    setGarage(res.data.data);
    setisLoading(false);
  };

  useEffect(() => {
    getAllMyGarages();
  }, []);

  return (
    // <div style={{textAlign:"center"}}>
    // {
    //     isLoading && <CustLoder/>
    // }
    //     My Garages
    //     <table className='table table-dark'>
    //         <thead>
    //             <tr>
    //                 <th>Garage Name</th>
    //                 <th>IMAGE</th>
    //                 <th>ACTION</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {
    //                garage?.map((ge)=>{
    //                 return<tr>
    //                     <td>{ge.name}</td>
    //                     <td>
    //                         <img  style ={{height:100,width:100}}src={ge?.imageURL}></img>
    //                     </td>
    //                     <td>
    //                           <Link to ={`/garageowner/updategarage/${ge._id}`} className ="btn btn-info">
    //                    Update
    //                         </Link>
    //                     </td>
    //                 </tr>
    //                })
    //             }
    //         </tbody>
    //     </table>
    // </div>
    <div className="garage-container">
     {
     isLoading && <CustLoder/>
     }
      {garage?.map((gr) => (
        <div key={gr._id} className="garage-card">
          <img className="garage-image" src={gr?.imageURL} alt={gr.name} />
          <h3 className="garage-name">{gr.name}</h3>
          <p className="garage-owner">
            <strong>Owner:</strong> {gr.owner}
          </p>
          <p className="garage-status">
            <strong>Status:</strong>{" "}
            {gr.avaliability_status ? "Open" : "Closed"}
          </p>
          <p className="garage-hours">
            <strong>OpeningHours:</strong> {gr.openingHours}
          </p>
          <p className="garage-phone">
            <strong>Contact:</strong> {gr.phoneno}
          </p>
          <Link
            to={`/garageowner/updategarage/${gr._id}`}
            className="btn btn-info"
          >
            Update {" "}
          </Link>
        </div>
      ))}
    </div>
  );
};
