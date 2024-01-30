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
import { useState, useEffect } from "react";
import { ColumnDisplay } from "@/components/Column-display";
import { Footer } from "@/components/Footer";

const formDataSchema = z.object({
	keyword: z.string().min(1, "keyword is required"),
	searchType: z.nativeEnum(DisplayType),
	adult: z.enum(["true", "false"]),
});

type TSformData = z.infer<typeof formDataSchema>;

function SearchPage() {
	//set page state
	const [page, setPage] = useState(1);
	//set display state
	const [displayType, setDisplayType] = useState(DisplayType.Movies);

	//set useForm
	const {
		handleSubmit,
		watch,
		register,
		formState: { errors },
	} = useForm<TSformData>({
		resolver: zodResolver(formDataSchema),
	});
	//get the form data item to be using in useEffect, when page has been change, onSubmit function should be called
	const formDataKeyword = watch("keyword");
	const formDataAdult = watch("adult");
	const formDataSearchType = watch("searchType");

	//set useMutate
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
		const formDataValidated = formDataSchema.safeParse(data);
		console.log(formDataValidated.success);
		if (formDataValidated.success) {
			const params = {
				keyword: formDataValidated.data.keyword,
				page,
				adult: formDataValidated.data.adult === "true",
			};
			if (formDataValidated.data.searchType === DisplayType.Movies) {
				setDisplayType(DisplayType.Movies);
				fetchMovie(params);
			}
			if (formDataValidated.data.searchType === DisplayType.TvShow) {
				setDisplayType(DisplayType.TvShow);
				fetchTvShow(params);
			}
		} else {
			console.error(formDataValidated.error);
		}
	};

	//recall the fetch function as soon as page has been changed by footer
	useEffect(() => {
		console.log("first");
		const submitForm = () => {
			const formData = {
				keyword: formDataKeyword,
				adult: formDataAdult,
				searchType: formDataSearchType,
			};
			onSubmit(formData);
		};

		if (page > 1) {
			submitForm();
		}
	}, [page]);
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
						{displayType === DisplayType.Movies && fetchMovieData ? (
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
						) : displayType === DisplayType.TvShow && fetchTvShowData ? (
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
