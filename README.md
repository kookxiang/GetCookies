# GetCookies
Get cookies across sites via Api with Chrome Addon
If you want to use your own proxy server you should change https://kookxiang.github.io domain with your own.
Or you can just compile Chrome addon and use default server.

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
