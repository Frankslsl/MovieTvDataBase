import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { mutationLogin } from "./mutation";
import { Footer } from "@/components/Footer";
import { fetchMovies, fetchTvShows } from "./querys";
import { ColumnDisplay } from "@/components/Column-display";
import { Alert, Container } from "react-bootstrap";

export enum DisplayType {
	Movies = "movies",
	TvShow = "tvShows",
	Search = "search",
}
type Props = {
	page: number;
	displayType: DisplayType;
	setPage: (value: number) => void;
};

const Home = ({ page, displayType, setPage }: Props) => {
	//set the maximum page for home page is 5, if not, the page will be set to 1
	useEffect(() => {
		if (page > 5) {
			setPage(1);
		}
	}, [page, setPage]);
	//this mutation is for auth
	const { mutate: authMutate } = useMutation({
		mutationKey: "auth",
		mutationFn: mutationLogin,
		onSuccess: (data) => {
			console.log(data);
			localStorage.setItem("guest_session_id", data.guest_session_id);
		},
	});
	//make sure call the auth function every time the component has been rerender
	useEffect(() => {
		if (localStorage.getItem("guest_session_id") === null) {
			authMutate();
		}
	}, [authMutate]);

	//GET DATA, refetch depend on page
	const { isLoading: moviesIsLoading, data: moviesData } = useQuery(
		["movies", page],
		() => fetchMovies(page)
	);
	const { isLoading: tvShowsIsLoading, data: tvShowsData } = useQuery(
		["tvShows", page],
		() => fetchTvShows(page)
	);

	// if cant get any data from api
	if (
		(displayType === DisplayType.Movies && !moviesData) ||
		(!tvShowsData && displayType === DisplayType.TvShow)
	) {
		return (
			<Container>
				<Alert variant="danger">Data is not available</Alert>
			</Container>
		);
	}

	return (
		<>
			<div id="top">
				{moviesIsLoading || tvShowsIsLoading ? (
					<p>data is loading</p>
				) : (
					<div className="mt-5">
						{displayType === DisplayType.Movies ? (
							<ColumnDisplay data={moviesData!} displayType={displayType} />
						) : (
							<ColumnDisplay data={tvShowsData!} displayType={displayType} />
						)}
					</div>
				)}
			</div>
			<div className="mt-3">
				<Footer page={page} setPage={setPage} totalPage={5} />
			</div>
		</>
	);
};

export default Home;
