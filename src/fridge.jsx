import React, {Component} from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Label } from 'react-bootstrap';



class fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeItems: [],
      fridgeInputValue: ""
    };
    this.handleIngredientAdd = this.handleIngredientAdd.bind(this);
    this.handleIngredientDel = this.handleIngredientDel.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchFridgeItems = this.fetchFridgeItems.bind(this);
  }



  // when fridge component loads so does the contents of the fridge
  componentDidMount () {
    this.fetchFridgeItems();
  }

  fetchFridgeItems(){
    fetch('http://localhost:8080/api/fridge', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responsejson) => {

      console.log("frigde items: ", responsejson)
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

  handleQueryChange(event) {
    this.setState({fridgeInputValue: event.target.value});
  }



  handleSubmit(event) {
    event.preventDefault();
    this.handleIngredientAdd(this.state.fridgeInputValue);
    this.fetchFridgeItems();
    this.forceUpdate();
    console.log('fridge handlesubmit: ', this.state.fridgeInputValue);
  }

  render() {
    return (
      <div>
        <h2>fridge supplies go in here</h2>

        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="queryBar">
            <Col componentClass={ControlLabel} sm={2}>
              Add ingredients to Fridge
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="Example: salt" onChange={this.handleQueryChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={1} sm={10}>
              <Button type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>



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
