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
	//use this state to tell if the search tag has been chosen, change the css accordingly
	const [isSearch, setIsSearch] = useState(false);
	const navigate = useNavigate();
	//use this hook to tell if the page is scrolled to the top, change the nav css style accordingly
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
			bg={isTop ? "light" : "dark"}
			data-bs-theme={isTop ? "light" : "dark"}
		>
			<Container>
				<Navbar.Brand href="/">Movie & TvShow database</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Button
							className="w-50 me-md-5 ms-md-5 mb-sm-3 mb-md-0"
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
							className="w-50 me-md-5 mb-sm-3 mb-md-0"
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
