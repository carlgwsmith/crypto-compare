//import styled from "styled-components";

import { Form } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel} from "react-bootstrap"

function Search(props){
    return(
      <div>
          <Form>
              <Form.Group controlId="Search">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type="text" placeholder="Enter ticker" />
              </Form.Group>
          </Form>
      </div>
    )
}

export default Search