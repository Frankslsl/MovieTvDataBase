import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NavBarComp from "@/components/NavBarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieDetails } from "./pages/MovieDetails";
import { TvShowDetails } from "./pages/tvShowDetails";
import SearchPage from "./pages/SearchPage";
import { DisplayType } from "./pages/Home";
import "./App.css";
import { useDisplayTypeParams, usePageParams } from "./hooks/useURLParams";

function App() {
	const { setPage, page } = usePageParams(1);

	const { displayType } = useDisplayTypeParams(DisplayType.Movies);

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
