const urlapi =
  import.meta.env.VITE_APP_ENV === "development"
    ? import.meta.env.VITE_APP_API_DEV
    : import.meta.env.VITE_APP_API_PROD;

const apilogin = "/api/auth/login";

function apiListUser(page, limit, searchtext) {
  let url = `/api/v1/user/count?page=${page}&limit=${limit}`;
  if (searchtext !== "") url += `&search_like=${searchtext}`;
  return url;
}

const apiUserShow = (id) => `/api/v1/user/${id}`;

function apiget(id) {
  return urlapi + "/masterdata/" + id;
}

export { urlapi, apilogin, apiListUser, apiUserShow, apiget };
