import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useSearchParams } from "react-router-dom";
import NavBarComp from "@/components/NavBarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieDetails } from "./pages/MovieDetails";
import { TvShowDetails } from "./pages/tvShowDetails";
import SearchPage from "./pages/SearchPage";
import { z } from "zod";
import { DisplayType } from "./pages/Home";
import "./App.css";

//only show 5 pages for home page
const pageType = z.enum(["1", "2", "3", "4", "5"]);
const displayTypeZ = z.nativeEnum(DisplayType);

function App() {
	const [searchParam, setSearchParam] = useSearchParams();
	let page = Number(searchParam.get("page")) || 1;
	const pageValidated = pageType.safeParse(page.toString());
	if (!pageValidated.success) {
		console.log(pageValidated.error);
		page = 1; // 使用默认值
		searchParam.set("page", page.toString());
		setSearchParam(searchParam, { replace: true });
	}

	let displayType =
		(searchParam.get("displayType") as DisplayType) || DisplayType.Movies;
	const displayTypeValidated = displayTypeZ.safeParse(displayType);
	if (!displayTypeValidated.success) {
		console.log(displayTypeValidated.error);
		displayType = DisplayType.Movies;
		searchParam.set("displayType", displayType);
		setSearchParam(searchParam, { replace: true });
	}
	//PAGE

	const setPage = (p: number): void => {
		setSearchParam(
			(prev) => {
				const newSearchParams = new URLSearchParams(prev);
				newSearchParams.set("page", p + "");
				return newSearchParams;
			},
			{ replace: true }
		);
	};

	return (
		<>
			<NavBarComp displayType={displayType} setPage={setPage} />
			{/* ROUTES */}
			<Routes>
				<Route
					path="/"
					element={
						<Home page={page} displayType={displayType} setPage={setPage} />
					}
				/>
				<Route path="/search" element={<SearchPage />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
				<Route path="/tv/:id" element={<TvShowDetails />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
}

export default App;
