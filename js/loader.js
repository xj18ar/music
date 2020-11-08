/**
 * Class MainLoader. Gestiona las descargas de dependencias y las traduces
 *
 * Constructor: 
 *
 * @param {Arrayy} 		arDependencies 	- Una lista de urls.
 * @param {Function} 	callback 		- Se ejecuta se han descargado todos las dependencias
 *
 * @returns <undefined> 
 */

class MainLoader{

	constructor( arDependencies, callback ){

		console.log("New instance of "+this.constructor.name);

		this.currentIndex = -1;
		this.arDep 		 		= [];

		this.callback = callback;
		this.arDep    = arDependencies || [];

		this.start();
	}

	start(){

		console.log("started "+this.constructor.name);

		this.importNext();
	}

	dependenciesImported(){

		if (typeof this.callback == "function"){
			this.callback();
		}
	}

	importNext(){

		this.currentIndex++;

		if (this.currentIndex >= this.arDep.length){
			console.log("Imported all dependencies");
			this.dependenciesImported()
			return
		}
		var url = this.arDep[this.currentIndex];

		this.importJS(url, this.importNext.bind(this));
	}

	
	importJS(url, callback){

		if (!url) {
			if (callback){ callback() }
			return
		}

		url = url + '?v=' + window.appVersion

		console.log("Importing... "+url)

		this.request(url,function(response, error){

			if (error){
				console.log("Error on load: "+url, error);
				callback();
				return
			}

			var scr  = document.createElement('script');
			
			scr.id   = "script_"+url.substring(url.lastIndexOf('/')+1)
			scr.text = response;

			document.head.appendChild(scr);

			if (typeof callback != "undefined"){
				callback(scr); 
			}

			console.log("\tImported "+url)
		})
	}

	request(url, callback){

		const xhr = new XMLHttpRequest();

		xhr.onload = function () { 

			var error = null
			if (typeof callback != "undefined"){
				if (this.status != 200){
					error = this.status + " - " +this.statusText
				}
				callback(this.responseText, error); 
			}
		};

		xhr.open('GET', url, true);
		xhr.send();
	}

}

window.appVersion = window.appVersion || (new Date().getTime()/1000).toFixed(0);