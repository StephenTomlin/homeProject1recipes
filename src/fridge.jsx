import React, {Component} from 'react';


class fridge extends Component {
  // when fridge component loads so does the contents of the fridge
  componentDidMount () {
    fetch('http://localhost:8080/api/fridge', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responsejson) => console.log(responsejson))
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
      .then((response) => {
        return response.json()
      })
    })
  }

  // same thing as add ingredient but now removes it from the database item should be a string
  handleIngredientDel (item) {
    fetch('http://localhost:8080/api/fridge', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'SearchParams': item
      }
      .then((response) => {
        return response.json()
      })
    })
  }

  render() {
    return (
      <h2>fridge supplies go in here</h2>
    );
  }
}
export default fridge;