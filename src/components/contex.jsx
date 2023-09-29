import { createContext } from "react";

export const Context = createContext({
  movie: {},
  setMovie: (movie) => {},
});
