import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header-homepage";
import Nav from "./components/Nav";
import ReviewById from "./components/ReviewById";
import Reviews from "./components/Reviews";
import ReviewsByCategory from "./components/ReviewsByCategory";
import { getCategories } from "./utils/api";
import { UserContext } from "./contexts/User";
import WrongPath from "./components/WrongPath";
import User from "./components/User";
import ReviewForm from "./components/ReviewForm";

function App() {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    username: "happyamy2016",
    name: "Amy Happy",
    avatar_url:
      "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  });

  useEffect(() => {
    getCategories().then((result) => {
      const categoriesToUse = result.categories;
      setCategories(categoriesToUse);
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Nav categories={categories} />
        <Switch>
          <Route exact path="/">
            <Reviews reviews={reviews} setReviews={setReviews} />
          </Route>
          <Route exact path="/reviews/:review_id">
            <ReviewById />
          </Route>
          <Route exact path="/post-review">
            <ReviewForm />
          </Route>
          <Route exact path="/categories/:category">
            <ReviewsByCategory
              reviews={reviews}
              setReviews={setReviews}
              categories={categories}
            />
          </Route>
          <Route exact path="/users/:username">
            <User reviews={reviews} setReviews={setReviews} />
          </Route>
          <Route path="/">
            <WrongPath />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
