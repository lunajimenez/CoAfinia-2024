import { NextRequest, NextResponse } from "next/server";
import AdmZip from "adm-zip";

async function POST(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const acceptedExtensions = url.searchParams.getAll("ext");

		const zip = await request.blob();
		const buffer = await zip.arrayBuffer();
		const zipBuffer = Buffer.from(buffer);
		const zipFile = new AdmZip(zipBuffer);

		const zipEntries = zipFile.getEntries();
		const files = zipEntries
			.filter((entry) => {
				if (acceptedExtensions.length > 0) {
					const entryExtension = entry.entryName.split(".").pop();
					return acceptedExtensions.includes(entryExtension || "");
				}
				return true;
			})
			.map((entry) => ({
				fileName: entry.entryName,
				content: entry.getData().toString("base64"),
			}));

		return NextResponse.json({ files }, { status: 200 });
	} catch (error) {
		if (error instanceof Error)
			return NextResponse.json(
				{ message: error.message },
				{ status: 500 },
			);

		return NextResponse.json(
			{ message: "An unknown error ocurred" },
			{ status: 500 },
		);
	}
}

export { POST };
