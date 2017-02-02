import React, {Component} from 'react';

class Recipes extends Component {
  componentDidMount() {
    console.log(this.props.recipeList)
  }
  render() {
    return (
      <section>
        <h1>Recipe Directory</h1>
        <div className = "row">
        <section className="contain-recipes">
          {this.props.recipeList.map((item,index)=>(
            <div className ="rowStyle col-sm-4" value={item} key={index}>
              <div className="recipeCard">
                <h3 className="cardContents">{item.recipeName}</h3>
                <h4 className="cardContents">{item.totalTimeInSeconds}</h4>
                <img className="cardContents" src={item.imageUrlsBySize[90]}/>
                {item.ingredients.map(function (value) {
                  return <p className="cardContents" key={value}>{value}</p>;
                })}
              </div>
            </div>
          ))}
        </section>
        </div>
        <h1>What You Can Make</h1>
        <section className="available-recipes">
        {this.props.availableList.map((item,index)=>(
          <div className ="rowStyle" value={item} key={index}>
            <div className="recipeCard">
              <h3 className="cardContents">{item.recipeName}</h3>
              <h4 className="cardContents">{item.totalTimeInSeconds}</h4>
              <img className="cardContents" src={item.imageUrlsBySize[90]}/>
              {item.ingredients.map(function (value) {
                return <p className="cardContents" key={value}>{value}</p>;
              })}
            </div>
          </div>
        ))}
        </section>
      </section>
    );
  }
}
export default Recipes;
