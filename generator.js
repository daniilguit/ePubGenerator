function $$(id) {
	if (id instanceof Element) {
		return id;
	}
	return document.getElementById(id);
}

Element.prototype.on = function(name, callback) {
	this.addEventListener(name, callback, false);
	return this;
}

function generate($url) {
		var zip = new JSZip();
	zip.file('META-INF/container.xml', '<?xml version="1.0" encoding="UTF-8" ?>' + 
'<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">' + 
'  <rootfiles>' + 
'    <rootfile full-path="content/index.html" media-type="text/html"/>' + 
'  </rootfiles>' + 
'</container>)');
	zip.file('content/index.html', 'Here goes awsome content');
	return zip;
}

function download(mime, content) {
	window.location.href = 'data:'+mime+';base64,' + content;
}

$$('form').on('submit', function(e) {
	try {
		download('application/epub+zip', generate("options").generate());
	} catch(e) {
		console.log(e.message);
	}
	e.preventDefault();
});

