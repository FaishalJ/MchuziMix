import Button from "./Button";
import { useState } from "react";

/** ************************************************************************* */
/** ************************************************************************* */
export default function Recipes(props) {
  const { recipes, search, onHandleShowDetails, setRecipes, bookmarkedRecipes } = props;
  
  !search && recipes.splice(0);
  
  return (
    <div className="recipes">
      {!search ? (
        <Text />
      ) : (
        <Results recipes={recipes} onHandleShowDetails={onHandleShowDetails} />
      )}
    </div>
  );
}

function Text() {
  return <p className="recipes-text">🔎 search for your favorite recipes</p>;
}

function Results(props) {
  const { recipes, onHandleShowDetails } = props;
  const result = Math.ceil(recipes.length / 16);
  const [page, setPage] = useState(1);

  const recipes16 = recipes.slice((page - 1) * 16, page * 16);

  function handlePrevPage() {
    page > 1 && setPage((page) => (page = page - 1));
  }
  function handleNextPage() {
    page !== result && setPage((page) => (page = page + 1));
  }

  return (
    <div className="recipes-container">
      <ul className="recipes-results">
        {recipes16.map((recipe, ind) => (
          <List
            recipe={recipe}
            key={ind}
            onHandleShowDetails={onHandleShowDetails}
          />
        ))}
      </ul>
      <div className="recipes-btns">
        {page > 1 && (
          <Button style={{position: 'absolute', left: 0}} onClick={handlePrevPage}>
            <i class="fas fa-arrow-left"></i>
            <span>Page {page - 1}</span>
          </Button>
        )}
        {page !== result && (
          <Button type="submit" style={{position: 'absolute', right: 0}} onClick={handleNextPage}>
            <span>Page {page + 1}</span>
            <i class="fas fa-arrow-right"></i>
          </Button>
        )}
      </div>
    </div>
  );
}

function List(props) {
  const { recipe, onHandleShowDetails } = props;

  return (
    <li className="recipes-list" onClick={() => onHandleShowDetails(recipe.id)}>
      <a href="#">
        <figure>
          <img src={recipe.image_url} alt={recipe.title} />
          <figcaption>
            <h4>{recipe.title}</h4>
            <p>{recipe.publisher}</p>
          </figcaption>
        </figure>
      </a>
    </li>
  );
}
