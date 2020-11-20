(function ()
{
  let namespace = "pg"
  if (window.pg) namespace = "ppg";

  let app = new clsApp();
  window[namespace] = app;

  function clsApp()
  {
    var me = this;

    //var BUTTON = '<button id="a-btnAdd" class="aa-widget">+</button>';

    var PANEL_BOTTOM = ''+
    '<div id="a-divPanelBottom" class="panelHidden aa-widget">'+
    ' <div>'+
    '   <div><input id="a-inp" class="input aa-widget" placeholder="url"></div>'+
    ' </div>'+
    BUTTON+
    '</div>';

    this.start = function ()
    {
      console.log("clsApp started!");

      this.createPanelBottom();
      this.getStyleOfPage()
    }

    this.getStyleOfPage = function()
    {
      let widgets = $('.aa-widget');

      let back = getComputedStyle(document.body).getPropertyValue('background-color');
      let text = getComputedStyle(document.body).getPropertyValue('color');
      
      if (back != "rgba(0, 0, 0, 0)"){
        widgets.css('background-color', back);
      }
      if (text != "rgba(0, 0, 0, 0)"){
        widgets.css('color', text);
      }
    }


    this.createPanelBottom = function()
    {
      $(document.body).append(PANEL_BOTTOM);

      this.panel_bottom = $("#a-divPanelBottom");
      
      this.btnAdd = $("#a-btnAdd");
      this.btnAdd.click(this.btnAdd_click.bind(this));
    }

    this.btnAdd_click = function()
    {
      this.panel_bottom.toggleClass('panelHidden');
    }

    this.start();
    
  }

})()