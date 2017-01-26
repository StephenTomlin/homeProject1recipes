import React, {Component} from 'react';

class Recipes extends Component {
  componentDidMount() {
    console.log(this.props.recipeList)
  }
  render() {
    return (
      <section className="contain-recipes">
      {this.props.recipeList.map((item,index)=>(
        <div className ="rowStyle" value={item} key={index}>
          <div>
            <h3>{item.recipeName}</h3>
            <h4>{item.totalTimeInSeconds}</h4>
            <img src={item.imageUrlsBySize[90]} height="90" width="90"/>
            {item.ingredients.map(function (value) {
              return <p key={value}>{value}</p>;
            })}
          </div>
        </div>
      ))}
      </section>
    );
  }
}
export default Recipes;
