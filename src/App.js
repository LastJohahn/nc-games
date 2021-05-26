import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header-homepage";
import Nav from "./components/Nav";
import ReviewById from "./components/ReviewById";
import Reviews from "./components/Reviews";
import ReviewsByCategory from "./components/ReviewsByCategory";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Reviews />
        </Route>
        <Route exact path="/reviews/:review_id">
          <ReviewById />
        </Route>
        <Route exact path="/:category">
          <ReviewsByCategory />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
