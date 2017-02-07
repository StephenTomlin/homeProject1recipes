import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Label } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  recipes:[],
                  available:[],
                  availableRecipes:[],
                  availableCourses:[],
                  selectedCourses:[],
                  keywordList: ['egg', 'ham', 'pepper']
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleChange(event) {
    // var keywordList = this.state.keywordList.slice()
    // keywordList.push(event.target.value)
    // this.setState({keywordList: keywordList })
    this.setState({value: event.target.value});
  }

  handleEnter(event) {
    console.log(event.target.value);
  }

  handleQuery(event){
    if (this.state.value != '') {
      fetch('http://localhost:8080/api/recipes', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SearchParams': this.state.value
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let parsed = JSON.parse(responseJson)
        this.setState({recipes: parsed.matches})
        console.log(this.state.recipes)
        })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value != '') {
      fetch('http://localhost:8080/api/recipes', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'SearchParams': this.state.value
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let parsed = JSON.parse(responseJson)
        this.setState({recipes: parsed.matches})
        console.log(this.state.recipes)
        })
    }
    this.setState({keywordList: this.state.keywordList.concat([event.target.value]) })
    console.log("Event.target.value :", event.target.value);
    console.log("Event.target :", event.target);
    console.log("Event :", event);
  }

  componentDidMount() {
    this.setState(
      {availableCourses:
        ["Main Dishes", "Desserts", "Side Dishes", "Lunch and Snacks", "Appetizers", "Salads",
        "Breads", "Breakfast and Brunch", "Soups", "Beverages", "Condiments and Sauces", "Cocktails"]
      }
    );
  }


  render() {
    return (
      <div className = "container">
        <div className = "row">
          Enter search criteria
        </div>
        <div className = "row">
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalRecipeName">
              <Col componentClass={ControlLabel} sm={2}>
                Recipe name contains:
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Example: omelette" onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalIngredientsContain">
              <Col componentClass={ControlLabel} sm={2}>
                Ingredients contains:
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Example: egg pepper salt" />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalIngredientsDoesNotContain">
              <Col componentClass={ControlLabel} sm={2}>
                Ingredients does NOT contain:
              </Col>
              <Col sm={4}>
                <FormControl type="text" placeholder="Example: onions" />
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
