import "../AppMain.css";
import { useState, useEffect } from "react";
import Navigation, { Logo, Search, Results } from "./Navigation";
import Main from "./Main";
import Footer from "./Footer";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
const tempId = "5ed6604591c37cdc054bc886";

export default function App() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState(function () {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) {
      return JSON.parse(bookmarks);
    } else {
      return [];
    }
  });
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [results, setResults] = useState(0);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [recipeId, setRecipeId] = useState(tempId);
  const [details, setDetails] = useState({});

  /**************************************************************************/
  /**************************************************************************/
  // useEffect(() => {
  //   const controller = new AbortController();
  //   async function fetchData() {
  //     try {
  //       setErr(null);
  //       setLoad(true);
  //       const response = await Promise.race([
  //         timeout(5),
  //         fetch(
  //           `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`,
  //           { signal: controller.signal },
  //         ),
  //       ]);

  //       if (!response.ok)
  //         throw new Error(`oops! ${response.statusText} (${response.status})`);
  //       const data = await response.json();
  //       if (data.results === 0)
  //         throw new Error("⛔ No results found, try gain!");

  //       const { recipes } = data.data;

  //       setLoad(false);

  //       setResults(data.results);
  //       setRecipes(recipes);
  //       setErr(null);
  //     } catch (error) {
  //       console.error(error);
  //       if (error.name !== "AbortError") setErr(error.message);
  //     } finally {
  //       setLoad(false);
  //     }
  //   }
  //   // .....
  //   fetchData();
  //   setErr(null);

  //   return function () {
  //     controller.abort();
  //   };
  // }, [search]);
  /**************************************************************************/
  /**************************************************************************/

  async function onFetchData(e) {
    e.preventDefault();
    setShowDetails(false);
    setShowBookmarks(false);
    
    try {
      setErr(null);
      setLoad(true);
      const response = await Promise.race([
        timeout(5),
        fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`,
        ),
      ]);
      if (!response.ok)
        throw new Error(`oops! ${response.statusText} (${response.status})`);
      const data = await response.json();
      if (data.results === 0) throw new Error("⛔ No results found, try gain!");

      const { recipes } = data.data;
      setLoad(false);

      setResults(data.results);
      setRecipes(recipes);
      setErr(null);
      
    } catch (error) {
      // console.error(error);
      setErr(error.message);
    }
  }

  function handleShowDetails(id) {
    setRecipeId(id);
    setShowDetails(true);
    setShowBookmarks(false);
  }

  useEffect(() => {
    async function fetchDetails() {
      try {
        setErr(null);
        setLoad(true);
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`,
        );
        if (!response.ok) throw new Error(`wrong id! (${response.status})`);

        const data = await response.json();
        const { recipe } = data.data;
        setDetails(recipe);
        setLoad(false);
      } catch (error) {
        // console.error(error);
        setErr(error.message);
        setErr(error.message);
      } finally {
        setLoad(false);
      }
    }
    fetchDetails();
  }, [recipeId]);

  function handleBookmarked(recipe) {
    const isBookmarked = bookmarkedRecipes.some((book) => book.id === recipeId);
    const filtered = bookmarkedRecipes.filter((book) => book.id !== recipeId);

    isBookmarked
      ? setBookmarkedRecipes(filtered)
      : setBookmarkedRecipes((bookmarkedRecipes) => [
          ...bookmarkedRecipes,
          recipe,
        ]);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedRecipes));
  }

  return (
    <>
      <Navigation>
        <Logo />
        <Search
          search={search}
          setSearch={setSearch}
          onFetchData={onFetchData}
        />
        <Results
          showBookmarks={showBookmarks}
          setShowBookmarks={setShowBookmarks}
          results={results}
          search={search}
          recipes={recipes}
        />
      </Navigation>

      <Main
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
        search={search}
        recipes={recipes}
        setRecipes={setRecipes}
        load={load}
        err={err}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        details={details}
        onHandleBookmarked={handleBookmarked}
        bookmarkedRecipes={bookmarkedRecipes}
        onHandleShowDetails={handleShowDetails}
      />
      <Footer />
    </>
  );
}
