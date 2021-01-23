import { Component } from "react";
import axios from "axios";
import "./App.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import bevelyn from "./bevelyn.jpg";

class App extends Component {
   constructor(props) {
      super(props);

      this.createGrid = this.createGrid.bind(this);
   }

   state = {
      recipes: [],
      loaded: false,
   };

   buildCol(recipe_object) {
      return (
         <Col>
            <a href={recipe_object["Recipe_Link"]} target="_blank">
               <div>
                  <img
                     className="ImageSize"
                     src={this.replaceOpenWithThumbnail(
                        recipe_object["Picture"]
                     )}
                  />
                  <p>{recipe_object["Recipe_Name"]}</p>
               </div>
            </a>
         </Col>
      );
   }

   createGrid() {
      let rows = [];
      for (let count = 0; count < this.state.recipes.length; count += 2) {
         console.log(count + 1 in this.state.recipes);
         if (count + 1 in this.state.recipes) {
            rows.push(
               <Row>
                  {this.buildCol(this.state.recipes[count].fields)}
                  {this.buildCol(this.state.recipes[count + 1].fields)}
               </Row>
            );
         } else {
            rows.push(
               <Row>{this.buildCol(this.state.recipes[count].fields)}</Row>
            );
         }
      }
      return rows;
   }

   replaceOpenWithThumbnail(link) {
      return link.replace("/open?", "/thumbnail?");
   }

   componentDidMount() {
      if (!this.state.loaded && this.state.recipes.length === 0) {
         axios
            .get(`https://kennethjchow.api.stdlib.com/bevelyn-recipe-api@dev/`)
            .then((res) => {
               const recipes = res.data.rows.sort((a, b) => (a.Timestamp > b.Timestamp) ? 1 : -1)
               this.setState({ recipes: res.data.rows, loaded: true });
            });
      }
   }
   render() {
      return (
         <div className="App">
            <div className="TitleBar">
               <img className="logo" src={bevelyn}></img>
               <h6 className="Title">Baking with Bevelyn Links</h6>
            </div>
            <div className="RecipeGridContainer">
               <p className="tap-message">Tap image to go to recipe</p>
               <Container >
                  {this.createGrid()}
               </Container>
            </div>
         </div>
      );
   }
}

export default App;
