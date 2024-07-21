from backend.plots_pro import *
from flask import Flask, request, send_file


app = Flask(__name__)


@app.route("/saber_pro/zip_file", methods=['GET'])
def zip_file_pro():
	kwargs = request.args.to_dict()
	kwargs['period'] = int(kwargs['period'])

	plot_graphs_saber_pro(**kwargs)
	zip_path = 'static/imgs/saber_pro/imgs.zip'

	return send_file(zip_path, as_attachment=True)


@app.route("/saber_11/zip_file", methods=['GET'])
def zip_file11():
	kwargs = request.args.to_dict()
	kwargs['period'] = int(kwargs['period'])

	# plot_graphs_saber_pro(**kwargs)  --  Utilizar equivalente para saber 11
	zip_path = 'static/imgs/saber_11/imgs.zip'

	return send_file(zip_path, as_attachment=True)


if __name__ == '__main__':
	app.run(debug=True)

