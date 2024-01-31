import { Button, Container, Form, FormGroup, FormLabel } from "react-bootstrap";
import { DisplayType } from "../Home";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	searchDataSchema,
	searchFetchMovies,
	searchFetchTvShows,
} from "./mutation";
import { useMutation } from "react-query";
import { useEffect } from "react";
import { ColumnDisplay } from "@/components/Column-display";
import { Footer } from "@/components/Footer";
import {
	useDisplayTypeParams,
	usePageParams,
	useSearchAdultParams,
	useSearchKeywordParams,
} from "@/hooks/useURLParams";
import { useNavigate } from "react-router-dom";

export const formDataSchema = z.object({
	keyword: z.string().min(1, "keyword is required"),
	searchType: z.nativeEnum(DisplayType),
	adult: z.string(),
});

type TSformData = z.infer<typeof formDataSchema>;

function SearchPage() {
	const navigate = useNavigate();
	//set page state
	const { setPage, page } = usePageParams(1);
	//set display state
	const { displayType: searchType } = useDisplayTypeParams(DisplayType.Movies);

	const { adult } = useSearchAdultParams(true);
	const { keyword } = useSearchKeywordParams("");

	//set useForm
	const {
		handleSubmit,
		// watch,
		register,
		formState: { errors },
	} = useForm<TSformData>({
		resolver: zodResolver(formDataSchema),
	});
	const {
		mutate: fetchMovie,
		isLoading: fetchMovieIsLoading,
		data: fetchMovieData,
	} = useMutation(searchFetchMovies, {
		onSuccess: (data: z.infer<typeof searchDataSchema>) => {
			console.log(data);
		},
	});

	const {
		mutate: fetchTvShow,
		isLoading: fetchTvShowIsLoading,
		data: fetchTvShowData,
	} = useMutation(searchFetchTvShows, {
		onSuccess: (data: z.infer<typeof searchDataSchema>) => {
			console.log(data);
		},
	});

	//onsubmit
	const onSubmit = (data: TSformData) => {
		navigate(
			`/search?page=${page}&keyword=${data.keyword}&adult=${data.adult}&displayType=${data.searchType}`,
			{ replace: true }
		);
	};

	//recall the fetch function as soon as page has been changed by footer
	useEffect(() => {
		console.log("first");
		const submitForm = () => {
			const formData = {
				keyword,
				adult: adult.toString(),
				searchType,
				page,
			};

			if (keyword !== "") {
				const formDataValidated = formDataSchema.safeParse(formData);
				console.log("sec");
				if (formDataValidated.success) {
					if (formDataValidated.data.searchType === DisplayType.Movies) {
						fetchMovie(formData);
					}
					if (formDataValidated.data.searchType === DisplayType.TvShow) {
						fetchTvShow(formData);
					}
				} else {
					console.error(formDataValidated.error);
				}
			}
		};
		submitForm();
	}, [page, keyword, adult, searchType]);
	return (
		<Container className="mt-3">
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup>
					<FormLabel className="fw-semibold fs-5 mb-2">Keyword</FormLabel>
					<Form.Control
						type="text"
						placeholder="Search...."
						size="lg"
						{...register("keyword")}
					/>
					{errors.keyword && (
						<p className="mt-1 text-danger">{errors.keyword.message}</p>
					)}
				</FormGroup>
				<FormGroup className="mt-4">
					<FormLabel className="fw-semibold fs-5 mb-2">Search type</FormLabel>
					<Form.Select {...register("searchType")}>
						<option value={DisplayType.Movies}>Search Movies</option>
						<option value={DisplayType.TvShow}>Search Tv Shows</option>
					</Form.Select>
				</FormGroup>
				<FormGroup className="mt-4">
					<FormLabel className="fw-semibold fs-5 mb-2">Include Adult</FormLabel>
					<Form.Select {...register("adult")}>
						<option value={"true"}>Yes</option>
						<option value={"false"}>No</option>
					</Form.Select>
				</FormGroup>
				<Button className="mt-3" type="submit">
					Search
				</Button>
			</Form>
			<div className="mt-5" id="top">
				{fetchMovieIsLoading || fetchTvShowIsLoading ? (
					<p>data is loading</p>
				) : (
					<div>
						{searchType === DisplayType.Movies && fetchMovieData ? (
							<>
								<Container className="mb-5">
									<h5 className="">
										{fetchMovieData.total_results} have been found, this is the
										page {page}/{fetchMovieData?.total_pages}
									</h5>
								</Container>
								<ColumnDisplay
									data={fetchMovieData?.results}
									displayType={DisplayType.Movies}
								/>
								<Footer
									page={page}
									totalPage={fetchMovieData.total_pages}
									setPage={setPage}
								/>
							</>
						) : searchType === DisplayType.TvShow && fetchTvShowData ? (
							<>
								<Container>
									<h4>
										{fetchTvShowData.total_results} items have been found, this
										is the page {page}/{fetchTvShowData.total_pages}
									</h4>
								</Container>
								<ColumnDisplay
									data={fetchTvShowData?.results}
									displayType={DisplayType.TvShow}
								/>
								<Footer
									page={page}
									totalPage={fetchTvShowData.total_pages}
									setPage={setPage}
								/>
							</>
						) : (
							<p>no data available</p>
						)}
					</div>
				)}
			</div>
		</Container>
	);
}

export default SearchPage;
