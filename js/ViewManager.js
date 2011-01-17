function ViewManager(app)
{
  this.app = app;  
  this.addEvents();
  
  this.fontSizeIndex = Const.FONT_DEFAULT_INDEX;
}

/*------------------------------------------------------------
  Events
------------------------------------------------------------*/

ViewManager.prototype.addEvents = function()
{
  var app = this.app;
  app.addEvent(Event.INITIALIZE, this.setupHomeView, this);
  app.addEvent(Event.VIEW_LIST_ITEM, this.setupDetailView, this);
  app.addEvent(Event.BACK, this.setupHomeView, this);
  app.addEvent(Event.FONT_SIZE_CHANGE, this.onFontSizeChange, this);
};


ViewManager.prototype.onFontSizeChange = function()
{
  var i = this.fontSizeIndex; i++;
  
  if (i >= Const.FONT_SIZES.length)
    i = 0;

  document.body.style.fontSize = Const.FONT_SIZES[i] + 'px';
  document.getElementById('bt-font').innerHTML = "SIZE: " + Const.FONT_SIZE_LABELS[i];
  this.fontSizeIndex = i;
};

/*------------------------------------------------------------
  UI
------------------------------------------------------------*/

ViewManager.prototype.setupHomeView = function()
{
  var fontLabel = "SIZE: " + Const.FONT_SIZE_LABELS[this.fontSizeIndex];
  
  var header = app.template.create('header', {title:"Home", fontLabel:fontLabel});
  var body = app.template.create('listview', {});
  var card = app.template.create('card', {id:"card1", header:header, body:body});
  
  document.getElementById('wrap').innerHTML = card;
};

ViewManager.prototype.setupDetailView = function(data)
{
  var fontLabel = "SIZE: " + Const.FONT_SIZE_LABELS[this.fontSizeIndex];
  var leftBt = '<div class="bt left" data-ev="Event.BACK">BACK</div>';
  
  var header = app.template.create('header', {title:data, leftButton:leftBt, fontLabel:fontLabel});
  var body = app.template.create('textview', {});
  var card = app.template.create('card', {id:"card2", header:header, body:body});
  
  document.getElementById('wrap').innerHTML = card;
};







