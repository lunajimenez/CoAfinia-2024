import os
import zipfile
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


df = pd.read_csv('data/Resultados_Saber_Pro_nonull.csv')

def to_zip(zip_path: str, folder_to_zip: str = '') -> None:
	""" Función para convertir las imagenes de extensión '.png' de cierta carpeta
	 a un archivo '.zip'. El archivo zip resultante será almacenado en con la 
	 dirección de `zip_path` """
	with zipfile.ZipFile(zip_path, 'w') as zipf:
		for file in os.listdir(folder_to_zip):
			if os.path.splitext(file)[1] != '.png':
				continue
			zipf.write(os.path.join(folder_to_zip, file), os.path.basename(file))


def plot_circular_diagram(sub_df: pd.DataFrame, y_label: str, path: str,
						  title: str = '', figsize: tuple = (12, 12),
						  autopct: str = '%1.1f%%', startangle: int = 130,
						  pctdistance: float = 0.8) -> None:
	""" Graficar los diagramas circulares. Se utiliza mayormente para las variables
	 socioeconomicas """
	counts = sub_df[y_label].value_counts()
	fig, ax = plt.subplots(figsize=figsize)
	ax.pie(counts, labels=counts.index, autopct=autopct, startangle=startangle, pctdistance=pctdistance)
	ax.set_title(title)
	plt.savefig(path, transparent=True)


def plot_histogram(sub_df: pd.DataFrame, x: str, path: str, title: str = '', x_label: str = '',
					y_label: str = '', figsize: tuple = (12, 12), hue: str | None = None) -> None:
	""" Graficar un histograma. Se utiliza solo para comparar las puntuaciones de determinada competencia """
	fig, ax = plt.subplots(figsize=figsize)
	ax.set(title=title, xlabel=x_label, ylabel=y_label)
	sns.histplot(sub_df, x=x, stat='count', kde=True, hue=hue, ax=ax)
	plt.savefig(path, transparent=True)
	
	
def plot_socioeconomic_variables(sub_df: pd.DataFrame) -> None:
	""" Graficar con diagramas circulares las variables socioeconomicas y guardar los archvios """
	plot_circular_diagram(sub_df, 'FAMI_ESTRATOVIVIENDA', 'static/imgs/saber_pro/estrato.png', title='ESTRATO VIVIENDA')
	plot_circular_diagram(sub_df, 'ESTU_HORASSEMANATRABAJA', 'static/imgs/saber_pro/horas_semana.png', title='HORAS TRABAJADAS POR SEMANA')
	plot_circular_diagram(sub_df, 'ESTU_GENERO', 'static/imgs/saber_pro/genero.png', title='GENERO ESTUDIANTE')
	plot_circular_diagram(sub_df, 'FAMI_TIENEAUTOMOVIL', 'static/imgs/saber_pro/automovil.png', title='TIENE AUTOMOVIL')
	plot_circular_diagram(sub_df, 'FAMI_TIENELAVADORA', 'static/imgs/saber_pro/lavadora.png', title='TIENE LAVADORA')
	plot_circular_diagram(sub_df, 'FAMI_TIENECOMPUTADOR', 'static/imgs/saber_pro/computador.png', title='TIENE COMPUTADORA')
	plot_circular_diagram(sub_df, 'FAMI_TIENEINTERNET', 'static/imgs/saber_pro/internet.png', title='TIENE INTERNET')
	plot_circular_diagram(sub_df, 'FAMI_EDUCACIONMADRE', 'static/imgs/saber_pro/educacion_madre.png', title='NIVEL EDUCATIVO MADRE')
	plot_circular_diagram(sub_df, 'FAMI_EDUCACIONPADRE', 'static/imgs/saber_pro/educacion_padre.png', title='NIVEL EDUCATIVO PADRE')


