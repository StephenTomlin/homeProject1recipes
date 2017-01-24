import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value != '') {
      fetch('http://localhost:8080/api/')
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