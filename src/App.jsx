import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Label } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {query: '',
                  excludedIngredient: '',
                  recipes:[],
                  availableRecipes: []
                };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleExcludedIngredientChange = this.handleExcludedIngredientChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(event) {
    this.setState({query: event.target.value});
  }

  handleExcludedIngredientChange(event) {
    this.setState({excludedIngredient: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.query != '') {
      fetch('http://localhost:8080/api/recipes', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SearchParams':
            {
              'query': this.state.query,
              'excludedIngredient': this.state.excludedIngredient
            }
          // 'SearchParams': this.state.query,
          // 'excludedIngredientParams': this.state.excludedIngredient
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let parsed = JSON.parse(responseJson)
        this.setState({recipes: parsed.matches})
        console.log(this.state.recipes)
        })
    }
    console.log("Event.target.value :", event.target.value);
    console.log("Event.target :", event.target);
    console.log("Event :", event);
  }

  render() {
    return (
      <div className = "container">
        <div className = "row">
          <h3> Enter search criteria </h3>
        </div>
        <div className = "row">
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="queryBar">
              <Col componentClass={ControlLabel} sm={2}>
                Recipe name contains:
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Example: omelette" onChange={this.handleQueryChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="allowedIngredientBar">
              <Col componentClass={ControlLabel} sm={2}>
                Ingredients contains:
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Example: egg pepper salt" />
              </Col>
            </FormGroup>
            <FormGroup controlId="excludedIngredientBar">
              <Col componentClass={ControlLabel} sm={2}>
                Ingredients does NOT contain:
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Example: onions" onChange={this.handleExcludedIngredientChange}/>
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
          <Recipes recipeList={this.state.recipes} availableList={this.state.availableRecipes}/>
        </div>
      </div>
    );
  }
}
export default App;
