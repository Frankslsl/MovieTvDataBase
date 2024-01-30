import { ReactNode } from "react";
import { Container, Pagination } from "react-bootstrap";
import AnchorLink from "react-anchor-link-smooth-scroll";
type Props = {
	page: number;
	setPage: (value: number) => void;
	totalPage: number;
};

export const Footer = ({ page, setPage, totalPage }: Props) => {
	const items: ReactNode[] = [];
	for (let number = 1; number <= totalPage; number++) {
		items.push(
			<Pagination.Item
				as={AnchorLink}
				href="#top"
				key={number}
				active={number === page}
				onClick={() => setPage(number)}
			>
				{number}
			</Pagination.Item>
		);
	}
	return (
		<Container className="mt-auto d-flex justify-content-center">
			<Pagination size="sm" className="mx-auto d-flex flex-wrap">
				{items}
			</Pagination>
		</Container>
	);
};
