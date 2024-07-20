"use server";

import { redirect } from "next/navigation";

export const handleRedirection = (formData: FormData) => {
	const url = formData.get("href")?.toString() || "/";
	redirect(url);
};

export default handleRedirection;
