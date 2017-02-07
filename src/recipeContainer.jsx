import React, {Component} from 'react';
import { Media, Button, Glyphicon } from 'react-bootstrap';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {starred: true};
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  componentDidMount() {
  }

  handleFavourite(item) {
    console.log(item)
    event.preventDefault();
    if (this.state.starred === true) {
      fetch('http://localhost:8080/api/recipeSave', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe: item
        })
      })
    }
  }

  render() {

    var starred = this.state.starred;
    var star_icon = null;

    return (
      <section>
        <h1>Recipe Directory</h1>
        <div className = "row">
        <section className="contain-recipes">
          {this.props.recipeList.map((item,index)=>(
            <div className ="rowStyle col-sm-4" value={item} key={index}>
              <div className="recipeCard">
                <Media>
                  <Media.Left>
                    <img className="cardContents" src={item.imageUrlsBySize[90]}/>
                  </Media.Left>
                  <Media.Body>
                    <Media.Heading>
                      <h3 className="cardContents">
                        <span className="glyphicon glyphicon-star" aria-hidden="true" onClick={() => {this.handleFavourite(item)}}></span>
                        {' '}
                        {item.recipeName}
                      </h3>
                    </Media.Heading>
                    <h4 className="cardContents">{item.attributes.course}</h4>
                    <h4 className="cardContents">{item.totalTimeInSeconds}</h4>
                    <ul>
                      {item.ingredients.map(function (value) {
                        return <li className="cardContents" key={value}>{value}</li>;
                      })}
                    <Button bsStyle="success" bsSize="small" ><Glyphicon glyph="star" /> Favourite </Button>
                    </ul>
                  </Media.Body>
                </Media>
              </div>
            </div>
          ), this)}
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
