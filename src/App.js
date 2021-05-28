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

function App() {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);

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
          <Route exact path="/:category">
            <ReviewsByCategory
              reviews={reviews}
              setReviews={setReviews}
              categories={categories}
            />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
