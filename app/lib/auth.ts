import { CustomResponseData } from "@/app/lib/type";

export async function getRequestToken() {
  const api = "https://api.themoviedb.org/3/authentication/token/new";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success) {
      return {
        isError: false,
        message: "Get request token successfully.",
        data: data,
      };
    } else {
      return {
        isError: true,
        message: "Can not get request token.",
        data: data,
      };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function validateRequestToken(
  username: string,
  password: string
): Promise<CustomResponseData> {
  const fetchRequestToken = await getRequestToken();
  if (!fetchRequestToken.isError) {
    const api =
      "https://api.themoviedb.org/3/authentication/token/validate_with_login";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        request_token: fetchRequestToken.data.request_token,
      }),
    };
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success) {
      return {
        isError: false,
        message: "Validate request token successfully.",
        data: data,
      };
    } else {
      return {
        isError: true,
        message: "Can not validate request token.",
        data: data,
      };
    }
  } else {
    return fetchRequestToken;
  }
}

export async function getSessionId(username: string, password: string) {
  const validation = await validateRequestToken(username, password);
  if (!validation.isError) {
    const requestToken = validation.data?.request_token;
    const api = "https://api.themoviedb.org/3/authentication/session/new";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    };
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success) {
      return { isError: false, message: "Successfull.", data: data };
    } else {
      return { isError: true, message: "Can not get session ID.", data: data };
    }
  } else {
    return validation;
  }
}

export async function getDetailAccount(session_id: string | null) {
  if (!session_id) session_id = "empty";
  const api = `https://api.themoviedb.org/3/account/account_id?session_id=${session_id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.username) {
      return { isError: false, message: "Session Id is valid.", data: data };
    } else {
      return { isError: true, message: "Session Id is invalid.", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function getAuthState() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/user/get-auth-state`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const data = await res.json();

  if (!data) return { isLoggedIn: false, sessionId: "" };
  return data;
}

export async function setAuthState(isLoggedIn: boolean, sessionId: string) {
  const api = "/api/user/set-auth-state";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isLoggedIn: isLoggedIn,
      sessionId: sessionId,
    }),
  };
  const res = await fetch(api, options);
  const data = await res.json();
  return data;
}

export async function deleteSession(session_id: string) {
  const api = `https://api.themoviedb.org/3/authentication/session`;
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      session_id: session_id,
    }),
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success === false) {
      return { isError: true, message: data.status_message, data: data };
    } else {
      return { isError: false, message: "success", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}
