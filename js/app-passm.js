(function ()
{
  let namespace = "pg"
  if (window.pg) namespace = "ppg";

  let app = new clsApp();
  window[namespace] = app;

  function clsApp()
  {
    var me = this;

    var BUTTON = '<button id="a-btnAdd">+</button>';
    var PANEL_BOTTOM = ''+
    '<div id="a-divPanelBottom" class="panelHidden">'+
    ' <div>'+
    '   <div>URL</div>'+
    ' </div>'+
    '</div>';

    this.start = function ()
    {
      console.log("clsApp started!");

      this.createButton();
      this.createPanelBottom();
    }

    this.createButton = function ()
    {
      $(document.body).append(BUTTON);

      this.btnAdd = $("#a-btnAdd");
      this.btnAdd.click(this.btnAdd_click.bind(this));
    }

    this.createPanelBottom = function()
    {
      $(document.body).append(PANEL_BOTTOM);
      this.panel_bottom = $("#a-divPanelBottom");
    }

    this.btnAdd_click = function()
    {
      this.panel_bottom.toggleClass('panelHidden');
      this.btnAdd.toggleClass('rotateButton');
    }

    this.start();
  }

})()