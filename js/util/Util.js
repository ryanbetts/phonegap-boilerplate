var Util = 
{	
	xhr:function(url, onComplete, onError)
	{	
		console.log(url)
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
	  	req.setRequestHeader("Cache-Control", "no-cache");
	  	req.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
		req.onreadystatechange = function() 
		{
			if(req.readyState == 4)
			{
				if (req.status == 200 && onComplete)
					onComplete.call(this);
				else if (req.status == 500 && onError)
					onError.call(this);
			}
		};
		req.send();
	},
	localXhr:function(url, onComplete, onError)
	{	
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
	  	req.setRequestHeader("Cache-Control", "no-cache");
	  	req.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
		req.onreadystatechange = function() 
		{
			if(req.readyState == 4)
			{
				onComplete.call(this);
			}
		};
		req.send();
	},
	setTouchHandler:function(container, onClick, isMobile)
	{
		function onTouchStart(e)
		{
			var counter = 5;
			var target = e.target;
			if (target.nodeType == 3) target = target.parentNode;


			while (target != null && counter > 0)
			{
				if (target && target.getAttribute && target.getAttribute('data-ev'))
				{
					target.className = target.className + ' active';
					break;
				}
				counter--;		
			}
		}

		function onTouchEnd(e)
		{		
			var elements = Util.getElementsByClass('active');

			for (var i in elements)
			{
				var cn = elements[i].className;
				if (cn == 'active') cn = '';
				else cn = cn.replace(/\sactive/gi, '');
				elements[i].className = cn;
			}
		}

		if (isMobile)
		{
			container.addEventListener('touchstart', onTouchStart);
			container.addEventListener('touchmove', onTouchEnd);
			container.addEventListener('touchend', onTouchEnd);
			container.addEventListener('click', onClick);
		}
		else
		{
			container.addEventListener('mousedown', onTouchStart);
			container.addEventListener('mouseup', onTouchEnd);
			container.addEventListener('click', onClick);
		}
	},
	getElementsByClass:function(searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
}

function log(m)
{
	if (console && console.log)
		console.log(m);
}
