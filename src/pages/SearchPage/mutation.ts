import axios from "axios";
import { z } from "zod";

export const searchDataSchema = z.object({
	page: z.number(),
	total_pages: z.number(),
	total_results: z.number(),
	results: z.array(
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
	),
});

export const searchFetchMovies = async ({
	page,
	keyword,
	adult,
}: {
	page: number;
	keyword: string;
	adult: boolean;
}) => {
	try {
		const res = await axios({
			method: "GET",
			url: `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`,
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		const resValidated = searchDataSchema.safeParse(res.data);
		if (resValidated.success) {
			console.log(resValidated.data);
			return resValidated.data;
		} else {
			console.error(resValidated.error);
			throw new Error("Data validation failed");
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const searchFetchTvShows = async ({
	page,
	keyword,
	adult,
}: {
	page: number;
	keyword: string;
	adult: boolean;
}) => {
	try {
		const res = await axios({
			method: "GET",
			url: `https://api.themoviedb.org/3/search/tv?query=${keyword}&include_adult=${adult}&language=en-US&page=${page}`,
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		const resValidated = searchDataSchema.safeParse(res.data);
		if (resValidated.success) {
			console.log(resValidated.data);
			return resValidated.data;
		} else {
			console.error(resValidated.error);
			throw new Error("Data validation failed");
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};
