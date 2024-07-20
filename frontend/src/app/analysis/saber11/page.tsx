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

interface State {
	type: string;
	department?: string;
	municipality?: string;
	institution?: string;
}

type Action =
	| { type: "SET_DEPARTMENT"; payload: string }
	| { type: "SET_MUNICIPALITY"; payload: string }
	| { type: "SET_INSTITUTION"; payload: string };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "SET_DEPARTMENT":
			return { ...state, department: action.payload };
		case "SET_MUNICIPALITY":
			return { ...state, municipality: action.payload };
		case "SET_INSTITUTION":
			return { ...state, institution: action.payload };
		default:
			return { ...state };
	}
}

const initialState: State = {
	type: "saber11",
	department: "",
	municipality: "",
	institution: "",
};

function Saber11() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Content className="flex flex-col gap-4">
			<form className="flex flex-wrap gap-2">
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
