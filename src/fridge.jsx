import React, {Component} from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Label } from 'react-bootstrap';


class fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {fridgeItems: []};

    this.handleIngredientAdd = this.handleIngredientAdd.bind(this)
    this.handleIngredientDel = this.handleIngredientDel.bind(this)
  };

  // when fridge component loads so does the contents of the fridge
  componentDidMount () {
    fetch('http://localhost:8080/api/fridge', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responsejson) => {
      console.log("frigde item: ", responsejson)
      this.setState({fridgeItems: responsejson})
    })
  }

  componentDidUpdate () {
    fetch('http://localhost:8080/api/fridge', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responsejson) => {
      this.setState({fridgeItems: responsejson})
    })
  }

// handleIngredientAdd; adds the argument 'item' that the user inputs to the fridge table
  handleIngredientAdd (item) {
    fetch('http://localhost:8080/api/fridge', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam: item
      })
      })
      .then((response) => {
        return response.json()
    })
  }

  // same thing as add ingredient but now removes it from the database item should be a string
  handleIngredientDel (item) {
    console.log(item)
    event.preventDefault();
    fetch('http://localhost:8080/api/fridge', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'SearchParams': item
      }
      })
      .then((response) => {
        return response.json()
    })
  }

  render() {
    return (
      <div>
        <h2>fridge supplies go in here</h2>
          {this.state.fridgeItems.map((item,index)=>(
          <Form horizontal onClick={() =>{this.handleIngredientDel(item.ingredients)}} >
            <h3>{item.ingredients}</h3>
            <FormGroup>
              <Col smOffset={1} sm={10}>
                <Button>
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Form>
          ))}
      </div>
    );
  }
}

export default fridge;

