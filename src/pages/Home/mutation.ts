import axios from "axios";

export const mutationLogin = async () => {
	try {
		const res = await axios({
			method: "get",
			url: "https://api.themoviedb.org/3/authentication/guest_session/new",
			headers: {
				accept: "application/json",
				Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
			},
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
