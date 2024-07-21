import os
import json
import zipfile
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


def to_zip(zip_path: str, folder_to_zip: str = '') -> None:
    """ 
    Función para convertir las imágenes de extensión '.png' y archivos '.json' de cierta carpeta
    a un archivo '.zip'. El archivo zip resultante será almacenado en con la dirección de `zip_path`.
    """
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for file in os.listdir(folder_to_zip):
            if os.path.splitext(file)[1] in ['.png', '.json']:
                zipf.write(os.path.join(folder_to_zip, file), os.path.basename(file))

def df_describe_to_json(sub_df: pd.DataFrame) -> None:
    # Lista de columnas a describir
    columns_to_describe = [
        'PUNT_INGLES', 
        'PUNT_MATEMATICAS', 
        'PUNT_SOCIALES_CIUDADANAS', 
        'PUNT_C_NATURALES', 
        'PUNT_LECTURA_CRITICA', 
        'PUNT_GLOBAL'
    ]

    # Descripción de las columnas seleccionadas
    df_describe = sub_df[columns_to_describe].describe()

    # Conversión de la descripción a un formato más organizado
    description_dict = {}
    for column in df_describe.columns:
        description_dict[column] = df_describe[column].to_dict()

    # Guardado de la descripción en un archivo JSON
    json_path = 'static/imgs/saber_11/data_description.json'
    with open(json_path, 'w') as json_file:
        json.dump(description_dict, json_file, indent=4)


def plot_circular_diagram(sub_df: pd.DataFrame, y_label: str, path: str,
                          title: str = '', figsize: tuple = (12, 12),
                          autopct: str = '%1.1f%%', startangle: int = 130,
                          pctdistance: float = 0.8, colors: list = None, ring: bool = True) -> None:
    """ 
    Graficar los diagramas circulares con anillos y colores que representan a Colombia (exceptuando el rosado).
    """
    counts = sub_df[y_label].value_counts()
    fig, ax = plt.subplots(figsize=figsize)
    if colors is None:
        colors = sns.color_palette([color for color in sns.color_palette("pastel") if color != (1, 0.75, 0.796)])  
    if ring:
        ax.pie(counts, labels=counts.index, autopct=autopct, startangle=startangle,
               pctdistance=pctdistance, colors=colors, wedgeprops=dict(width=0.3))
    else:
        ax.pie(counts, labels=counts.index, autopct=autopct, startangle=startangle,
               pctdistance=pctdistance, colors=colors)
    ax.set_title(title, fontweight='bold')
    plt.savefig(path, transparent=True)

def plot_histogram(sub_df: pd.DataFrame, x: str, path: str, title: str = '', x_label: str = '',
                   y_label: str = '', figsize: tuple = (12, 12), hue: str | None = None) -> None:
    """ 
    Graficar un histograma. Se utiliza solo para comparar las puntuaciones de determinada competencia.
    """
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_title(title, fontweight='bold')
    ax.set_xlabel(x_label, fontweight='bold')
    ax.set_ylabel(y_label, fontweight='bold')
    sns.histplot(sub_df, x=x, stat='count', kde=True, hue=hue, ax=ax, palette=sns.color_palette(["#0033A0", "#FFCD00", "#CE1126", '#0033A0',
                                                                                                  '#FFD700', '#CE1126', '#009B77', '#FF6600']))
    plt.savefig(path, transparent=True)

def plot_socioeconomic_variables(sub_df: pd.DataFrame) -> None:
    """ Graficar variables socioeconómicas. """ 
    colors = sns.color_palette([color for color in sns.color_palette("pastel") if color != (1, 0.75, 0.796)])  # Excluir el rosado
    plot_circular_diagram(sub_df, 'FAMI_ESTRATOVIVIENDA', 'static/imgs/saber_11/estrato.png', title='ESTRATO VIVIENDA', colors=colors)
    plot_circular_diagram(sub_df, 'FAMI_EDUCACIONMADRE', 'static/imgs/saber_11/educacion_madre.png', title='NIVEL EDUCATIVO MADRE', colors=colors)
    plot_circular_diagram(sub_df, 'FAMI_EDUCACIONPADRE', 'static/imgs/saber_11/educacion_padre.png', title='NIVEL EDUCATIVO PADRE', colors=colors)
    plot_circular_diagram(sub_df, 'FAMI_TIENEAUTOMOVIL', 'static/imgs/saber_11/automovil.png', title='TIENE AUTOMOVIL', colors=colors, ring = False)
    plot_circular_diagram(sub_df, 'FAMI_TIENELAVADORA', 'static/imgs/saber_11/lavadora.png', title='TIENE LAVADORA', colors=colors, ring = False)
    plot_circular_diagram(sub_df, 'FAMI_TIENECOMPUTADOR', 'static/imgs/saber_11/computador.png', title='TIENE COMPUTADORA', colors=colors, ring = False)
    plot_circular_diagram(sub_df, 'FAMI_TIENEINTERNET', 'static/imgs/saber_11/internet.png', title='TIENE INTERNET', colors=colors, ring = False)
    plot_circular_diagram(sub_df, 'ESTU_GENERO', 'static/imgs/saber_11/estudiante_genero.png', title='GENERO ESTUDIANTE', colors=colors, ring = False)

