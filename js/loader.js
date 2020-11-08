function Loader()
{
  var me = this;

  this.initialize = function (arDependencies, callback)
  {
    console.log("New instance of " + this.constructor.name);

    this.currentIndex = -1;
    this.arDep = [];

    this.callback = callback;
    this.arDep = arDependencies || [];

    debugger

    if (window.appVersion == undefined){
      this.importVersion(this.initialize.bind(this));
      return
    }

    if (arDependencies == undefined)
    {
      this.getDependencies(this.initialize.bind(this));
      return
    }

    this.start();
  }



  this.start = function ()
  {

    console.log("started " + this.constructor.name);

    this.importNext();
  }

  this.dependenciesImported = function dependenciesImported()
  {

    if (typeof this.callback == "function")
    {
      this.callback();
    }
  }

  this.getDependencies = function(callback)
  {


  }

  this.getVersion = function(callback){
    this.importJS('./version.js')
  }

  this.importNext = function importNext()
  {

    this.currentIndex++;

    if (this.currentIndex >= this.arDep.length)
    {
      console.log("Imported all dependencies");
      this.dependenciesImported()
      return
    }
    var url = this.arDep[this.currentIndex];

    this.importJS(url, this.importNext.bind(this));
  }


  this.importJS = function importJS(url, callback)
  {

    if (!url)
    {
      if (callback) { callback() }
      return
    }
    let v = window.appVersion
    if (window.appVersion == undefined){
      v = new Date().getTime();
    }

    url = url + '?v=' + v

    console.log("Importing... " + url)

    this.request(url, function (response, error)
    {

      if (error)
      {
        console.log("Error on load: " + url, error);
        callback();
        return
      }

      var scr = document.createElement('script');

      scr.id = "script_" + url.substring(url.lastIndexOf('/') + 1)
      scr.text = response;

      document.head.appendChild(scr);

      if (typeof callback != "undefined")
      {
        callback(scr);
      }

      console.log("\tImported " + url)
    })
  }

  this.request = function request(url, callback)
  {

    const xhr = new XMLHttpRequest();

    xhr.onload = function ()
    {

      var error = null
      if (typeof callback != "undefined")
      {
        if (this.status != 200)
        {
          error = this.status + " - " + this.statusText
        }
        callback(this.responseText, error);
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
  }

}