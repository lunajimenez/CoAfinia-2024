import { Content } from "@/components/ui/Content";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function Home() {
	return (
		<Content className="grid grid-cols-2 gap-6">
			<div className="h-full relative">
				<Suspense
					fallback={
						<div className="h-full w-full bg-gray-300 animate-pulse rounded-md"></div>
					}
				>
					<Image
						src="/map.jpg"
						alt="Colombian Map"
						fill
						className="rounded-md"
					/>
				</Suspense>
			</div>
			<div className="h-full flex gap-2 flex-col">
				<h1 className="text-3xl font-bold">Analisis Pruebas ICFES</h1>
				<span className="text-xs">Colombia</span>
				<p className="text-sm">
					Aqui podras visualizar un análisis detallado de las pruebas
					Saber 11 y Saber Pro en Colombia. Proporciona una interfaz
					interactiva que permite a los usuarios explorar los
					resultados de estas evaluaciones educativas a nivel
					nacional. En el mapa de Colombia, se puede observar una
					representación visual de las distintas regiones del país,
					facilitando la comparación y el estudio de los datos de
					rendimiento académico en diferentes áreas geográficas. La
					página está estructurada para ofrecer información clara y
					accesible, ayudando a entender mejor los logros y desafíos
					educativos en diversas partes del país.
				</p>
				<div className="flex gap-4 flex-col">
					<Button>
						<Link
							href="/analysis/saber11"
							className="w-full h-full"
						>
							Conoce los resultados de las pruebas Saber 11 aqui
						</Link>
					</Button>
					<Button>
						<Link
							href="/analysis/saber-pro"
							className="w-full h-full"
						>
							Conoce los resultados de las pruebas Saber Pro aqui
						</Link>
					</Button>
				</div>
			</div>
		</Content>
	);
}

export default Home;
