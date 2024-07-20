import { Content } from "@/components/ui/Content";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extractParams } from "@/lib/extractParams";

const handleSubmit = async (formData: FormData) => {
	"use server";
	const URL = extractParams(formData);

	if (!URL) return;

	
};

const placeholder: string[] = ["A", "B", "C"];

function Saber11() {
	return (
		<Content className="flex flex-col gap-4">
			<form action={handleSubmit} className="flex gap-2 flex-wrap">
				<Select name="type">
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Tipo de Prueba" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="saber11">Saber 11</SelectItem>
						<SelectItem value="saber-pro">Saber Pro</SelectItem>
					</SelectContent>
				</Select>
				<Select name="departament">
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Departamento" />
					</SelectTrigger>
					<SelectContent>
						{placeholder.map((value) => (
							<SelectItem key={value} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select name="municipality">
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Municipio" />
					</SelectTrigger>
					<SelectContent>
						{placeholder.map((value) => (
							<SelectItem key={value} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select name="institution">
					<SelectTrigger className="w-52">
						<SelectValue placeholder="Institucion Educativa" />
					</SelectTrigger>
					<SelectContent>
						{placeholder.map((value) => (
							<SelectItem key={value} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Input
					className="max-w-56"
					placeholder="Numero de documento"
					name="document"
				/>

				<Select name="period">
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Periodo" />
					</SelectTrigger>
					<SelectContent>
						{placeholder.map((value) => (
							<SelectItem key={value} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select name="genre">
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Genero" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="M">Masculino</SelectItem>
						<SelectItem value="F">Femenino</SelectItem>
						<SelectItem value="all">Todos</SelectItem>
					</SelectContent>
				</Select>

				<div className="flex items-center gap-2 h-10 border border-gray-400/30 rounded  px-6">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="items-center flex space-x-2">
									<Checkbox name="internet" id="internet" />
									<div className="grid gap-1.5 leading-none">
										<label
											htmlFor="internet"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Internet
										</label>
									</div>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								¿El estudiante tiene internet?
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="items-center flex space-x-2">
									<Checkbox name="car" id="car" />
									<div className="grid gap-1.5 leading-none">
										<label
											htmlFor="car"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Automovil
										</label>
									</div>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								¿El estudiante tiene automovil?
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="items-center flex space-x-2">
									<Checkbox name="computer" id="computer" />
									<div className="grid gap-1.5 leading-none">
										<label
											htmlFor="computer"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Computador
										</label>
									</div>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								¿El estudiante tiene computador?
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="items-center flex space-x-2">
									<Checkbox name="laundry" id="laundry" />
									<div className="grid gap-1.5 leading-none">
										<label
											htmlFor="laundry"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Lavadora
										</label>
									</div>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								¿El estudiante tiene lavadora?
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="items-center flex space-x-2">
									<Checkbox
										id="default"
										name="default"
										defaultChecked={true}
									/>
									<div className="grid gap-1.5 leading-none">
										<label
											htmlFor="default"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Default
										</label>
									</div>
								</div>
							</TooltipTrigger>
							<TooltipContent>Default Params</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<Select name="stratum">
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Estrato" />
					</SelectTrigger>
					<SelectContent>
						{Array.from({ length: 7 }).map((_, index) => (
							<SelectItem key={index} value={index.toString()}>
								Estrato {index}
							</SelectItem>
						))}
						<SelectItem value="all">Todos</SelectItem>
					</SelectContent>
				</Select>

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
