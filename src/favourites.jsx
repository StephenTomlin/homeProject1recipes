import React, {Component} from 'react';
import { Media, Button, Glyphicon } from 'react-bootstrap';

class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {fav_recipeNames:{}};
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/recipeSave', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responsejson) => {
      let parsed = JSON.parse(responsejson)
      this.setState({fav_recipesNames: parsed.matches})
    }).then(this.state.fav_recipesNames.map(index,item){
      fetch('')
    }))
  }

  handleUnfavourite(item) {
    event.preventDefault();
    fetch('http://localhost:8080/api/recipeSave', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'SearchParams': item.id
      }
    })
    .then((response) => response.json())
    .then((responsejson) => console.log(responsejson))
  }

  render() {
    return (
      <h2>look up recipes</h2>
    );
  }
}
export default Favourites;
