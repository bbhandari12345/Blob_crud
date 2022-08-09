import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import {saveDataToDatabase} from './blobController';

import axios from "axios";

const baseURL = 'http://127.0.0.1:10000/devstoreaccount1/mycontainer/document.json?sv=2018-03-28&st=2022-07-22T05%3A26%3A35Z&se=2022-07-23T05%3A26%3A35Z&sr=c&sp=rcwl&sig=naXMI63ScsIfePgkYxzwwIuYF6UhpWc4Y9g0%2BFhHmFw%3D';

function Create() {
  // Making usestate for setting and
  // fetching a value in jsx  const [array, setarray] = useState(null);
  const [array, setarray] = useState(null);
  const [description, setdescription] = useState("");
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



  // Using useNavigation for redirecting to pages
  let history = useNavigate();
  if (!array) return null;

  // Function for creating a post/entry
  const handelSubmit = (e) => {
    e.preventDefault(); // Prevent reload

    const ids = uuid(); // Creating unique id
    let uni = ids.slice(0, 8); // Slicing unique id

    // Fetching a value from usestate and
    // pushing to javascript object
    let b = description;
    array.push({ id: uni,description: b });
    // save the data to the database
    saveDataToDatabase(array);


    // Redirecting to home page after creation done
    history("/");
  };

  return (
    <div>
      <Form className="d-grid gap-2" style={{ margin: "15rem" }}>

        {/* Fetching a value from input textfirld in
	a setdescription using usestate*/}
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Control
            onChange={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="description"
            required
          />
        </Form.Group>

        {/* handing a onclick event in button for
	firing a function */}
        <Button
          onClick={(e) => handelSubmit(e)}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>

        {/* Redirecting back to home page */}
        <Link className="d-grid gap-2" to="/">
          <Button variant="info" size="lg">
            Home
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Create;
