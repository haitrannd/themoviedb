import { NextResponse } from "next/server";
import { NextRequestQueryType, MovieVideo } from "@/app/lib/type";

export async function getMovieList(type: string, page = 1) {
  let api = "";

  switch (type) {
    case "popular":
      api = `https://api.themoviedb.org/3/movie/popular`;
      break;

    case "top_rated":
      api = `https://api.themoviedb.org/3/movie/top_rated`;
      break;

    case "upcoming":
      api = `https://api.themoviedb.org/3/movie/upcoming`;
      break;

    default:
      api = `https://api.themoviedb.org/3/movie/now_playing`;
      break;
  }

  api += `?page=${page}`;

  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    next: { revalidate: 60, tags: ["movie_list"] },
  };

  try {
    const res = await fetch(api, options);
    const movies = await res.json();
    return movies;
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function getDetailMovie(id: number) {
  const api = `https://api.themoviedb.org/3/movie/${id}`;
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function searchMovies(
  key: NextRequestQueryType,
  page: NextRequestQueryType
) {
  if (key) {
    let api = `https://api.themoviedb.org/3/search/movie?query=${key}`;
    if (page) {
      api = `https://api.themoviedb.org/3/search/movie?query=${key}&page=${page}`;
    }
    const options: object = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    try {
      const res = await fetch(api, options);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error("Something happened! Please try again later!");
    }
  }

  return NextResponse.json({
    isError: true,
    message: "Search keyword is required.",
  });
}

export async function getWatchlist(session_id: string) {
  const api = `https://api.themoviedb.org/3/account/account_id/watchlist/movies?session_id=${session_id}`;
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (!data.success) {
      return { isError: true, message: data.status_message, data: data };
    }

    return { isError: false, message: "Success", data: data };
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function getUserMovieData(
  type: string | null,
  page: string | null,
  session_id: string | undefined,
  sort_by: string | null
) {
  if (type) {
    let api = `${process.env.NEXT_PUBLIC_DOMAIN}/api/movies/watchlist`;
    const query = [];

    if (page) {
      query.push(`page=${page}`);
    }

    if (session_id) {
      query.push(`session_id=${session_id}`);
    } else {
      query.push(`session_id=empty`);
    }

    if (sort_by) {
      query.push(`sort_by=${sort_by}`);
    }

    switch (type) {
      case "ratings":
        api = `https://api.themoviedb.org/3/account/account_id/rated/movies`;
        break;
    }

    if (query.length > 0) {
      const queryString = query.join("&");
      api += `?${queryString}`;
    }

    const options: object = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    };

    try {
      const res = await fetch(api, options);
      const data = await res.json();
      if (data.results) {
        return NextResponse.json({
          isError: false,
          message: "success",
          data: data,
        });
      } else {
        return NextResponse.json({
          isError: true,
          message: "failed",
          data: data,
        });
      }
    } catch (error) {
      throw new Error("Something happened! Please try again later!");
    }
  }

  return NextResponse.json({
    isError: true,
    message: "Something happened!",
    data: null,
  });
}

export async function getListId(session_id: string) {
  if (!session_id) session_id = "empty";
  const api = `https://api.themoviedb.org/3/account/account_id/lists?session_id=${session_id}`;
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      return { isError: false, message: "success", data: data.results[0].id };
    } else {
      return { isError: true, message: "failed", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function getListData(session_id: string) {
  const listId = await getListId(session_id);
  if (listId.isError) return listId;

  const api = `https://api.themoviedb.org/3/list/${listId.data}`;
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.items) {
      return { isError: false, message: "success", data: data };
    } else {
      return { isError: true, message: "failed", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function removeMovieFromList(
  session_id: string,
  movie_id: number
) {
  const listId = await getListId(session_id);
  if (listId.isError) return listId;

  const api = `https://api.themoviedb.org/3/list/${listId.data}/remove_item`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      media_id: movie_id,
    }),
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success) {
      return { isError: false, message: "success", data: data };
    } else {
      return { isError: true, message: "failed", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function addMovieToList(session_id: string, movie_id: number) {
  const listId = await getListId(session_id);
  if (listId.isError) return listId;

  const api = `https://api.themoviedb.org/3/list/${listId.data}/add_item`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      media_id: movie_id,
    }),
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success) {
      return { isError: false, message: "success", data: data };
    } else {
      return { isError: true, message: "failed", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function checkRatedMovie(session_id: string, movie_id: number) {
  if (!session_id) session_id = "empty";
  const api = `https://api.themoviedb.org/3/movie/${movie_id}/account_states?session_id=${session_id}`;
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
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

export async function rateMovie(
  session_id: string,
  movie_id: number,
  rate_value: number
) {
  const api = `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${session_id}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      value: rate_value,
    }),
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success) {
      return { isError: false, message: data.status_message, data: data };
    } else {
      return { isError: true, message: data.status_message, data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function deleteRating(session_id: string, movie_id: number) {
  if (!session_id) session_id = "empty";
  const api = `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${session_id}`;
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success === false) {
      return { isError: true, message: data.status_message, data: data };
    } else {
      return { isError: false, message: data.status_message, data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}

export async function getTrailerClip(movie_id: number) {
  const api = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
  const options: object = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(api, options);
    const data = await res.json();

    if (data.success === false) {
      return { isError: true, message: data.status_message, data: data };
    } else {
      if (data.results.length > 0) {
        data.results = data.results.filter((item: MovieVideo) => {
          return item.type == "Trailer";
        });
      }
      return { isError: false, message: "success", data: data };
    }
  } catch (error) {
    throw new Error("Something happened! Please try again later!");
  }
}
