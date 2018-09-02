# GetCookies
Get cookies across sites via Chrome API

# How To Use
```html
 <iframe id="xdwin" width="0px" height="0px" src="https://kookxiang.github.io/GetCookies/proxy.htm"></iframe>
 <script>
  window.addEventListener('message',function(event) {
    console.log(JSON.stringify(event.data));
  },false);

  function postMessage() {
          var win = document.getElementById("xdwin").contentWindow;
          win.postMessage({action:"getCookie", site:"https://github.com"}, "*");
  } 

  window.onload = function() {
	postMessage();
  }

</script>
```
