import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchMovieById } from "./fetchMovieById";
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	ListGroupItem,
	Alert,
} from "react-bootstrap";
import { useDetailId } from "@/hooks/useURLParams";

export const MovieDetails = () => {
	//use navigate to navigate to home page if session_id is expired
	const navigate = useNavigate();

	const { id } = useDetailId();
	console.log(id);
	const { data, isLoading } = useQuery(
		["movieDetail", id],
		() => fetchMovieById(id, navigate),
		{ enabled: id !== "" }
	);

	if (!id) {
		return (
			<Container style={{ marginTop: 20 }}>
				<Alert variant="danger">Invalid Movie ID</Alert>
			</Container>
		);
	}

	if (isLoading) {
		return <Alert variant="info">Loading</Alert>;
	}
	if (!data) {
		return (
			<Container>
				<Alert variant="danger">Movie data is not available.</Alert>
			</Container>
		);
	}
	return (
		<Container style={{ marginTop: 20 }}>
			<div className="border p-3">
				<Row className="justify-content-center">
					<Col className="text-center fw-semibold fs-3">{data.title}</Col>
				</Row>
				<hr></hr>
				<Row className="justify-content-around align-items-center">
					<Col xs={12} md={6} className="text-center">
						<Image
							style={{ maxHeight: "700px" }}
							className="img-fluid"
							src={`http://image.tmdb.org/t/p/original/${data.poster_path}`}
						/>
					</Col>
					<Col xs={12} md={6}>
						<ListGroup className="border-start">
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Is The Movie For Adults:</h6>
								<p className="m-0">{data.adult ? "YES" : "NO"}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Budget:</h6>
								<p className="m-0">$ {data.budget}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Genrre:</h6>
								<p className="m-0">
									{data.genres
										.map((item: { name: string }) => item.name)
										.join("  ")}
								</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">IMDB ID:</h6>
								<p className="m-0">{data.id}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Popularity:</h6>
								<p className="m-0">{data.popularity}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Production Company:</h6>
								<p className="m-0">
									{data.production_companies
										.map((item) => item.name)
										.join(" , ")}
								</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Release Date:</h6>
								<p className="m-0">{data.release_date}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Revenue:</h6>
								<p className="m-0">$ {data.revenue}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Runtime: </h6>
								<p className="m-0">{data.runtime} mins</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Vote Average: </h6>
								<p className="m-0">{data.vote_average}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Language: </h6>
								<p className="m-0">{data.original_language}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Overview: </h6>
								<p className="m-0">{data.overview} mins</p>
							</ListGroupItem>
						</ListGroup>
					</Col>
				</Row>
			</div>
		</Container>
	);
};
