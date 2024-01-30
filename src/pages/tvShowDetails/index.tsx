import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchTvShow } from "./fetchTvShwoById";
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";

export const TvShowDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams<string>();

	if (!id) {
		return <div>Invalid Movie ID</div>;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { data, isLoading } = useQuery(["TvShowDetails"], () =>
		fetchTvShow(id, navigate)
	);

	if (isLoading) {
		return <h1>Data is Loading</h1>;
	}
	if (!data) {
		return <h1>Data is not available</h1>;
	}
	return (
		<Container style={{ marginTop: 20 }}>
			<div className="border p-3">
				<Row className="justify-content-center">
					<Col className="text-center fw-semibold fs-3">{data.name}</Col>
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
								<h6 className="m-0 fst-italic">Created By: </h6>
								<p className="m-0">
									{data.created_by
										.map((creator: { name: string }) => creator.name)
										.join(" , ")}
								</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								{data.networks.map(
									(network: { id: number; logo_path: string }) => (
										<Image
											key={network.id}
											style={{ marginRight: 10, height: "25px" }}
											thumbnail
											src={`http://image.tmdb.org/t/p/original/${network.logo_path}`}
										/>
									)
								)}
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Number of Season:</h6>
								<p className="m-0">{data.number_of_seasons}</p>
							</ListGroupItem>
							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Genre: :</h6>
								<p className="m-0">
									{data.genres
										.map((item: { name: string }) => item.name)
										.join(" , ")}
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
								<h6 className="m-0 fst-italic">Home Page:</h6>
								<a className="m-0" href={`${data.homepage}`} target="_blank">
									{data.homepage}
								</a>
							</ListGroupItem>

							<ListGroupItem className="border-0 py-0 mb-1">
								<h6 className="m-0 fst-italic">Vote Average: </h6>
								<p className="m-0">{data.vote_average} mins</p>
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
