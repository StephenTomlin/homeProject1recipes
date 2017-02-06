import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';
import { Button, FormGroup, Checkbox, Label } from 'react-bootstrap';

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
          <Navbar/>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search for Recipes
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              {/* <input type="text" value={this.state.value} onKeyDown={this.handleEnter} /> */}
            </label>
            {this.state.keywordList.map(function (value) {
              return <span><Label>{value}</Label></span>
            })}
            <Label>New Label</Label>&nbsp;
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
