import axios, { AxiosInstance } from 'axios';
import { Movie, MovieList, Actors } from './types';
import genreList from './genres';

class MovieService {
  private axiosInstance: AxiosInstance;
  private static API_URL = 'https://api.themoviedb.org/3';
  private static API_KEY = 'de2ce901ec120769d784410335f67638';
  private IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
  private BACKDROP_SIZE = 'w1280';
  private POSTER_SIZE = 'w500';

  language = 'en-US';

  get defaultParams() {
    return {
      language: this.language,
      api_key: MovieService.API_KEY
    }
  }

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: MovieService.API_URL,
      params: {
        api_key: MovieService.API_KEY
      }
    });
  }

  public getMovies( page = 1): Promise<{ data: MovieList}> {
    return this.axiosInstance.get('/movie/popular', {
      params: {
        ...this.defaultParams,
        page,
      },
    });
  }

  public getMovie(id: string | number, language = 'en-US'): Promise<{ data: Movie}> {
    return this.axiosInstance.get(`/movie/${id}`, {
      params: {
        ...this.defaultParams,
      },
    });
  }

  public getActors(movieId: number | string): Promise<{ data: Actors }> {
    return this.axiosInstance.get(`/movie/${movieId}/credits`, {
      params: {
        ...this.defaultParams,
      },
    });
  }

  public getMoviesByPage(movieId: number | string): Promise<{ data: MovieList }> {
    return this.axiosInstance.get(`/movie/popular`, {
      params: {
        ...this.defaultParams,
      },
    });
  }

  public searchMovies(query: string): Promise<{ data: MovieList}> {
    return this.axiosInstance.get(`/search/movie`, {
      params: {
        ...this.defaultParams,
        query
      },
    });
  }

  public getMainImagePath(path: string): string {
    return `${this.IMAGE_BASE_URL}${this.BACKDROP_SIZE}${path}`;

  }

  public getMoviePoster(posterPath: string): string {
    return `${this.IMAGE_BASE_URL}${this.POSTER_SIZE}${posterPath}`;
  }

  public getGenreListAsString(genres: Array<number>): string {
    // @ts-ignore
    const result = genres.map(genre => genreList[genre]);

    return result.slice(0, 2).join(', ');
  }

}

const movieService = new MovieService();

export default {
  movieService,
};
