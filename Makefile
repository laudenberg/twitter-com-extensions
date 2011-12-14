PD = packed/twitter-com-extensions

all: files
	google-chrome --pack-extension=$(PD) --pack-extension-key=twitter-com-extensions.pem

dirs:
	mkdir -p packed/twitter-com-extensions
	
files: dirs $(PD)/manifest.json $(PD)/jquery.js $(PD)/new-tweets-click.js $(PD)/display-ragefaces-inline.js

$(PD)/manifest.json: manifest.json
	cp manifest.json $(PD)

$(PD)/jquery.js: jquery.js
	cp jquery.js $(PD)

$(PD)/new-tweets-click.js: new-tweets-click.js
	cp new-tweets-click.js $(PD)

$(PD)/display-ragefaces-inline.js: display-ragefaces-inline.js
	cp display-ragefaces-inline.js $(PD)

