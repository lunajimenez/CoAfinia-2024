"use client";

import { Content } from "@/components/ui/Content";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { capitalize, capitalizeAll } from "@/lib/capitalize";
import data from "@/lib/data_saber11.json";
import { useReducer, useState, useCallback, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/constants";

interface State {
	type: string;
	department?: string;
	municipality?: string;
	institution?: string;
	subject?: string;
	period?: string;
}

type Action =
	| { type: "SET_DEPARTMENT"; payload: string }
	| { type: "SET_MUNICIPALITY"; payload: string }
	| { type: "SET_INSTITUTION"; payload: string }
	| { type: "SET_SUBJECT"; payload: string }
	| { type: "SET_PERIOD"; payload: string };

interface ResponseFile {
	fileName: string;
	content: string;
}

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_DEPARTMENT":
			return { ...state, department: action.payload };
		case "SET_MUNICIPALITY":
			return { ...state, municipality: action.payload };
		case "SET_INSTITUTION":
			return { ...state, institution: action.payload };
		case "SET_SUBJECT":
			return { ...state, subject: action.payload };
		case "SET_PERIOD":
			return { ...state, period: action.payload };
		default:
			return { ...state };
	}
}

const subjects: string[] = [
	"razonamiento cuantitativo",
	"lectura critica",
	"ingles",
	"comunicaciones escritas",
	"competencias ciudadanas",
	"global",
];

const variables: string[] = [
	"Estrato",
	"Horas Trabajo",
	"Tiene Automóvil",
	"Tiene Lavadora",
	"Tiene Computador",
	"Tiene Internet",
	"Nivel Estudio Padre",
	"Nivel Estudio Madre",
];

const periods: string[] = [
	"2018-3",
	"2018-4",
	"2019-5",
	"2019-6",
	"2020-3",
	"2021-2",
	"2022-2",
	"2022-5",
];

const initialState: State = {
	type: "saber11",
	department: "",
	municipality: "",
	institution: "",
	subject: "global",
};

