import { getUserIds, getData, setData } from "./storage.js";

display = document.getElementById("display");

window.onload = function () {
  const users = getUserIds();

  const params = new URLSearchParams(window.location.search);

  if (params.has("userId")) {
    const userId = params.get("userId");

    const userData = {
      bookmarks: [],
    };

    setData(userId, userData);

    const data = getData(userId);

    if (data.bookmarks.length === 0) {
      display.innerText = "No bookmarks found!";
      console.log("No bookmarks found");
    } else {
      display.innerText = data.bookmarks;
    }
  }
};
