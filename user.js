import { getUserIds } from "./storage.js";

window.onload = function () {
  const users = getUserIds();

  const params = new URLSearchParams(window.location.search);

  if (params.has("userId")) {
    const userId = params.get("userId");
    console.log(userId);
  }
};
