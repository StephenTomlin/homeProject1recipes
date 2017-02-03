import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  recipes:[],
                  available:[],
                  availableRecipes:[]
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
          </form>
          <Recipes recipeList={this.state.recipes} availableList={this.state.availableRecipes}/>
        </div>
      </div>
    );
  }
}
export default App;
