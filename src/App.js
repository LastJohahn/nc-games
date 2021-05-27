import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header-homepage";
import Nav from "./components/Nav";
import ReviewById from "./components/ReviewById";
import Reviews from "./components/Reviews";
import ReviewsByCategory from "./components/ReviewsByCategory";

function App() {
  const [reviews, setReviews] = useState([]);
  return (
    <div className="App">
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Reviews reviews={reviews} setReviews={setReviews} />
        </Route>
        <Route exact path="/reviews/:review_id">
          <ReviewById />
        </Route>
        <Route exact path="/:category">
          <ReviewsByCategory reviews={reviews} setReviews={setReviews} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
