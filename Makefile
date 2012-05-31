PD = packed/twitter-com-extensions

all: files
	google-chrome --pack-extension=$(PD) --pack-extension-key=twitter-com-extensions.pem

dirs:
	mkdir -p packed/twitter-com-extensions
	
files: dirs $(PD)/manifest.json $(PD)/jquery.js $(PD)/hipster-tweets.js $(PD)/background.html $(PD)/options.html

$(PD)/manifest.json: manifest.json
	cp manifest.json $(PD)

$(PD)/jquery.js: jquery.js
	cp jquery.js $(PD)

$(PD)/hipster-tweets.js: hipster-tweets.js
	cp hipster-tweets.js $(PD)

$(PD)/background.html: background.html
	cp background.html $(PD)

$(PD)/options.html: options.html
	cp options.html $(PD)

install:
	google-chrome ./$(PD)/twitter-com-extensions.crx
  
