jstestdriver.StandAloneLoadTestsCommand=function(e,b,d,f,a,c){this.jsonParse_=e;this.pluginRegistrar_=b;this.boundOnFileLoaded_=jstestdriver.bind(this,this.onFileLoaded);this.getBrowserInfo=d;this.onLoadComplete_=f;this.reporter_=a;this.now_=c};jstestdriver.StandAloneLoadTestsCommand.prototype.loadTest=function(c){var d=c[0];var b=this.jsonParse_('{"f":'+d+"}").f;this.removeScripts(document,b);var a=new jstestdriver.FileLoader(this.pluginRegistrar_,this.boundOnFileLoaded_);this.reporter_.startLoading(this.now_());a.load(b)};jstestdriver.StandAloneLoadTestsCommand.prototype.onFileLoaded=function(a){this.reporter_.addLoadedFileResults(a.loadedFiles);var b=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.FILE_LOAD_RESULT,JSON.stringify(a),this.getBrowserInfo());this.reporter_.finishLoading(this.now_());this.onLoadComplete_(b)};jstestdriver.StandAloneLoadTestsCommand.prototype.findScriptTagsToRemove_=function(e,l){var c=e.getElementsByTagName("script");var a=l.length;var k=c.length;var b=[];for(var g=0;g<a;g++){var h=l[g].fileSrc;for(var d=0;d<k;d++){var m=c[d];if(m.src.indexOf(h)!=-1){b.push(m);break}}}return b};jstestdriver.StandAloneLoadTestsCommand.prototype.removeScriptTags_=function(e,f){var d=e.getElementsByTagName("head")[0];var c=f.length;for(var b=0;b<c;b++){var a=f[b];d.removeChild(a)}};jstestdriver.StandAloneLoadTestsCommand.prototype.removeScripts=function(b,a){this.removeScriptTags_(b,this.findScriptTagsToRemove_(b,a))};