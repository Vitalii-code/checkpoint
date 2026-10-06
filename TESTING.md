Testing plan

This plan outlines how each requirement in the project rubric was implemented and verified.

---

## Item 1: User Dropdown List
**Requirement:** 
The website must contain a drop-down which lists five users.

**Description**
 The application executes `getUserIds()` from `storage.js`, which returns five default user IDs (`["1", "2", "3", "4", "5"]`). 
The `<select>` elements in `index.html` (`#user-select`) is populated dynamically with these options.

**Result**
  1. **Manual Inspection:** Opened `index.html` in a web browser and expanded the `<select>` element to confirm five distinct options ("User 1", "User 2", "User 3", "User 4", "User 5") were present.
  2. **DOM Testing:** Verified that `document.querySelectorAll('#user-select option').length` returns `5`.

---

## Item 2: Display User Bookmarks
**Requirement:** 
Selecting a user must display the list of bookmarks for the relevant user.

**Description** 
When a user selects a different option in the dropdown, the `change` event listener invokes `renderBookmarks()`. This retrieves user-specific bookmark data using `getData(userId)` from `storage.js` and updates the DOM.

**Result**
  1. **Manual Testing:** Created bookmarks for User 1 and User 2. Selected User 1 to confirm only User 1's links were displayed, then switched to User 2 to confirm only User 2's links were displayed.
  2. **Persistence Testing:** Closed the browser tab, reopened the site, selected User 1, and verified that User 1's saved bookmarks were accurately retrieved from LocalStorage.

---

## Item 3: Empty State Handling
**Requirement:** If there are no bookmarks for the selected user, a message is displayed to explain this.

**Description**
Inside `renderBookmarks()`, if `getData(userId)` returns `null` or an empty array (`[]`), the code injects `<p>No bookmarks found for this user.</p>` into `#bookmarks-container`.

**Result**
  1. **Manual Testing:** Selected a user ID (e.g., User 5) that had no stored data.
  2. **UI Inspection:** Confirmed that the container displayed the message "No bookmarks found for this user." instead of an empty view or throwing a DOM error.


---

## Item 4: Reverse Chronological Sorting
**Requirement:** 
The list of bookmarks must be shown in reverse chronological order.

**Description** 
Before rendering, bookmarks are sorted using `sortBookmarksReverseChronological()`, which compares `createdAt` timestamps so that newer bookmarks appear first.

**Result**
Unit tests in `addbookmark.test.js`.

---

## Item 5: Bookmark Fields Display
**Requirement:** 
Each bookmark has a title, description, and created at timestamp displayed.

**Description** 
During element creation in `app.js`, each bookmark generates:
  * title.
  * description.
  * URL in the table body

**Result**
  1. **Manual Testing:** Added a bookmark with title "MDN Docs" and description "JS reference", and verified that title, description text, and a formatted date string (e.g., "10/5/2026, 11:24:00 PM") were visibly rendered on the page.


---

## Item 6: Title Hyperlink
**Requirement:** Each bookmark’s title is a link to the bookmark’s URL.

**Description** 
In `app.js`, the title is created as an HTML `<a>` element with `href` set to `bookmark.url`, `target="_blank"`, and `rel="noopener noreferrer"`.

**Result**
  1. **Manual Testing:** Hovered over a bookmark title link to verify the browser URL preview matched the stored URL.
  2. **Click Verification:** Clicked the title link and confirmed it opened the target website in a new browser tab.



---

## Item 7: Copy to Clipboard Functionality
**Requirement:** 
Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark.

**Description** 
Each rendered bookmark contains a `<button>` with an event listener attached to `navigator.clipboard.writeText(bookmark.url)`.

**Result**
  1. **Manual Testing:** Clicked the "Copy URL" button on a rendered bookmark.
  2. **Clipboard Inspection:** Pasted (`Ctrl+V` / `Cmd+V`) into the browser address bar to confirm the copied text matched the bookmark's URL.


---

## Item 8: Independent & Persisted Like Counter
**Requirement:** 
Each bookmark's like counter works independently, and persists data across sessions.

* **Description** 
The like count is stored on each bookmark object as `likes`. Clicking the like button executes `incrementLikeCount()`, updates LocalStorage via `setData()`, and re-renders the UI.

**Result** 
Unit tests in `addbookmark.test.js`.


---

## Item 9: Accessible Form Inputs
**Requirement:** 
The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

**Description**
`addbookmark.html` contains an accessible `<form id="bookmark-form">` with:
  * `<input type="url" id="bookmark-url" required>`
  * `<input type="text" id="bookmark-title" required>`
  * `<input type="text" id="bookmark-description" required>`
  * `<button type="submit">Save Bookmark</button>`

**Result**
  1. **Keyboard Accessibility:** Navigated the form using `Tab` and `Shift+Tab`, and submitted using `Enter`.
  2. **Form Validation Testing:** Attempted submission with empty fields to confirm native browser form validation blocked invalid requests.

---

## Item 10: User-Specific Bookmark Storage
**Requirement:** 
Submitting the form adds a new bookmark for the relevant user only.

**Description** 
When submitting `#bookmark-form`, the active user ID selected in the dropdown is retrieved, and the new bookmark object is pushed strictly to that specific user's array in `setData(userId, data)`.

**Result**
  **Manual Testing:** Selected User 2, created a bookmark titled "User 2 Link". Switched to User 1 and User 3 to confirm "User 2 Link" was not visible under other users.

---

## Item 11: Display Update After Form Submission
**Requirement:** 
After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark.

**Description** 
Upon form submission, `setData()` saves the updated bookmark array, and the window redirects back to `addbookmark.html`, where `renderBookmarks()` executes on page load to display the updated list.
**Result**
  1. **Manual Testing:** Filled out and submitted the form in `addbookmark.html`.
  2. **DOM Verification:** Confirmed automatic redirection to `addbookmark.html` occurred and the newly created link appeared at the top of the list.

---

## Item 12: Lighthouse Accessibility Compliance
**Requirement:** 
The website must score 100% for accessibility in Lighthouse in Desktop device mode, for all views in the website.

**Description**
  * All inputs have explicit `<label for="...">` associations.
  * Semantic HTML elements (`<header>`, `<main>`, `<nav>`, `<form>`, `<h1>`, `<h2>`) are used throughout.
  * Color contrast ratios meet standard WCAG guidelines.

**Result**
  1. **Lighthouse Audit:** Ran Chrome DevTools Lighthouse audit in **Desktop Mode** for both `index.html` and `addbookmark.html`.
  2. **Score Result:** Achieved 100% Accessibility score across all views.

---

## Item 13: Non-Trivial Unit Tests
**Requirement:** 
Unit tests must be written for at least one non-trivial function.

**Description** 
Unit tests are written using Jest in `addbookmark.test.js` to cover helper functions (`createBookmarkObject`, `sortBookmarksReverseChronological`, and `incrementLikeCount`).

**Result** Unit tests in `addbookmark.test.js`.

## Item 14: No dead code
**Requirement:** 
The project must not contain any dead code. All written Javascript and CSS must be used.

**Description** 
Peer review of the html , javascript and CSS have been done.

**Result** 
No dead code are found.