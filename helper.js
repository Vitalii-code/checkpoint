export function sortBookmarksReverseChronological(bookmarks = []) {
  return [...bookmarks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createBookmarkObject(url, title, description) {
  return {
    id: Date.now().toString(),
    url,
    title,
    description,
    createdAt: new Date().toISOString(),
    likes: 0
  };
}

export function incrementLikeCount(bookmarks, bookmarkId) {
  return bookmarks.map(bookmark => {
    if (bookmark.id === bookmarkId) {
      return { ...bookmark, likes: (bookmark.likes || 0) + 1 };
    }
    return bookmark;
  });
}