jstestdriver.createHeartbeat=function(h){function g(){return document.getElementsByTagName("body")[0]}function d(j){return document.createElement(j)}var i=new jstestdriver.HeartbeatView(g,d);function a(k,l,m,j){jstestdriver.jQuery.ajax({type:"POST",url:k,data:l,success:m,error:j,dataType:"text"})}function e(){return new Date().getTime()}function b(j){top.location=j}var c=jstestdriver.extractId(window.location.toString());var f=jstestdriver.createPath(window.location.toString(),jstestdriver.HEARTBEAT_URL);return new jstestdriver.Heartbeat(c,f,h,a,2000,jstestdriver.setTimeout,e,i,b)};