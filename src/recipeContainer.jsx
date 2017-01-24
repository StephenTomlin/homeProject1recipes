import React, {Component} from 'react';

class Recipes extends Component {
  render() {
    return (
      <section className="contain-recipes">
        {this.props.recipes.map((item,index)=>(
        <div className ="map" value={item} key={index}>
          <img src={item.picture} height="90" width="90"/>
          <div>{item.first_name} {item.last_name}</div>

          <div>{item.score}</div>
        </div>
      ))}
      </section>
    );
  }
}
export default Recipes;
