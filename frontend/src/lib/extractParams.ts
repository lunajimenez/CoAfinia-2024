import { checkboxToBool } from "@/lib/checkboxToBool";

export const extractParams = (formData: FormData): string | undefined => {
	const type = formData.get("type")?.toString();

	if (!type) return;

	const department = formData.get("departament")?.toString();
	const municipality = formData.get("municipality")?.toString();
	const institution = formData.get("institution")?.toString();
	const period = formData.get("period")?.toString();
	const genre = formData.get("genre")?.toString();
	const document = formData.get("document")?.toString();

	const internet = checkboxToBool(
		formData.get("internet")?.toString().toUpperCase() as string,
	);
	const car = checkboxToBool(
		formData.get("car")?.toString().toUpperCase() as string,
	);
	const computer = checkboxToBool(
		formData.get("computer")?.toString().toUpperCase() as string,
	);
	const laundry = checkboxToBool(
		formData.get("laundry")?.toString().toUpperCase() as string,
	);
	const defaultParams = checkboxToBool(
		formData.get("default")?.toString().toUpperCase() as string,
	);

	const stratum = formData.get("stratum")?.toString();

	const params: { [key: string]: string | boolean | undefined } = {
		type,
		department,
		municipality,
		institution,
		document,
		period,
		genre,
		internet,
		car,
		computer,
		laundry,
		defaultParams,
		stratum,
	};

	const searchParams = new URLSearchParams();

	Object.keys(params).forEach((key) => {
		if (!params[key]) return;

		searchParams.append(key, encodeURIComponent(params[key].toString()));
	});

	const baseURL = "http://example.com";
	const fullURL = `${baseURL}?${searchParams.toString()}`;
	return fullURL;
};

export default extractParams;
