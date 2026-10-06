import { 
  sortBookmarksReverseChronological, 
  createBookmarkObject, 
  incrementLikeCount 
} from './helper.js';

describe('Bookmark helper Functions', () => {

  test('createBookmarkObject initializes with correct structure and zero likes', () => {
    const bookmark = createBookmarkObject('https://example.com', 'Test', 'Description');
    expect(bookmark.url).toBe('https://example.com');
    expect(bookmark.title).toBe('Test');
    expect(bookmark.description).toBe('Description');
    expect(bookmark.likes).toBe(0);
    expect(bookmark.id).toBeDefined();
    expect(bookmark.createdAt).toBeDefined();
  });

  test('sortBookmarksReverseChronological orders items newest first', () => {
    const bookmarks = [
      { id: '1', createdAt: '2025-01-01T10:00:00.000Z' },
      { id: '2', createdAt: '2025-01-02T10:00:00.000Z' },
      { id: '3', createdAt: '2025-01-01T15:00:00.000Z' }
    ];

    const sorted = sortBookmarksReverseChronological(bookmarks);
    expect(sorted[0].id).toBe('2');
    expect(sorted[1].id).toBe('3');
    expect(sorted[2].id).toBe('1');
  });

  test('incrementLikeCount increases likes for targeted ID only', () => {
    const bookmarks = [
      { id: '1', likes: 0 },
      { id: '2', likes: 3 }
    ];

    const updated = incrementLikeCount(bookmarks, '1');
    expect(updated[0].likes).toBe(1);
    expect(updated[1].likes).toBe(3);
  });
});