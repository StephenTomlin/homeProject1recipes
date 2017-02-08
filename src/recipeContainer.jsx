import React, {Component} from 'react';
import { Media, Glyphicon } from 'react-bootstrap';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';

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
          firstParam: item
        })
      })
    }
  }

  render() {

    var starred = this.state.starred;
    var star_icon = null;
    var imageUrlSmall;
    return (
      <Grid>
        {this.props.recipeList.map((item,index)=>(
          <Row>
            <Col xs={6} md={4}>
              <Thumbnail src={item.imageUrlsBySize[90]} alt="242x200">
                <h3>Thumbnail label</h3>
                <p>Description</p>
                <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
                </p>
              </Thumbnail>
            </Col>
          </Row>
        ))}
      </Grid>
    );
  }
}
export default Recipes;
