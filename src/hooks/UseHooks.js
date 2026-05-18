import * as global from "../utils/Global";
import { UseParam } from "./UseParam";

export function navigateTo(path) {
  window.location.href = path;
}

export async function useGet(url) {
  let data = null;
  let isloading = true;
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + UseParam.getToken(),
      },
    });
    if (response.status === 401) {
      console.log("response expired token");
      navigateTo("/login");
    } else if (response.status === 200) {
      let jsondata = await response.json();
      data = jsondata;
    } else {
      console.log("response code: ", response.status);
    }
  } catch (error) {
    console.log("error get: ", error.message);
    global.toastError("Fetch data error");
  } finally {
    isloading = false;
  }
  return { data, isloading };
}

export async function usePost(url, body, islogin) {
  let data = null;
  let success = false;
  let errors = false;
  let isloading = true;
  let token = islogin != null ? null : UseParam.getToken();
  try {
    let response = await fetch(url, {
      method: "POST",
      headers:
        token != null
          ? {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            }
          : {
              "Content-Type": "application/json",
            },
      body: JSON.stringify(body),
    });
    if (response.status === 401) {
      if (token !== null) {
        console.log("response expired token");
        navigateTo("/login");
      } else {
        errors = true;
      }
    } else if (response.status === 200) {
      let jsondata = await response.json();
      data = jsondata;
      success = true;
    } else {
      console.log("response code: ", response.status);
      errors = true;
    }
  } catch (error) {
    console.log("error post: ", error.message);
    global.toastError("Post data error");
  } finally {
    isloading = false;
  }
  return { data, success, errors, isloading };
}

export async function usePut(url, body) {
  let data = null;
  let success = false;
  let errors = false;
  let isloading = true;
  let token = UseParam.getToken();
  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 401) {
      console.log("response expired token");
      navigateTo("/login");
    } else if (response.status === 200) {
      let jsondata = await response.json();
      data = jsondata;
      success = true;
    } else {
      console.log("response code: ", response.status);
      errors = true;
    }
  } catch (error) {
    console.log("error put: ", error.message);
    global.toastError("Post data error");
  } finally {
    isloading = false;
  }
  return { data, success, errors, isloading };
}

export async function useDelete(url, body) {
  let data = null;
  let success = false;
  let errors = false;
  let isloading = true;
  let token = UseParam.getToken();
  try {
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: body !== null ? JSON.stringify(body) : null,
    });
    if (response.status === 401) {
      console.log("response expired token");
      navigateTo("/login");
    } else if (response.status === 200) {
      let jsondata = await response.json();
      data = jsondata;
      success = true;
    } else {
      console.log("response code: ", response.status);
      errors = true;
    }
  } catch (error) {
    console.log("error delete: ", error.message);
    global.toastError("Delete data error");
  } finally {
    isloading = false;
  }
  return { data, success, errors, isloading };
}
