import Button from "./Button";

export default function Navigation({ children }) {
  return <nav className="nav">{children}</nav>;
}

export function Logo() {
  return <h2 className="nav-logo">Mchuzi</h2>;
}

export function Search(props) {
  const { search, setSearch, onFetchData } = props;

  return (
    <form className="nav-form" onSubmit={onFetchData}>
      <input
        type="text"
        value={search}
        placeholder="Search recipes"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className="btn-search">
        <i class="fas fa-search"></i>
        <span>SEARCH</span>
      </Button>
    </form>
  );
}

export function Results(props) {
  const { showBookmarks, setShowBookmarks, results, search, recipes } = props;
  !search && recipes.splice(0);

  return (
    <div className="nav-menu">
      <span className="nav-results">
        <strong>{results > 0 ? (recipes.length === 0 ? 0 : results) : 0}</strong> Results
      </span>
      <span
        className="nav-bookmarks"
        onClick={() => setShowBookmarks(!showBookmarks)}
      >
        <i class="far fa-bookmark"></i> Bookmarks
      </span>
    </div>
  );
}