def plot_puntuations_variables(sub_df: pd.DataFrame, hue: str | None = None) -> None:
    """ Graficar variables de puntuaciones. """
    plot_histogram(sub_df, x='PUNT_INGLES', path='static/imgs/saber_11/puntaje_ingles.png',
                    x_label='PUNTAJE', y_label='CANTIDAD', title='INGLES', hue=hue)
    plot_histogram(sub_df, x='PUNT_MATEMATICAS', path='static/imgs/saber_11/puntaje_matematicas.png',
                    x_label='PUNTAJE', y_label='CANTIDAD', title='MATEMATICAS', hue=hue)
    plot_histogram(sub_df, x='PUNT_SOCIALES_CIUDADANAS', path='static/imgs/saber_11/puntaje_sociales_ciud.png',
                    x_label='PUNTAJE', y_label='CANTIDAD', title='SOCIALES Y CIUDADANA', hue=hue)
    plot_histogram(sub_df, x='PUNT_C_NATURALES', path='static/imgs/saber_11/puntaje_ciencias_nat.png',
                    x_label='PUNTAJE', y_label='CANTIDAD', title='CIENCIAS NATURALES', hue=hue)
    plot_histogram(sub_df, x='PUNT_LECTURA_CRITICA', path='static/imgs/saber_11/puntaje_lectura_cri.png',
                    x_label='PUNTAJE', y_label='CANTIDAD', title='LECTURA CRITICA', hue=hue)
    plot_histogram(sub_df, x='PUNT_GLOBAL', path='static/imgs/saber_11/puntaje_global.png',
                    x_label='PUNTAJE', y_label='CANTIDAD', title='PUNTAJE GLOBAL', hue=hue)

def plot_graphs_saber_once(df: pd.DataFrame, **kwargs) -> None:
    """
    Graficar todas las variables socioeconómicas y las puntuaciones con ayuda de las funciones
    anteriormente creadas. Si a la función no se le especifican departamento, entonces lo que se quiere comparar
    son los resultados de todo el país; si una función no tiene municipios seleccionado, entonces lo que se
    quiere comparar son los departamentos; si una función no tiene instituciones seleccionadas, entonces lo que
    se quiere comparar las universidad en dichos municipios; si están todos las opciones especificadas, entonces
    lo que se quiere es comparar instituciones que se encuentran dentro del municipio y, por tanto, el mismo
    departamento

    kwargs = {
        'period': int,
        'department': str | None,
        'municipality': str | None,
        'institution': str | None,
        ...
    }
    """
    label_dept, label_municipality, label_institution = 'COLE_DEPTO_UBICACION', 'COLE_MCPIO_UBICACION', 'COLE_NOMBRE_ESTABLECIMIENTO'
    kwargs = dict(kwargs)
    keys = kwargs.keys()
    print(kwargs)

    period = kwargs['period']
    sub_df = df[df['PERIODO'] == period]
    if not any('department' in param and kwargs[param] is not None for param in keys):
        # No tiene departamento -> Analizar país
        df_describe_to_json(sub_df)
        plot_puntuations_variables(sub_df)
        plot_socioeconomic_variables(sub_df)

        to_zip('static/imgs/saber_11/imgs.zip', 'static/imgs/saber_11')
        return
    
    depts = [kwargs[param] for param in kwargs if 'department' in param and kwargs[param] is not None]
    sub_df = sub_df[sub_df[label_dept].isin(depts)]
    if not any('municipality' in param and kwargs[param] is not None for param in keys):
        # Tiene departamento -> No municipio
        df_describe_to_json(sub_df)
        plot_puntuations_variables(sub_df, hue=label_dept if len(depts) > 1 else None)
        plot_socioeconomic_variables(sub_df)

        to_zip('static/imgs/saber_11/imgs.zip', 'static/imgs/saber_11')
        return

    munis = [kwargs[param] for param in kwargs if 'municipality' in param and kwargs[param] is not None]
    sub_df = sub_df[sub_df[label_municipality].isin(munis)]
    if not any('institution' in param and kwargs[param] is not None for param in keys):
        # Tiene Municipio -> No institución
        df_describe_to_json(sub_df)
        plot_puntuations_variables(sub_df, hue=label_municipality if len(munis) > 1 else None)
        plot_socioeconomic_variables(sub_df)

        to_zip('static/imgs/saber_11/imgs.zip', 'static/imgs/saber_11')
        return

    # Tiene Institución
    insts = [kwargs[param] for param in kwargs if 'institution' in param and kwargs[param] is not None]
    sub_df = sub_df[sub_df[label_institution].isin(insts)]
    df_describe_to_json(sub_df)
    plot_puntuations_variables(sub_df, hue=label_institution if len(insts) > 1 else None)
    plot_socioeconomic_variables(sub_df)
    
    to_zip('static/imgs/saber_11/imgs.zip', 'static/imgs/saber_11')
