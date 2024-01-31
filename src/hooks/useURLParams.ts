import { z } from "zod";
import { useSearchParams, useParams } from "react-router-dom";
import { DisplayType } from "@/pages/Home";
import { useEffect, useState } from "react";

// all the hooks are created for getting the params from url, and validate then set a default value if needed
// all hooks return a variable/function that can be used in component directly and safely

const pageType = z.number().min(1);
const displayTypeZ = z.nativeEnum(DisplayType);
const keywordType = z.string();
const adultType = z.boolean();
const idType = z.number();

export const usePageParams = (value: number) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const page = Number(searchParam.get("page")) || value;
	const [pageReturn, setPageReturn] = useState(page);
	useEffect(() => {
		const pageValidated = pageType.safeParse(page);
		console.log("working");
		if (!pageValidated.success) {
			console.log(pageValidated.error);
			searchParam.set("page", value + "");
			setSearchParam(searchParam, { replace: true });
		} else {
			setPageReturn(pageValidated.data);
		}
	}, [page, searchParam, setSearchParam]);

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
	return { setPage, page: pageReturn };
};

export const useDisplayTypeParams = (value: DisplayType) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const displayType = (searchParam.get("displayType") as DisplayType) || value;
	const [displayTypeReturn, setDisplayTypeReturn] = useState(displayType);
	useEffect(() => {
		const displayTypeValidated = displayTypeZ.safeParse(displayType);
		if (!displayTypeValidated.success) {
			console.log(displayTypeValidated.error);
			searchParam.set("displayType", DisplayType.Movies);
			setSearchParam(searchParam, { replace: true });
		} else {
			setDisplayTypeReturn(displayTypeValidated.data);
		}
	}, [displayType, searchParam, setSearchParam]);
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
	return { displayType: displayTypeReturn, setDisplayType };
};

export const useSearchKeywordParams = (value: string) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const keyword = searchParam.get("keyword") || value;
	const [keywordReturn, setKeywordReturn] = useState(keyword);
	useEffect(() => {
		const keywordValidated = keywordType.safeParse(keyword);
		if (!keywordValidated.success) {
			console.log(keywordValidated.error);
			searchParam.set("keyword", "");
			setSearchParam(searchParam, { replace: true });
		} else {
			setKeywordReturn(keywordValidated.data);
		}
	}, [keyword, searchParam, setSearchParam]);
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
	return { keyword: keywordReturn, setKeyword };
};

export const useSearchAdultParams = (value: boolean) => {
	const [searchParam, setSearchParam] = useSearchParams();
	const adult = searchParam.get("adult") === "true" || value;
	const [adultReturn, setAdultReturn] = useState(adult);
	useEffect(() => {
		const adultValidated = adultType.safeParse(adult);
		if (!adultValidated.success) {
			console.log(adultValidated.error);
			searchParam.set("adult", "");
			setSearchParam(searchParam, { replace: true });
		} else {
			setAdultReturn(adultValidated.data);
		}
	}, [adult, searchParam, setSearchParam]);
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
	return { adult: adultReturn, setAdult };
};

export const useDetailId = () => {
	const { id } = useParams<string>();
	const [idReturn, setIdReturn] = useState("");
	useEffect(() => {
		const idValidated = idType.safeParse(Number(id));
		if (idValidated.success) {
			setIdReturn(idValidated.data.toString());
		}
	}, [id]);
	return { id: idReturn };
};
