import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { DisplayType } from "@/pages/Home";
import { useEffect } from "react";

const pageType = z.number().min(1);
const displayTypeZ = z.nativeEnum(DisplayType);
const keywordType = z.string();
const adultType = z.boolean();

export const usePageParams = (value: number) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const page = Number(searchParam.get("page")) || value;
	const pageValidated = pageType.safeParse(page);
	useEffect(() => {
		if (!pageValidated.success) {
			console.log(pageValidated.error);
			searchParam.set("page", 1 + "");
			setSearchParam(searchParam, { replace: true });
		}
	}, [page]);

	const setPage = (p: number): void => {
		setSearchParam(
			(prev) => {
				const newSearchParams = new URLSearchParams(prev);
				newSearchParams.set("page", p + "");
				return newSearchParams;
			},
			{ replace: true }
		);
	};
	return { setPage, page };
};

export const useDisplayTypeParams = (value: DisplayType) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const displayType = (searchParam.get("displayType") as DisplayType) || value;
	const displayTypeValidated = displayTypeZ.safeParse(displayType);
	useEffect(() => {
		if (!displayTypeValidated.success) {
			console.log(displayTypeValidated.error);
			searchParam.set("displayType", DisplayType.Movies);
			setSearchParam(searchParam, { replace: true });
		}
	}, [displayType]);
	const setDisplayType = (p: DisplayType): void => {
		setSearchParam(
			(prev) => {
				const newSearchParams = new URLSearchParams(prev);
				newSearchParams.set("displayType", p);
				return newSearchParams;
			},
			{ replace: true }
		);
	};
	return { displayType, setDisplayType };
};

export const useSearchKeywordParams = (value: string) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const keyword = searchParam.get("keyword") || value;
	const keywordValidated = keywordType.safeParse(keyword);
	useEffect(() => {
		if (!keywordValidated.success) {
			console.log(keywordValidated.error);
			searchParam.set("keyword", "");
			setSearchParam(searchParam, { replace: true });
		}
	}, [keyword]);
	const setKeyword = (p: string): void => {
		setSearchParam(
			(prev) => {
				const newSearchParams = new URLSearchParams(prev);
				newSearchParams.set("keyword", p);
				return newSearchParams;
			},
			{ replace: true }
		);
	};
	return { keyword, setKeyword };
};

export const useSearchAdultParams = (value: boolean) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const adult = searchParam.get("adult") === "true" || value;
	const adultValidated = adultType.safeParse(adult);
	useEffect(() => {
		if (!adultValidated.success) {
			console.log(adultValidated.error);
			searchParam.set("adult", "");
			setSearchParam(searchParam, { replace: true });
		}
	}, [adult]);
	const setAdult = (p: boolean): void => {
		setSearchParam(
			(prev) => {
				const newSearchParams = new URLSearchParams(prev);
				newSearchParams.set("keyword", p.toString());
				return newSearchParams;
			},
			{ replace: true }
		);
	};
	return { adult, setAdult };
};
