import React, {Component} from 'react';

class Recipes extends Component {
  componentDidMount() {
    $.ajax({
      url: 'http://api.yummly.com/v1/api/recipe/Avocado-cream-pasta-sauce-recipe-306039?_app_id=448f67d9&_app_key=c21a694ca9204f51fa82d8ade53c791b',
      data: data,
      success: function() {this.setstate,
      dataType: dataType
    });
  }
  render() {
    return (
      <div>
        <h1>Mom's cookbook directory</h1>
      </div>
    );
  }
}
export default Recipes;