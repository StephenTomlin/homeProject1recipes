import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';
import { Button, FormGroup, Checkbox } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  recipes:[],
                  available:[],
                  availableRecipes:[],
                  availableCourses:[],
                  selectedCourses:[]
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value != '') {
      fetch(`http://api.yummly.com/v1/api/recipes?_app_id=448f67d9&_app_key=c21a694ca9204f51fa82d8ade53c791b&q=${this.state.value}&requirePictures=true`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({recipes:responseJson.matches});
        console.log(this.state.recipes)
      })
    }
  }
  componentDidMount() {
    if (this.state.available.length != 0) {
      fetch(`http://api.yummly.com/v1/api/recipes?_app_id=448f67d9&_app_key=c21a694ca9204f51fa82d8ade53c791b&q=${this.state.available}&requirePictures=true`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({availableRecipes:responseJson.matches});
        console.log(this.state.availableRecipes)
      })
    }
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
          <Navbar/>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search for Recipes
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <Button bsStyle="primary" type="submit">
              Submit
            </Button>
            <FormGroup>
              {this.state.availableCourses.map(function (value) {
                return <Checkbox inline>{value}</Checkbox>
              })}
            </FormGroup>
          </form>
          <Recipes recipeList={this.state.recipes} availableList={this.state.availableRecipes}/>
        </div>
      </div>
    );
  }
}
export default App;
