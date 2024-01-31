import { useIsTop } from "@/hooks/useIsTop";
import { DisplayType } from "@/pages/Home";
import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
	displayType: string;
	setPage: (value: number) => void;
};

const NavBarComp = ({ displayType }: Props) => {
	const [isSearch, setIsSearch] = useState(false);
	const navigate = useNavigate();
	const isTop = useIsTop();
	const handleClick = (newDisplayType: DisplayType) => {
		setIsSearch(false);
		navigate(`/?displayType=${newDisplayType}&page=1`, { replace: true });
	};
	const handleSearch = () => {
		setIsSearch(true);
		navigate("/search");
	};

	return (
		<Navbar
			expand="md"
			className={`bg-body-tertiary`}
			fixed={isTop ? undefined : "top"}
		>
			<Container>
				<Navbar.Brand href="#home">Movie & TvShow database</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Button
							className="w-50 me-md-5 ms-md-5"
							variant={
								displayType === DisplayType.Movies && !isSearch
									? "primary"
									: "outline-primary"
							}
							onClick={() => handleClick(DisplayType.Movies)}
						>
							Movie
						</Button>
						<Button
							className="w-50 me-md-5"
							variant={
								displayType === DisplayType.TvShow && !isSearch
									? "primary"
									: "outline-primary"
							}
							onClick={() => handleClick(DisplayType.TvShow)}
						>
							TvShow
						</Button>
						<Button
							variant={isSearch ? "primary" : "outline-primary"}
							className="w-50 me-md-5"
							onClick={handleSearch}
						>
							Search
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarComp;
