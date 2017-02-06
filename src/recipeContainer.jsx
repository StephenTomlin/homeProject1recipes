import React, {Component} from 'react';
import { Media, Button, Glyphicon } from 'react-bootstrap';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {starred: true};
  }
  componentDidMount() {
    console.log(this.props.recipeList)
  }
  render() {

    var starred = this.state.starred;
    var star_icon = null;

    if (this.state.starred) {
      star_icon = <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
    } else {
      star_icon = <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
    }

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
                        { star_icon }
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
                    <Button bsStyle="success" bsSize="small"><Glyphicon glyph="star" /> Favourite </Button>
                    </ul>
                  </Media.Body>
                </Media>
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