function SaberPro() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [zip, setZip] = useState<Blob>(new Blob());
	const [files, setFiles] = useState<ResponseFile[] | undefined>();
	const [loading, setLoading] = useState<boolean>();

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			setFiles(undefined);

			const { elements } = event.currentTarget;
			const searchParams = new URLSearchParams();

			if (!state.period) return;

			variables
				.map((variable) => {
					const group = elements.namedItem(variable);

					if (!group) return null;

					if (!(group instanceof RadioNodeList)) return null;

					const node = Array.from(group)[1];

					if (!(node instanceof HTMLInputElement)) return null;

					return {
						label: variable.split(" ").join(""),
						value: node.checked,
					};
				})
				.filter(
					(value): value is { label: string; value: boolean } =>
						value !== null && value !== undefined,
				)
				.filter(({ value }) => value)
				.forEach(({ label, value }) =>
					searchParams.append(
						encodeURIComponent(label),
						encodeURIComponent(value),
					),
				);

			Object.entries(state).forEach(([key, value]) => {
				if (!value) return;

				searchParams.append(key, encodeURIComponent(value));
			});

			setLoading(true);
			
			fetch(`${API_URL}/saber_pro/zip_file?${searchParams.toString()}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (!response.ok) throw new Error(response.statusText);
					return response.blob();
				})
				.then((response) => setZip(response))
				.catch((error) => {
					console.log(error);
					setLoading(false);
				});
		},
		[state],
	);

	useEffect(() => {
		fetch("/api/utils/zip", {
			method: "POST",
			body: zip,
		})
			.then((response) => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then(({ files }: { files: ResponseFile[] }) => setFiles(files))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, [zip]);

	return (
		<Content className="flex flex-col gap-4">
			<form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
				<section className="flex items-center gap-2 flex-wrap flex-grow">
					<Select defaultValue="saber-pro">
						<SelectTrigger className="w-48 flex-grow">
							<SelectValue placeholder="Tipo de Prueba" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="saber-pro">Saber Pro</SelectItem>
						</SelectContent>
					</Select>

					<Select
						onValueChange={(value) =>
							dispatch({ type: "SET_DEPARTMENT", payload: value })
						}
					>
						<SelectTrigger className="w-48 flex-grow">
							<SelectValue placeholder="Departamento" />
						</SelectTrigger>
						<SelectContent>
							{Array.from(Object.keys(data)).map((department) => (
								<SelectItem key={department} value={department}>
									{capitalize(department)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						disabled={!state.department}
						onValueChange={(value) =>
							dispatch({
								type: "SET_MUNICIPALITY",
								payload: value,
							})
						}
					>
						<SelectTrigger className="w-48 flex-grow">
							<SelectValue placeholder="Municipio" />
						</SelectTrigger>
						<SelectContent>
							{state.department &&
								Array.from(
									// @ts-expect-error
									Object.keys(data[state.department]),
								).map((municipality) => (
									<SelectItem
										key={municipality}
										value={municipality}
									>
										{capitalize(municipality)}
									</SelectItem>
								))}
						</SelectContent>
					</Select>

					<Select
						disabled={!state.municipality}
						onValueChange={(value) =>
							dispatch({
								type: "SET_INSTITUTION",
								payload: value,
							})
						}
					>
						<SelectTrigger className="w-48 flex-grow">
							<SelectValue placeholder="Institucion" />
						</SelectTrigger>
						<SelectContent>
							{state.municipality &&
								// @ts-expect-error
								data[state.department][state.municipality].map(
									// @ts-expect-error
									(institution) => {
										const institutionName =
											Object.keys(institution)[0];
										return (
											<SelectItem
												value={institutionName}
												key={institutionName}
											>
												{capitalizeAll(institutionName)}
											</SelectItem>
										);
									},
								)}
						</SelectContent>
					</Select>

					<Select
						onValueChange={(value) =>
							dispatch({ type: "SET_PERIOD", payload: value })
						}
					>
						<SelectTrigger className="w-48 flex-grow">
							<SelectValue placeholder="Periodo" />
						</SelectTrigger>
						<SelectContent>
							{periods.map((period) => (
								<SelectItem
									key={period}
									value={period.split("-").join("")}
								>
									{period.toString()}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</section>

				<section>
					<ToggleGroup
						type="single"
						variant="outline"
						onValueChange={(value) =>
							dispatch({
								type: "SET_SUBJECT",
								payload: value,
							})
						}
						className="flex-wrap"
					>
						{subjects.map((subject) => (
							<ToggleGroupItem
								key={subject}
								value={subject}
								className={cn({
									"opacity-25": state.subject !== subject,
								})}
							>
								{capitalize(subject)}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</section>

				<section className="flex items-center border px-4 py-6 rounded flex-wrap gap-6">
					{variables.map((variable) => (
						<div
							className="items-center flex space-x-2"
							key={variable}
						>
							<Checkbox id={variable} name={variable} />
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor={variable}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{variable}
								</label>
							</div>
						</div>
					))}
				</section>

				<Button className="flex-grow">Submit</Button>
			</form>
			{!files && (
				<div className="border-2 border-dashed border-gray-500 flex items-center justify-center animate-pulse w-full h-screen">
					{!loading && (
						<p className="text-gray-500">
							Aquí se mostrarán los gráficos una vez seleccionadas
							las variables.
						</p>
					)}

					{loading && (
						<Triangle
							visible={true}
							height="80"
							width="80"
							color="#7F727A"
							ariaLabel="triangle-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
					)}
				</div>
			)}

			{files && (
				<div className="flex items-center justify-center w-full h-screen">
					<Carousel className="w-full h-full">
						<CarouselContent>
							{files.map((file) => (
								<CarouselItem
									key={file.fileName}
									className="w-[300px] aspect-video"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										alt={file.fileName}
										src={`data:image/*;base64,${file.content}`}
										className="h-full w-full rounded-md"
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			)}
		</Content>
	);
}

export default SaberPro;
