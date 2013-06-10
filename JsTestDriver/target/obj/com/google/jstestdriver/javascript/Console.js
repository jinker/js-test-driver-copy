goog.provide("jstestdriver.Console");jstestdriver.JSON=window["JSON"]||{};jstestdriver.JSON.stringify=window["JSON"]?window["JSON"]["stringify"]:function(b,a){};jstestdriver.FORMAT_MAPPINGS={"s":function(a){if(a==undefined){return""}return String(a)},"d":Number,"i":parseInt,"f":parseFloat,"o":jstestdriver.JSON.stringify};jstestdriver.formatString=function(e){var c=arguments;var a=1;var d=String(e).replace(/%([sdifo])/g,function(f,g){var h=c[a++];if(!jstestdriver.FORMAT_MAPPINGS[g]){throw new Error(g+"is not a proper format.")}if(h===undefined||h===null){return h}return jstestdriver.FORMAT_MAPPINGS[g](h)});while(a<c.length){var b=c[a++];if(typeof b=="object"){b=jstestdriver.JSON.stringify(b)}d+=" "+b}return d};jstestdriver.Console=function(){this.log_=[]};jstestdriver.Console.prototype.log=function(){this.logStatement("[LOG]",jstestdriver.formatString.apply(this,arguments))};jstestdriver.Console.prototype.debug=function(){this.logStatement("[DEBUG]",jstestdriver.formatString.apply(this,arguments))};jstestdriver.Console.prototype.info=function(){this.logStatement("[INFO]",jstestdriver.formatString.apply(this,arguments))};jstestdriver.Console.prototype.warn=function(){this.logStatement("[WARN]",jstestdriver.formatString.apply(this,arguments))};jstestdriver.Console.prototype.error=function(){this.logStatement("[ERROR]",jstestdriver.formatString.apply(this,arguments))};jstestdriver.Console.prototype.logStatement=function(b,a){this.log_.push(b+" "+a)};jstestdriver.Console.prototype.getLog=function(){var a=this.log_;return a.join("\n")};jstestdriver.Console.prototype.getAndResetLog=function(){var a=this.getLog();this.log_=[];return a};