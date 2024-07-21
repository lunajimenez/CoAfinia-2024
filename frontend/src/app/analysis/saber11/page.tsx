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
import { capitalize, capitalizeAll } from "@/lib/capitalize";
import data from "@/lib/data_saber11.json";
import { useReducer } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { EmptyToUnknown } from "@prisma/client/runtime/library";

interface State {
	type: string;
	department?: string;
	municipality?: string;
	institution?: string;
	subject?: string;
}

type Action =
	| { type: "SET_DEPARTMENT"; payload: string }
	| { type: "SET_MUNICIPALITY"; payload: string }
	| { type: "SET_INSTITUTION"; payload: string }
	| { type: "SET_SUBJECT"; payload: string };

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
		default:
			return { ...state };
	}
}

const subjects: string[] = [
	"ingles",
	"sociales",
	"matematicas",
	"ciencias naturales",
	"lectura critica",
	"global",
];

const variables: string[] = [
	"Estrato",
	"Privado Libertad",
	"Horas Trabajo",
	"Tiene Automóvil",
	"Tiene Lavadora",
	"Tiene Computador",
	"Tiene Internet",
	"Nivel Estudio Padre",
	"Nivel Estudio Madre",
];

const initialState: State = {
	type: "saber11",
	department: "",
	municipality: "",
	institution: "",
	subject: "global",
};

const handleSubmit = ({
	event,
	state,
}: {
	event: React.FormEvent<HTMLFormElement>;
	state: State;
}) => {
	event.preventDefault();

	const { elements } = event.currentTarget;
	const searchParams = new URLSearchParams();

	variables
		.map((variable) => {
			const group = elements.namedItem(variable);

			if (!group) return null;

			if (!(group instanceof RadioNodeList)) return null;

			const node = Array.from(group)[1];

			if (!(node instanceof HTMLInputElement)) return null;

			return { label: variable.split(" ").join(""), value: node.checked };
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

	searchParams.toString()
};

function Saber11() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Content className="flex flex-col gap-4">
			<form
				className="flex flex-wrap gap-2"
				onSubmit={(event) => handleSubmit({ event, state })}
			>
				<section className="flex items-center gap-2 flex-wrap flex-grow">
					<Select defaultValue="saber11">
						<SelectTrigger className="w-48 flex-grow">
							<SelectValue placeholder="Tipo de Prueba" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="saber11">Saber 11</SelectItem>
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

				<Button>Submit</Button>
			</form>
			<div className="border-2 border-dashed border-gray-500 flex items-center justify-center animate-pulse w-full h-screen">
				<p className="text-gray-500">
					Aquí se mostrarán los gráficos una vez seleccionadas las
					variables.
				</p>
			</div>
		</Content>
	);
}

export default Saber11;
