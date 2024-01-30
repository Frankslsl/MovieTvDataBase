import { Link } from "react-router-dom";
import { DisplayType } from "@/pages/Home";
import { motion } from "framer-motion";
import { Card, Col, Container, Row } from "react-bootstrap";
import { dataSchema } from "@/pages/Home/querys";
import { z } from "zod";

type DisplayData = z.infer<typeof dataSchema>;

interface Props {
	data: DisplayData;
	displayType: DisplayType;
}

export function ColumnDisplay({ data, displayType }: Props) {
	return (
		<Container>
			<Row xs={1} md={2} lg={4} className="g-5">
				{data.map((item, index) => {
					return (
						<Col key={item.id}>
							<Link
								to={`/${displayType === DisplayType.Movies ? "movie" : "tv"}/${
									item.id
								}?displayType=${displayType}`}
							>
								<motion.div
									initial={{ opacity: 0, x: -25 }}
									whileInView={{ opacity: 1, x: 0 }}
									whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{ delay: 0.05 * index }}
								>
									<Card style={{ height: "750px" }}>
										<Card.Img
											variant="top"
											src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
											height={450}
										/>
										<Card.Body className="d-flex flex-column justify-content-between align-items-start">
											<Card.Title>
												{displayType === DisplayType.Movies
													? item.title
													: item.name}
											</Card.Title>
											<Card.Subtitle>{item.release_date}</Card.Subtitle>
											<Card.Text>
												{item.overview.slice(0, 250) + "..."}
											</Card.Text>
										</Card.Body>
									</Card>
								</motion.div>
							</Link>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}
