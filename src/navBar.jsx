import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  recipes:[]
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search for Recipes
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Navbar;