var isMobileDevice = (navigator.userAgent.search(/iphone|ipad|android|palm|blackberry/gi) != -1 ? true : false);

function App()
{
  var self = this;
  this.service = new ServiceCore(self);
  this.view = new ViewManager(self);
  this.template = new TemplateManager(self);
  
  var templatePaths = 
  {
    card:"template/card.html",
    header:"template/header.html",
    textview:"template/textview.html",
    listview:"template/listview.html"
  };
  
  this.template.init(templatePaths, function(){self.runEvent(Event.INITIALIZE)});
  this.setTouchHandler();
}

App.prototype = new AppCore();

App.prototype.setTouchHandler = function()
{
  var self = this;
  var container = document.getElementById('wrap');

  function onClick(e)
  {
    var counter = 3;
    var target = e.target;
    while (target && counter > 0)
    {
      if (target && target.getAttribute('data-ev'))
      {
        var eventName = target.getAttribute('data-ev');
        var data = target.getAttribute('data');
        var eventValue = eval(eventName)
        self.runEvent(eventValue, data);
        break;
      }      
      target = target.parentNode;
      counter--;
    }
  }
  
  Util.setTouchHandler(container, onClick, isMobileDevice);
};

var app = new App();

