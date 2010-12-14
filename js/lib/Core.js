// These should remain unchanged as much as possible

/*------------------------------------------------------------
	AppCore
------------------------------------------------------------*/

function AppCore()
{
	var self = this;
	self.events = {};
	
	this.addEvent = function(type, callback, resp)
	{	
		if (!self.events[type]) self.events[type] = [];

		self.events[type].push({cb:callback, res:resp});
	};
	
	this.runEvent = function(type, event)
	{
		var e = self.events[type];
		if (e && e.length > 0)
		{
			if (!event) event = {};
			event.ctype = type;

			for (var i = 0; i < e.length; i++)
			{				
				if (e[i] && e[i].cb)
				{
					e[i].cb.apply(e[i].res || self, [event]);
				}
			}
		}
	};	
}


/*------------------------------------------------------------
	ServiceCore
------------------------------------------------------------*/

function ServiceCore(app)
{
	this.app = app;
}

ServiceCore.prototype.addService = function(url, request, callback, error)
{
	var self = this;
	var app = self.app;
	app.addEvent(request, function()
	{
		Util.xhr(url, 
			function(){app.runEvent(callback, this);},
			function(){	app.runEvent(error, this);})
	}, self);
};

ServiceCore.prototype.addLocalService = function(url, request, callback, error)
{
	var self = this;
	var app = self.app;
	app.addEvent(request, function()
	{
		Util.localXhr(url, 
			function(){app.runEvent(callback, this);},
			function(){	app.runEvent(error, this);})
	}, self);
};


/*------------------------------------------------------------
	Template Manager
------------------------------------------------------------*/

// Requires Util.js
// Requires Mustache.js for .create
function TemplateManager()
{
	this.counter = 0;	
	var self = this;

	this.init=function(templPaths, cb)
	{
		if (cb) self.onTemplateLoadComplete = cb;
	
		for (var key in templPaths)
		{
			self.counter++;
		
			var url = templPaths[key];
			self.loadTemplate(key, url);
		}
		if (self.counter == 0 && cb)
			cb.call(null);
	};

	this.loadTemplate=function(key, url)
	{
		Util.localXhr(url, function() 
		{
			self[key] = this.responseText;
			self.onTemplateLoad();
		});
	};

	this.onTemplateLoad=function()
	{
		self.counter--;
	
		if (self.counter <= 0)
			self.onTemplateLoadComplete();
	};	

	this.create=function(key, options)
	{
		return Mustache.to_html(self[key], options);
	};

	// Assign this to init in your main App.js if necessary
	this.onTemplateLoadComplete=function(){
	
	};	
};

