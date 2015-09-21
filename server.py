import MySQLdb
import cgi
import json
import os
from flask import Flask
from flask import request
from flask import Response
from flask import send_from_directory

app = Flask(__name__)

cnxn = MySQLdb.connect(host='45.79.149.43', port=3306, db='findsenpai', user='root', passwd='ss')

@app.route("/users")
def get():
	cursor = cnxn.cursor()

	#select all tables from all databases
	cursor.execute("select * from users order by score desc limit 20;")
	rows = cursor.fetchall()
	scoreslist = []
	for row in rows:
		scoreslist.append(dict([('id',(row[0])),
					('name', cgi.escape(row[1])),
					('score', row[2])]));
	return json.dumps(scoreslist)

@app.route("/save")
def put():
	user = request.args.get('user')
	score = request.args.get('score')
	id = request.args.get('id')
    
	cursor = cnxn.cursor()

	query = ""

	if id is None:
		query = "insert into users (name, score) values ( \'" + user + "\', " + score + ");"
	else:
		query = "update users set score=" + score + "  where id=" + id + ";"

	print(query)

	cursor.execute(query)
	cnxn.commit()
	cnxn.close()

	return get()


if __name__ == "__main__":
	app.run(debug=True, port=8080, host='0.0.0.0')
