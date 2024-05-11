// import Button from "./Button";
import { useState } from "react";

export default function Details(props) {
  const {
    setShowDetails,
    details,
    setShowBookmarks,
    onHandleBookmarked,
    bookmarkedRecipes,
  } = props;

  const {
    cooking_time,
    id,
    image_url,
    ingredients,
    publisher,
    servings,
    source_url,
    title,
  } = details;
  
  const [count, setCount] = useState(servings);
  const serv = (count - servings) / count;

  const newRecipe = {
    id,
    image_url,
    publisher,
    title
  }

  function handleCloseDetails() {
    setShowDetails(false);
    setShowBookmarks(false);
  }

  return (
    <div className="details">
      <button className="details-btn" onClick={handleCloseDetails}>
        <i class="fas fa-arrow-left"></i>
      </button>
      <Banner image={image_url} title={title} />
      <div className="details-container">
        <Servings
          cookingTime={cooking_time}
          onHandleBookmarked={onHandleBookmarked}
          id={id}
          bookmarkedRecipes={bookmarkedRecipes}
          count={count}
          setCount={setCount}
          newRecipe={newRecipe}
        />
        <Ingredients ingredients={ingredients} serv={serv} />
        <Directions source={source_url} publisher={publisher} />
      </div>
    </div>
  );
}

function Banner(props) {
  const { image, title } = props;
  return (
    <div className="banner">
      <figure>
        <img src={image} />
        <figcaption>
          <h2>{title}</h2>
        </figcaption>
      </figure>
    </div>
  );
}

function Servings(props) {
  const {
    cookingTime,
    onHandleBookmarked,
    id,
    bookmarkedRecipes,
    count,
    setCount,
    newRecipe,
  } = props;

  function handleAddServing() {
    setCount(count=>count = count + 1);
  }
  function handleSubServing() {
    count > 1 && setCount(count=>count = count - 1);
  }

  return (
    <div className="servings">
      <div className="servings--descrpt">
        <p>
          <i class="fa fa-clock"></i>{" "}
          <span>
            <strong>{cookingTime}</strong> minutes
          </span>
        </p>
        <p>
          <i class="fas fa-people-arrows"></i>{" "}
          <span>
            <strong>{count}</strong> servings
          </span>
        </p>
        <p>
          <span onClick={handleSubServing}>
            <i class="fas fa-minus"></i>
          </span>{" "}
          <span onClick={handleAddServing}>
            <i class="fas fa-plus"></i>
          </span>
        </p>
      </div>
      <button className="btn" onClick={() => onHandleBookmarked(newRecipe)}>
        {bookmarkedRecipes.some((book) => book.id === id) ? (
          <span key={id}>
            <i class="fas fa-bookmark"></i>
          </span>
        ) : (
          <span>
            <i class="far fa-bookmark"></i>
          </span>
        )}
      </button>
    </div>
  );
}

function Ingredients(props) {
  const { ingredients, serv } = props;

  return (
    <div className="ingredients">
      <h2 className="details-title">recipe ingredients</h2>
      <ul className="ingredients-list">
        {ingredients.map((ing, ind) => (
          <IngList key={ind} ing={ing} serv={serv}/>
        ))}
      </ul>
    </div>
  );
}

function IngList(props) {
  const { ing, serv } = props;

  return (
    <li className="ingredients-el">
      <span>
        <i class="fa fa-check"></i>
      </span>
      <p>
        {(ing.quantity + serv).toFixed(1)} {ing.unit} {ing.description}
      </p>
    </li>
  );
}

function Directions(props) {
  const { source, publisher } = props;

  return (
    <div className="directions">
      <h2 className="details-title">how to cook</h2>
      <p>
        {`This recipe was carefully designed and tested by ${publisher}.
        Please check out directions at their website.`}
      </p>
      <a href={source} target="_blank" className="btn btn--direction">
        <span>DIRECTIONs</span>
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  );
}
