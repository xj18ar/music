(function(){

  function clsApp()
  {
    this.init = function(){
      console.log("app initialized!!")
    }

    this.importDependencies = function(){
      console.log("importing dependencies")
    }
  }

  window.app = new clsApp();
  window.app.init()
})()