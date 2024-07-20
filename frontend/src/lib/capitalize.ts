export const capitalize = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const capitalizeAll = (string: string) => {
	return string.split(" ").map(capitalize).join(" ");
};
