import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { saveDataToDatabase } from "./blobController";

const baseURL = 'http://127.0.0.1:10000/devstoreaccount1/mycontainer/document.json?sv=2018-03-28&st=2022-07-22T05%3A26%3A35Z&se=2022-07-23T05%3A26%3A35Z&sr=c&sp=rcwl&sig=naXMI63ScsIfePgkYxzwwIuYF6UhpWc4Y9g0%2BFhHmFw%3D';

function Home() {

  const [array, setarray] = useState(null);
  const getAnswer = async () => {
    const { data } = await axios(baseURL);
    let result = [];
    for(let item in data){
      let id = item
      let desc = data[item].description
      result.push({
        'id':id,
        'description':desc
      });
    }
    setarray(result);
  };
  useEffect(  () => {
    getAnswer();
  }, []);

  let history = useNavigate();

  if (!array) return null;

  
 

  // You may skip this part if you're
  // using react-context api or redux
  function setID(id, description) {
    localStorage.setItem("id", id);
    localStorage.setItem("description", description);
  }
  // Deleted function - functionality
  // for deleting the entry
  function deleted(id) {
    var index = array
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);

    // deleting the entry with index
    array.splice(index, 1);

    // save the data on the database
    saveDataToDatabase(array)

    // We need to re-render the page for getting
    // the results so redirect to same page.
    history("/");
  }

  return (
    <div style={{ margin: "10rem" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping though every element in the array
	and showing the data in the form of table */}
          {array.map((item) => {
            return (

              <tr key={item.id}>
                <td>{item.description}</td>

                {/* getting theid,name, and description for storing these
		value in the jsx with onclick event */}
                <td>
                  <Link to={`/edit`}>
                    <Button
                      onClick={(e) =>{
                        setID(item.id, item.description)
            
                      }
                        
                      }
                      variant="info"
                    >
                      Update
                    </Button>
                  </Link>
                </td>

                {/* Using thr deleted function passing
	the id of an entry */}
                <td>
                  <Button onClick={(e) => deleted(item.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Button for redirecting to create page for
insertion of values */}
      <Link className="d-grid gap-2" to="/create">
        <Button variant="warning" size="lg">
          Create
        </Button>
      </Link>
    </div>
  );
}

export default Home;
