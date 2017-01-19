import React, {Component} from 'react';
import Navbar from './navBar.jsx';
import Recipes from './recipeContainer.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Recipes/>
      </div>
    );
  }
}
export default App;
