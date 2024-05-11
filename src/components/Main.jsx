import Bookmarks from "./Bookmarks";
import Recipes from "./Recipes";
import Details from "./Details";
import Load from "./Load";
import Error from "./Error";

export default function Main(props) {
  const {
    showBookmarks,
    setShowBookmarks,
    search,
    recipes,
    setRecipes,
    load,
    err,
    showDetails,
    setShowDetails,
    details,
    onHandleBookmarked,
    bookmarkedRecipes,
    onHandleShowDetails,
  } = props;

  return (
    <main className="main">
      {showBookmarks && (
        <Bookmarks
          setShowBookmarks={setShowBookmarks}
          bookmarkedRecipes={bookmarkedRecipes}
          onHandleShowDetails={onHandleShowDetails}
        />
      )}

      {load && !err && <Load />}
      {!load && !showDetails && !err && (
        <Recipes
          recipes={recipes}
          search={search}
          onHandleShowDetails={onHandleShowDetails}
          setRecipes={setRecipes}
          bookmarkedRecipes={bookmarkedRecipes}
        />
      )}
      {!load && showDetails && (
        <Details
          setShowDetails={setShowDetails}
          details={details}
          setShowBookmarks={setShowBookmarks}
          onHandleBookmarked={onHandleBookmarked}
          bookmarkedRecipes={bookmarkedRecipes}
        />
      )}
      {err && <Error>{err}</Error>}
    </main>
  );
}
