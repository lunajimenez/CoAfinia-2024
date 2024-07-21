import pandas as pd
from time import time
import concurrent.futures
from plots_pro import plot_graphs_saber_pro
from plots_11 import plot_graphs_saber_once
from flask import Flask, request, send_file
from flask_cors import CORS


t0 = time()
with concurrent.futures.ThreadPoolExecutor() as executor:
	f1 = executor.submit(pd.read_csv, 'data/Resultados_Saber_11_nonull.csv')
	f2 = executor.submit(pd.read_csv, 'data/Resultados_Saber_Pro_nonull.csv')

	saber11_df = f1.result()
	saber_pro_df = f2.result()

print(f'Tiempo demorado: {time() - t0}')


app = Flask(__name__)
CORS(app)


@app.route("/")
def root():
	return "Hola"


@app.route("/saber_pro/zip_file", methods=['GET'])
def zip_file_pro():
	kwargs = request.args.to_dict()
	kwargs['period'] = int(kwargs['period'])

	plot_graphs_saber_pro(saber_pro_df, **kwargs)
	zip_path = 'static/imgs/saber_pro/imgs.zip'

	return send_file(zip_path, as_attachment=True)


@app.route("/saber_11/zip_file", methods=['GET'])
def zip_file11():
	kwargs = request.args.to_dict()
	kwargs['period'] = int(kwargs['period'])

	plot_graphs_saber_once(saber11_df, **kwargs)
	zip_path = 'static/imgs/saber_11/imgs.zip'

	return send_file(zip_path, as_attachment=True)


if __name__ == '__main__':
	app.run(debug=True)

