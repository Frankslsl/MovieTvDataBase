import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { z } from "zod";

const movieDataSchema = z.object({
	title: z.string(),
	poster_path: z.string(),
	adult: z.boolean(),
	budget: z.number(),
	genres: z.array(z.object({ name: z.string() })),
	id: z.number(),
	popularity: z.number(),
	production_companies: z.array(z.object({ name: z.string() })),
	release_date: z.string(),
	revenue: z.number(),
	runtime: z.number(),
	vote_average: z.number(),
	original_language: z.string(),
	overview: z.string(),
});

export const fetchMovieById = async (
	id: string,
	navigate: NavigateFunction
) => {
	const sessionId = localStorage.getItem("guest_session_id");
	if (sessionId === null) {
		navigate("/");
		return;
	}

	try {
		const res = await axios({
			method: "GET",
			url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		const resValidated = movieDataSchema.safeParse(res.data);
		if (resValidated.success) {
			console.log(resValidated.data);
			return resValidated.data;
		} else {
			console.error(resValidated.error);
			throw new Error();
		}
	} catch (error) {
		console.log(error);
	}
};
