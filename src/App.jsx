import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';
import Fridge from './fridge.jsx';
// import Favourites from './favourites.jsx';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Label } from 'react-bootstrap';

var app_id = "448f67d9";
var app_key = "c21a694ca9204f51fa82d8ade53c791b";
var url = "http://api.yummly.com/v1/api/recipes";

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
    var url_full = url + "?" + "_app_id=" + app_id + "&" + "_app_key=" + app_key
                        + "&q=" + this.state.query
    if (this.state.excludedIngredient != '') {
      url_full = url_full + "&excludedIngredient[]=" + this.state.excludedIngredient
    }
    console.log('url_full: ', url_full);
    event.preventDefault();

    if (this.state.query != '') {
      fetch('http://localhost:8080/api/recipes', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SearchParams': url_full
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let parsed = JSON.parse(responseJson)
        this.setState({recipes: parsed.matches})
        console.log("recipes returned from API", this.state.recipes)
        })
    }
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
          <Fridge/>
        </div>
      </div>
    );
  }
}
export default App;
