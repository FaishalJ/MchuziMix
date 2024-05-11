export default function Bookmarks(props) {
  const { setShowBookmarks, bookmarkedRecipes, onHandleShowDetails } = props;

  return (
    <div className="bookmark">
      <span className="bookmark-close" onClick={() => setShowBookmarks(false)}>
        &#935;
      </span>
      <div className="bookmark-recipes">
        {bookmarkedRecipes.length === 0 ? (
          <Nobookmarks />
        ) : (
          <BookmarkedRecipes bookmarkedRecipes={bookmarkedRecipes} onHandleShowDetails={onHandleShowDetails} />
        )}
      </div>
    </div>
  );
}

function Nobookmarks() {
  return (
    <p className="bookmark-text">
      No bookmarks yet. Find a nice recipe and bookmark it!
    </p>
  );
}

function BookmarkedRecipes(props) {
  const { bookmarkedRecipes, onHandleShowDetails } = props;

  return (
    <ul className="bookmark-list">
      {bookmarkedRecipes.map((bookmark, ind) => (
        <BookmarList key={ind} bookmark={bookmark} onHandleShowDetails={onHandleShowDetails} />
      ))}
    </ul>
  );
}

function BookmarList(props) {
  const { bookmark, onHandleShowDetails } = props;
  return (
    <li className="bookmark-el"  onClick={()=>onHandleShowDetails(bookmark.id)}>
      <a href="#">
        <figure>
          <img src={bookmark.image_url} alt={bookmark.title} />
        </figure>
        <div>
          <h4>{bookmark.title}</h4>
          <p>{bookmark.publisher}</p>
        </div>
      </a>
    </li>
  );
}