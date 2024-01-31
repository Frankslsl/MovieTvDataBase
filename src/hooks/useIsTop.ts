import { useState, useEffect } from "react";

//customize hooks to check if the page is scrolled to the top

export function useIsTop(): boolean {
	const [isTop, setIsTop] = useState(true);
	useEffect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			setIsTop(y === 0);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return isTop;
}
