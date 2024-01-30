import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { z } from "zod";
const tvShowSchema = z.object({
	name: z.string(),
	poster_path: z.string(),
	created_by: z.array(z.object({ name: z.string() })),
	networks: z.array(
		z.object({
			id: z.number(),
			logo_path: z.string(),
		})
	),
	number_of_seasons: z.number(),
	genres: z.array(
		z.object({
			name: z.string(),
		})
	),
	id: z.number(),
	popularity: z.number(),
	production_companies: z.array(
		z.object({
			name: z.string(),
		})
	),
	homepage: z.string(),
	vote_average: z.number(),
	original_language: z.string(),
	overview: z.string(),
});

export const fetchTvShow = async (id: string, navigate: NavigateFunction) => {
	const sessionId = localStorage.getItem("guest_session_id");
	if (sessionId === null) {
		navigate("/");
		return;
	}

	try {
		const res = await axios({
			method: "GET",
			url: `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		console.log(res.data);
		const resValidated = tvShowSchema.safeParse(res.data);
		if (resValidated.success) {
			return resValidated.data;
		} else {
			console.error(resValidated.error);
			return null;
		}
	} catch (error) {
		console.log(error);
	}
};
