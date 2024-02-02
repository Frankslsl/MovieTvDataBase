import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchTvShow } from "./fetchTvShwoById";
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
import { motion } from "framer-motion";

export const TvShowDetails = () => {
	//use navigate to navigate to home page if session_id is expired
	const navigate = useNavigate();
	const { id } = useDetailId();

	const { data, isLoading } = useQuery(
		["TvShowDetails", id],
		() => fetchTvShow(id, navigate),
		{ enabled: id !== "" }
	);
	if (!id) {
		return (
			<Container style={{ marginTop: 20 }}>
				<Alert variant="danger">Invalid TV show ID</Alert>
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
					<Col className="text-center fw-semibold fs-3">{data.name}</Col>
				</Row>
				<hr></hr>
				<Row className="justify-content-around align-items-center">
					<Col xs={12} md={6} className="text-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5 }}
							className="mb-sm-3 mb-md-0"
						>
							<Image
								style={{ maxHeight: "700px" }}
								className="img-fluid"
								src={`http://image.tmdb.org/t/p/original/${data.poster_path}`}
							/>
						</motion.div>
					</Col>
					<Col xs={12} md={6}>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.5 }}
						>
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
									<p className="m-0">{data.vote_average}</p>
								</ListGroupItem>
								<ListGroupItem className="border-0 py-0 mb-1">
									<h6 className="m-0 fst-italic">Language: </h6>
									<p className="m-0">{data.original_language}</p>
								</ListGroupItem>
								<ListGroupItem className="border-0 py-0 mb-1">
									<h6 className="m-0 fst-italic">Overview: </h6>
									<p className="m-0">{data.overview}</p>
								</ListGroupItem>
							</ListGroup>
						</motion.div>
					</Col>
				</Row>
			</div>
		</Container>
	);
};
