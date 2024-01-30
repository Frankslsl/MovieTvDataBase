import axios from "axios";
import { z } from "zod";
//for getting popular movies or tvshows from api, and show on home page
export const dataSchema = z.array(
	z.object({
		id: z.number(),
		overview: z.string(),
		poster_path: z.string().nullable(),
		title: z.string().optional(),
		name: z.string().optional(),
		vote_average: z.number(),
		release_date: z.string().optional(),
		first_air_date: z.string().optional(),
	})
);

export const fetchMovies = async (page: number) => {
	try {
		const res = await axios({
			method: "GET",
			url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		const resValidated = dataSchema.safeParse(res.data.results);
		if (resValidated.success) {
			return resValidated.data;
		} else {
			console.error(resValidated.error);
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};

export const fetchTvShows = async (page: number) => {
	try {
		const res = await axios({
			method: "GET",
			url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		const resValidated = dataSchema.safeParse(res.data.results);
		if (resValidated.success) {
			return resValidated.data;
		} else {
			console.error(resValidated.error);
			return null;
		}
	} catch (error) {
		console.error(error);
	}
};