def plot_puntuations_variables(sub_df: pd.DataFrame, hue: str | None = None) -> None:
	""" Graficar los histogramas con las puntuaciones de cada una de las competencias """
	plot_histogram(sub_df, x='MOD_RAZONA_CUANTITAT_PUNT', path='static/imgs/saber_pro/puntaje_razo_cuanti.png',
				    x_label='PUNTAJE', y_label='CANTIDAD', title='RAZONAMIENTO CUANTITATIVO', hue=hue)
	plot_histogram(sub_df, x='MOD_COMUNI_ESCRITA_PUNT', path='static/imgs/saber_pro/puntaje_comuni_escrita.png',
				    x_label='PUNTAJE', y_label='CANTIDAD', title='COMUNICACION ESCRITA', hue=hue)
	plot_histogram(sub_df, x='MOD_INGLES_PUNT', path='static/imgs/saber_pro/puntaje_ingles.png',
				    x_label='PUNTAJE', y_label='CANTIDAD', title='INGLES', hue=hue)
	plot_histogram(sub_df, x='MOD_LECTURA_CRITICA_PUNT', path='static/imgs/saber_pro/puntaje_lectu_critica.png',
				    x_label='PUNTAJE', y_label='CANTIDAD', title='LECTURA CRITICA', hue=hue)
	plot_histogram(sub_df, x='MOD_COMPETEN_CIUDADA_PUNT', path='static/imgs/saber_pro/puntaje_compe_ciudadanas.png',
				    x_label='PUNTAJE', y_label='CANTIDAD', title='COMPETENCIAS CIUDADANAS', hue=hue)


def plot_graphs_saber_pro(**kwargs) -> None:
	"""
	Graficar todas las variables socioeconomicas y las puntuaciones con ayuda de las funciones
	anteriormente creadas. Si a la función no se le especifican departamento, entonces lo que se quiere comparar
	son los resultados de todo el país; si una función no tiene municipios seleccionado, entonces lo que se
	quiere comparar son los departamentos; si una función no tiene instituciones seleccionadas, entonces lo que
	se quiere comparar las universidad en dichos municipios; si están todos las opciones especificadas, entonces
	lo que se quiere es comparar instituciones que se encuentran dentro del municipio y, por tanto, el mismo
	departamento

	
	Quizás aparezcan más parametros como 'department', 'municipality' o 'institution' con unos números al final
	dentro `kwargs`, pero estos representarían que se quiere comparar más de una de los campos que se están
	especificando.

	Esquema representativo de cómo podría estár representado el kwargs
	kwargs = {
		'period': int
		'department': str | None,
		'municipality': str | None,
		'institution': str | None,
		...
	}
	"""
	label_dept, label_municipality, label_institution = 'ESTU_INST_DEPARTAMENTO', 'ESTU_INST_MUNICIPIO', 'INST_NOMBRE_INSTITUCION'
	kwargs = dict(kwargs)
	keys = kwargs.keys()
	print(kwargs)

	period = kwargs['period']
	sub_df = df[df['PERIODO'] == period]
	if not any(map(lambda param: kwargs[param] is not None if 'department' in param else False, keys)):
		# No tiene departamento -> Analizar país
		plot_puntuations_variables(sub_df)
		plot_socioeconomic_variables(sub_df)

		to_zip('static/imgs/saber_pro/imgs.zip', 'static/imgs/saber_pro')
		return
	
	depts = [kwargs[param] for param in kwargs if 'department' in param]
	sub_df = sub_df[sub_df[label_dept].isin(depts)]
	if not any(map(lambda param: kwargs[param] is not None if 'municipality' in param else False, keys)):
		# Tiene departamento -> No municipio
		plot_puntuations_variables(sub_df, hue=label_dept if len(depts) > 1 else None)
		plot_socioeconomic_variables(sub_df)

		to_zip('static/imgs/saber_pro/imgs.zip', 'static/imgs/saber_pro')
		return

	munis = [kwargs[param] for param in kwargs if 'municipality' in param]
	sub_df = sub_df[sub_df[label_municipality].isin(munis)]
	if not any(map(lambda param: kwargs[param] is not None if 'institution' in param else False, keys)):
		# Tiene Municipio -> No institución
		plot_puntuations_variables(sub_df, hue=label_municipality if len(munis) > 1 else None)
		plot_socioeconomic_variables(sub_df)

		to_zip('static/imgs/saber_pro/imgs.zip', 'static/imgs/saber_pro')
		return

	# Tiene Institución
	insts = [kwargs[param] for param in kwargs if 'institution' in param]
	sub_df = sub_df[sub_df[label_institution].isin(insts)]
	plot_puntuations_variables(sub_df, hue=label_institution if len(insts) > 1 else None)
	plot_socioeconomic_variables(sub_df)
	
	to_zip('static/imgs/saber_pro/imgs.zip', 'static/imgs/saber_pro')
