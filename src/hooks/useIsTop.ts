import { useState, useEffect } from "react";
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
