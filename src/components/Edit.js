import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {saveDataToDatabase} from './blobController';

import axios from "axios";
const baseURL = 'http://127.0.0.1:10000/devstoreaccount1/mycontainer/document.json?sv=2018-03-28&st=2022-07-22T05%3A26%3A35Z&se=2022-07-23T05%3A26%3A35Z&sr=c&sp=rcwl&sig=naXMI63ScsIfePgkYxzwwIuYF6UhpWc4Y9g0%2BFhHmFw%3D';

function Edit() {
  // Here usestate has been used in order
  // to set and get values from the jsx
  const [array, setarray] = useState(null);
  const [description, setdescription] = useState("");
  const [id, setid] = useState("");
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

  // Useeffect take care that page will be rendered only once
  useEffect(() => {
    setdescription(localStorage.getItem("description"));
    setid(localStorage.getItem("id"));
  }, []);


  // used for navigation with logic in javascript
  let history = useNavigate();
  if (!array) return null;

  // getting an index of an entry with an id
  var index = array
    .map(function (e) {
      return e.id;
    })
    .indexOf(id);


  // function for handling the edit and
  // pushing changes of editing/updating
  const handelSubmit = (e) => {
    e.preventDefault(); // preventing from reload

    let a = array[index]; // getting an index of an array

    // putting the value from the input textfield and
    // replacing it from existing for updation
    a.description = description;

    // save the data to the database
    saveDataToDatabase(array);

    // redirecting to main page
    history("/");
  };


  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
     
        {/* setting a description from the input textfiled */}
        <Form.Group className="mb-3 h-100" controlId="formBasicPassword">
          <Form.Control
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="description"
          />
        </Form.Group>

        {/* Hadinling an onclick event running an edit logic */}
        <Button
          onClick={(e) => handelSubmit(e)}
          variant="primary"
          type="submit"
          size="lg"
        >
          Update
        </Button>

        {/* Redirecting to main page after editing */}
        <Link className="d-grid gap-2" to="/">
          <Button variant="warning" size="lg">
            Home
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Edit;
