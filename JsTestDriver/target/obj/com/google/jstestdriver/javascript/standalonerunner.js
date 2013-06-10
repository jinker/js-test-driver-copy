jstestdriver.Signal=function(a){this.value_=a};jstestdriver.Signal.prototype.get=function(){return this.value_};jstestdriver.Signal.prototype.set=function(a){this.value_=a};jstestdriver.PageUnloadHandler=function(b,c,d,a){this.streamingService_=b;this.getBrowserInfo_=c;this.getCommand_=d;this.unloadSignal_=a};jstestdriver.PageUnloadHandler.prototype.onUnload=function(b){if(!this.unloadSignal_.get()){var a;try{a=b.type}catch(b){a="[error while trying to get event type: "+b+"]"}this.streamingService_.synchClose(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.BROWSER_PANIC,"Page reloaded unexpectedly during or after "+this.getCommand_()+" triggered by "+a,this.getBrowserInfo_(),false))}};jstestdriver.ResetCommand=function(a,c,b){this.location_=a;this.signal_=c;this.now_=b};jstestdriver.ResetCommand.prototype.reset=function(j){this.signal_.set(true);var k=j[0]?j[0]:"preload";var l=j[1];if(!l){k="load"}var e=this.now_();var b=this.location_.href.match(/^(.*)\/(slave|runner|bcr)\/(.*)/);var c=b[1];var h=b[2];var d=b[3].split("/");var f=[c,h];for(var g=0;d[g];g++){if(d[g]=="testcase_id"||d[g]=="refresh"||d[g]=="load_type"){g++;continue}f.push(d[g])}f.push("refresh");f.push(e);f.push("load_type");f.push(k);if(l){f.push("testcase_id");f.push(l)}var a=f.join("/");jstestdriver.log("Replacing "+a);this.location_.replace(a)};jstestdriver.NoopCommand=function(a,b){this.streamStop_=a;this.streamStop_=a;this.getBrowserInfo_=b};jstestdriver.NoopCommand.prototype.sendNoop=function(){this.streamStop_(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.NOOP,"{}",this.getBrowserInfo_()))};jstestdriver.RESPONSE_TYPES={FILE_LOAD_RESULT:"FILE_LOAD_RESULT",REGISTER_RESULT:"REGISTER_RESULT",TEST_RESULT:"TEST_RESULT",TEST_QUERY_RESULT:"TEST_QUERY_RESULT",RESET_RESULT:"RESET_RESULT",COMMAND_RESULT:"COMMAND_RESULT",BROWSER_READY:"BROWSER_READY",BROWSER_PANIC:"BROWSER_PANIC",NOOP:"NOOP",LOG:"LOG"};jstestdriver.Response=function(c,a,b,d){this.type=c;this.response=a;this.browser=b;if(d){this.start=true}};jstestdriver.Response.prototype.toString=function(){return"Response(\nresponse="+this.response+",\ntype"+this.type+",\n browser="+this.browser+")"};jstestdriver.CommandResponse=function(a,b){this.done=a;this.response=b};jstestdriver.BrowserInfo=function(a){this.id=a};function expectAsserts(a){jstestdriver.expectedAssertCount=a}var fail=function fail(b){var a=new Error(b);a.name="AssertError";if(!a.message){a.message=b}throw a};function isBoolean_(a){if(typeof(a)!="boolean"){fail("Not a boolean: "+prettyPrintEntity_(a))}}var isElement_=(function(){var c=document.createElement("div");function b(f){try{c.appendChild(f);c.removeChild(f)}catch(d){return false}return true}return function a(d){return d&&d.nodeType===1&&b(d)}}());function formatElement_(f){var d;try{d=f.tagName.toLowerCase();var j="<"+d;var b=f.attributes,g;for(var c=0,a=b.length;c<a;c++){g=b.item(c);if(!!g.nodeValue){j+=" "+g.nodeName+'="'+g.nodeValue+'"'}}return j+">...</"+d+">"}catch(h){return"[Element]"+(!!d?" "+d:"")}}function prettyPrintEntity_(a){if(isElement_(a)){return formatElement_(a)}var c;if(typeof a=="function"){try{c=a.toString().match(/(function [^\(]+\(\))/)[1]}catch(b){}return c||"[function]"}try{c=JSON.stringify(a)}catch(b){}return c||"["+typeof a+"]"}function argsWithOptionalMsg_(b,e){var a=[];for(var d=0;d<b.length;d++){a.push(b[d])}var c=e-1;if(b.length<c){fail("expected at least "+c+" arguments, got "+b.length)}else{if(b.length==e){a[0]+=" "}else{a.unshift("")}}return a}function assertTrue(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;isBoolean_(a[1]);if(a[1]!=true){fail(a[0]+"expected true but was "+prettyPrintEntity_(a[1]))}return true}function assertFalse(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;isBoolean_(a[1]);if(a[1]!=false){fail(a[0]+"expected false but was "+prettyPrintEntity_(a[1]))}return true}function assertEquals(c,b,d){var a=argsWithOptionalMsg_(arguments,3);jstestdriver.assertCount++;c=a[0];b=a[1];d=a[2];if(!compare_(b,d)){fail(c+"expected "+prettyPrintEntity_(b)+" but was "+prettyPrintEntity_(d)+"")}return true}function compare_(g,j){if(g===j){return true}if(typeof g!="object"||typeof j!="object"||!g||!j){return g==j}if(isElement_(g)||isElement_(j)){return false}var d=null;var f=0;var b=0;try{if(jstestdriver.jQuery.isArray(j)){f=j.length}else{for(d in j){if(j.hasOwnProperty(d)){++f}}}if(f==0&&typeof j.length=="number"){f=j.length;for(var c=0,a=f;c<a;c++){if(!(c in j)){f=0;break}}}for(d in g){if(g.hasOwnProperty(d)){if(!compare_(g[d],j[d])){return false}++b}}if(b!=f){return false}return b==0?g.toString()==j.toString():true}catch(h){return false}}function assertNotEquals(d,b,f){try{assertEquals.apply(this,arguments)}catch(c){if(c.name=="AssertError"){return true}throw c}var a=argsWithOptionalMsg_(arguments,3);fail(a[0]+"expected "+prettyPrintEntity_(a[1])+" not to be equal to "+prettyPrintEntity_(a[2]))}function assertSame(c,b,d){var a=argsWithOptionalMsg_(arguments,3);jstestdriver.assertCount++;if(!isSame_(a[2],a[1])){fail(a[0]+"expected "+prettyPrintEntity_(a[1])+" but was "+prettyPrintEntity_(a[2]))}return true}function assertNotSame(c,b,d){var a=argsWithOptionalMsg_(arguments,3);jstestdriver.assertCount++;if(isSame_(a[2],a[1])){fail(a[0]+"expected not same as "+prettyPrintEntity_(a[1])+" but was "+prettyPrintEntity_(a[2]))}return true}function isSame_(a,b){return b===a}function assertNull(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(a[1]!==null){fail(a[0]+"expected null but was "+prettyPrintEntity_(a[1]))}return true}function assertNotNull(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(a[1]===null){fail(a[0]+"expected not null but was null")}return true}function assertUndefined(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(typeof a[1]!="undefined"){fail(a[2]+"expected undefined but was "+prettyPrintEntity_(a[1]))}return true}function assertNotUndefined(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(typeof a[1]=="undefined"){fail(a[0]+"expected not undefined but was undefined")}return true}function assertNaN(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(!isNaN(a[1])){fail(a[0]+"expected to be NaN but was "+a[1])}return true}function assertNotNaN(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(isNaN(a[1])){fail(a[0]+"expected not to be NaN")}return true}function assertException(c,d,a){if(arguments.length==1){d=c;c=""}else{if(arguments.length==2){if(typeof d!="function"){a=d;d=c;c=""}else{c+=" "}}else{c+=" "}}jstestdriver.assertCount++;try{d()}catch(b){if(b.name=="AssertError"){throw b}if(a&&b.name!=a){fail(c+"expected to throw "+a+" but threw "+b.name)}return true}fail(c+"expected to throw exception")}function assertNoException(c,d){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;try{a[1]()}catch(b){fail(a[0]+"expected not to throw exception, but threw "+b.name+" ("+b.message+")")}}function assertArray(b,c){var a=argsWithOptionalMsg_(arguments,2);jstestdriver.assertCount++;if(!jstestdriver.jQuery.isArray(a[1])){fail(a[0]+"expected to be array, but was "+prettyPrintEntity_(a[1]))}}function assertTypeOf(d,b,c){var a=argsWithOptionalMsg_(arguments,3);jstestdriver.assertCount++;var e=typeof a[2];if(e!=a[1]){fail(a[0]+"expected to be "+a[1]+" but was "+e)}return true}function assertBoolean(b,c){var a=argsWithOptionalMsg_(arguments,2);return assertTypeOf(a[0],"boolean",a[1])}function assertFunction(b,c){var a=argsWithOptionalMsg_(arguments,2);return assertTypeOf(a[0],"function",a[1])}function assertObject(b,c){var a=argsWithOptionalMsg_(arguments,2);return assertTypeOf(a[0],"object",a[1])}function assertNumber(b,c){var a=argsWithOptionalMsg_(arguments,2);return assertTypeOf(a[0],"number",a[1])}function assertString(b,c){var a=argsWithOptionalMsg_(arguments,2);return assertTypeOf(a[0],"string",a[1])}function assertMatch(e,d,f){var b=argsWithOptionalMsg_(arguments,3);var c=typeof b[2]=="undefined";jstestdriver.assertCount++;var a;if(c||!b[1].test(b[2])){f=(c?a:prettyPrintEntity_(b[2]));fail(b[0]+"expected "+f+" to match "+b[1])}return true}function assertNoMatch(c,b,d){var a=argsWithOptionalMsg_(arguments,3);jstestdriver.assertCount++;if(a[1].test(a[2])){fail(a[0]+"expected "+prettyPrintEntity_(a[2])+" not to match "+a[1])}return true}function assertTagName(d,c,b){var a=argsWithOptionalMsg_(arguments,3);var e=a[2]&&a[2].tagName;if(String(e).toUpperCase()!=a[1].toUpperCase()){fail(a[0]+"expected tagName to be "+a[1]+" but was "+e)}return true}function assertClassName(g,c,b){var a=argsWithOptionalMsg_(arguments,3);var h=a[2]&&a[2].className;var d=new RegExp("(^|\\s)"+a[1]+"(\\s|$)");try{assertMatch(a[0],d,h)}catch(f){h=prettyPrintEntity_(h);fail(a[0]+"expected class name to include "+prettyPrintEntity_(a[1])+" but was "+h)}return true}function assertElementId(c,e,b){var a=argsWithOptionalMsg_(arguments,3);var d=a[2]&&a[2].id;jstestdriver.assertCount++;if(d!==a[1]){fail(a[0]+"expected id to be "+a[1]+" but was "+d)}return true}function assertInstanceOf(e,c,f){jstestdriver.assertCount++;var a=argsWithOptionalMsg_(arguments,3);var b=prettyPrintEntity_(a[2]);var d=a[1]&&a[1].name||a[1];if(a[2]==null){fail(a[0]+"expected "+b+" to be instance of "+d)}if(!(Object(a[2]) instanceof a[1])){fail(a[0]+"expected "+b+" to be instance of "+d)}return true}function assertNotInstanceOf(e,c,f){var a=argsWithOptionalMsg_(arguments,3);jstestdriver.assertCount++;if(Object(a[2]) instanceof a[1]){var d=a[1]&&a[1].name||a[1];var b=prettyPrintEntity_(a[2]);fail(a[0]+"expected "+b+" not to be instance of "+d)}return true}function assertEqualsDelta(c,b,e,d){var a=this.argsWithOptionalMsg_(arguments,4);jstestdriver.assertCount++;c=a[0];b=a[1];e=a[2];d=a[3];if(!compareDelta_(b,e,d)){this.fail(c+"expected "+d+" within "+this.prettyPrintEntity_(b)+" but was "+this.prettyPrintEntity_(e)+"")}return true}function compareDelta_(c,h,j){var k=function(l,i,n){return Math.abs(l-i)<=n};if(c===h){return true}if(typeof c=="number"||typeof h=="number"||!c||!h){return k(c,h,j)}if(isElement_(c)||isElement_(h)){return false}var g=null;var f=0;var m=0;try{if(jstestdriver.jQuery.isArray(h)){f=h.length}else{for(g in h){if(h.hasOwnProperty(g)){++f}}}if(f==0&&typeof h.length=="number"){f=h.length;for(var b=0,a=f;b<a;b++){if(!(b in h)){f=0;break}}}for(g in c){if(c.hasOwnProperty(g)){if(!compareDelta_(c[g],h[g],j)){return false}++m}}if(m!=f){return false}return m==0?c.toString()==h.toString():true}catch(d){return false}}var assert=assertTrue;jstestdriver.StreamingService=function(d,c,e,b,f,a){this.url_=d;this.now_=c;this.post_=e;this.activeResponses_={};this.finishedResponses_={};this.completeFinalResponse=null;this.synchPost_=b;this.setTimeout_=f;this.unloadSignal_=a};jstestdriver.StreamingService.prototype.synchClose=function(a){var b=new jstestdriver.CommandResponse(true,a);this.synchPost_(this.url_,b);this.unloadSignal_.set(true)};jstestdriver.StreamingService.prototype.stream=function(a,b){this.streamResponse(a,false,b)};jstestdriver.StreamingService.prototype.streamResponse=function(b,a,e){var d=new jstestdriver.CommandResponse(a,b);if(!a&&b!=null){d.responseId=this.now_();this.activeResponses_[d.responseId]=d}var c=this;this.setTimeout_(function(){c.post_(c.url_,d,e,"text/plain")},1)};jstestdriver.StreamingService.prototype.streamAcknowledged=function(b){for(var a=0;b&&b[a];a++){if(this.activeResponses_[b[a]]){this.activeResponses_[b[a]]=null;delete this.activeResponses_[b[a]];this.finishedResponses_[b[a]]=true}}if(this.completeFinalResponse){this.completeFinalResponse()}};jstestdriver.StreamingService.prototype.close=function(b,c){var a=this;this.completeFinalResponse=function(){if(a.hasOpenResponses()){a.streamResponse(null,false,c)}else{a.completeFinalResponse=null;a.activeResponses_={};a.finishedResponses_={};a.streamResponse(b,true,c);this.unloadSignal_.set(true)}};this.completeFinalResponse()};jstestdriver.StreamingService.prototype.hasOpenResponses=function(){for(var a in this.activeResponses_){if(this.activeResponses_.hasOwnProperty(a)){return true}}return false};jstestdriver.FileSource=function(b,a,c){this.fileSrc=b;this.timestamp=a;this.basePath=c};jstestdriver.FileResult=function(b,d,c,a){this.file=b;this.success=d;this.message=c;this.elapsed=a};jstestdriver.FileResult.prototype.toString=function(){return["FileResult(",this.file.fileSrc,this.success,this.message,")"].join("")};goog.require("jstestdriver");goog.provide("jstestdriver.PluginRegistrar");jstestdriver.PluginRegistrar=function(){this.plugins_=[]};jstestdriver.PluginRegistrar.PROCESS_TEST_RESULT="processTestResult";jstestdriver.PluginRegistrar.LOAD_SOURCE="loadSource";jstestdriver.PluginRegistrar.RUN_TEST="runTestConfiguration";jstestdriver.PluginRegistrar.IS_FAILURE="isFailure";jstestdriver.PluginRegistrar.GET_TEST_RUN_CONFIGURATIONS="getTestRunsConfigurationFor";jstestdriver.PluginRegistrar.ON_TESTS_START="onTestsStart";jstestdriver.PluginRegistrar.ON_TESTS_FINISH="onTestsFinish";jstestdriver.PluginRegistrar.prototype.register=function(c){if(!c.name){throw new Error("Plugins must define a name.")}var a=this.getIndexOfPlugin_(c.name);var b=1;if(a==-1){a=this.plugins_.length-1;b=0}this.plugins_.splice(a,b,c)};jstestdriver.PluginRegistrar.prototype.unregister=function(b){var a=this.getIndexOfPlugin_(b.name);if(a!=-1){this.plugins_.splice(a,1)}};jstestdriver.PluginRegistrar.prototype.getPlugin=function(b){var a=this.getIndexOfPlugin_(b);return a!=-1?this.plugins_[a]:null};jstestdriver.PluginRegistrar.prototype.getNumberOfRegisteredPlugins=function(){return this.plugins_.length};jstestdriver.PluginRegistrar.prototype.dispatch_=function(e,d){var b=this.plugins_.length;for(var a=0;a<b;a++){var c=this.plugins_[a];if(c[e]){if(c[e].apply(c,d)){return true}}}return false};jstestdriver.PluginRegistrar.prototype.getIndexOfPlugin_=function(a){var c=this.plugins_.length;for(var b=0;b<c;b++){var d=this.plugins_[b];if(d.name==a){return b}}return -1};jstestdriver.PluginRegistrar.prototype.loadSource=function(b,a){this.dispatch_(jstestdriver.PluginRegistrar.LOAD_SOURCE,arguments)};jstestdriver.PluginRegistrar.prototype.runTestConfiguration=function(a,b,c){this.dispatch_(jstestdriver.PluginRegistrar.RUN_TEST,arguments)};jstestdriver.PluginRegistrar.prototype.processTestResult=function(a){this.dispatch_(jstestdriver.PluginRegistrar.PROCESS_TEST_RESULT,arguments)};jstestdriver.PluginRegistrar.prototype.isFailure=function(a){return this.dispatch_(jstestdriver.PluginRegistrar.IS_FAILURE,arguments)};jstestdriver.PluginRegistrar.prototype.getTestRunsConfigurationFor=function(c,b,a){return this.dispatch_(jstestdriver.PluginRegistrar.GET_TEST_RUN_CONFIGURATIONS,arguments)};jstestdriver.PluginRegistrar.prototype.onTestsStart=function(){return this.dispatch_(jstestdriver.PluginRegistrar.ON_TESTS_START,[])};jstestdriver.PluginRegistrar.prototype.onTestsFinish=function(){return this.dispatch_(jstestdriver.PluginRegistrar.ON_TESTS_FINISH,[])};jstestdriver.LibLoader=function(b,c,a){this.files_=b;this.dom_=c;this.getScript_=a;this.remainingLibToLoad_=this.files_.length;this.boundOnLibLoaded_=jstestdriver.bind(this,this.onLibLoaded);this.savedDocumentWrite_=c.write;this.currentFile_=0};jstestdriver.LibLoader.prototype.load=function(a,b){if(this.files_.length==0){a(b)}else{this.dom_.write=function(){};this.onAllLibLoaded_=a;this.data_=b;this.getScript_(this.dom_,this.files_[this.currentFile_++],this.boundOnLibLoaded_)}};jstestdriver.LibLoader.prototype.onLibLoaded=function(){if(--this.remainingLibToLoad_==0){var a=this.onAllLibLoaded_;var b=this.data_;this.onAllLibLoaded_=null;this.data_=null;this.dom_.write=this.savedDocumentWrite_;a(b)}else{this.getScript_(this.dom_,this.files_[this.currentFile_++],this.boundOnLibLoaded_)}};jstestdriver.FileLoader=function(a,b){this.pluginRegistrar_=a;this.onAllFilesLoaded_=b;this.boundOnFileLoaded=jstestdriver.bind(this,this.onFileLoaded_);this.boundLoadFile_=jstestdriver.bind(this,this.onLoadFile_);this.loadedFiles_=[]};jstestdriver.FileLoader.prototype.load=function(a){this.files_=a;if(this.files_.length>0){this.loadFile_(this.files_.shift())}else{this.onAllFilesLoaded_({loadedFiles:[]})}};jstestdriver.FileLoader.prototype.loadFile_=function(a){this.pluginRegistrar_.loadSource(a,this.boundOnFileLoaded)};jstestdriver.FileLoader.prototype.onFileLoaded_=function(a){this.loadedFiles_.push(a);if(this.files_.length==0){this.onAllFilesLoaded_({loadedFiles:this.loadedFiles_})}else{this.loadFile_(this.files_.shift())}};goog.provide("jstestdriver.TestRunFilter");goog.require("jstestdriver");jstestdriver.TestRunFilter=function(a){this.testCaseInfo_=a};jstestdriver.TestRunFilter.prototype.getDefaultTestRunConfiguration=function(){return this.createTestRunConfiguration_(this.testCaseInfo_.getTestNames())};jstestdriver.TestRunFilter.prototype.getTestRunConfigurationFor=function(e){var d=this.filter_(e,this.regexMatcher_(/^[^-].*/));if(d.length<1){d.push("all")}var c=this.filter_(e,this.regexMatcher_(/^-.*/));var b=this.buildTestMethodMap_();var f=this.getExcludedTestIds_(b,c);var a=this.getMatchedTests_(b,d,f);return a.length>0?this.createTestRunConfiguration_(a):null};jstestdriver.TestRunFilter.prototype.createTestRunConfiguration_=function(a){return new jstestdriver.TestRunConfiguration(this.testCaseInfo_,a)};jstestdriver.TestRunFilter.prototype.regexMatcher_=function(a){return function(b){return a.test(b)}};jstestdriver.TestRunFilter.prototype.buildTestMethodMap_=function(){var a={};var d=this.testCaseInfo_.getTestNames();var e=d.length;for(var c=0;c<e;++c){var b=d[c];if(this.isTestMethod_(b)){a[this.buildTestMethodId_(b)]=b}}return a};jstestdriver.TestRunFilter.prototype.isTestMethod_=function(a){return/^test.*/.test(a)};jstestdriver.TestRunFilter.prototype.buildTestMethodId_=function(a){return this.testCaseInfo_.getTestCaseName()+"#"+a};jstestdriver.TestRunFilter.prototype.filter_=function(c,d){var a=[];for(var b=0;b<c.length;++b){if(d(c[b])){a.push(c[b])}}return a};jstestdriver.TestRunFilter.prototype.getExcludedTestIds_=function(a,b){var f={};for(var c=0;c<b.length;++c){var g=b[c].substring(1);var e=new RegExp(g);for(var d in a){if(e.test(d)){f[d]=true}}}return f};jstestdriver.TestRunFilter.prototype.getMatchedTests_=function(b,c,g){var a=[];for(var d=0;d<c.length;d++){var h=c[d];if(h=="all"){h=".*"}var f=new RegExp(h);for(var e in b){if(f.test(e)&&!g[e]){a.push(b[e])}}}return a};goog.provide("jstestdriver.TestCaseInfo");goog.require("jstestdriver");goog.require("jstestdriver.TestRunFilter");jstestdriver.TestCaseInfo=function(d,b,c,a){this.testCaseName_=d;this.template_=b;this.type_=c||jstestdriver.TestCaseInfo.DEFAULT_TYPE;this.fileName_=a||""};jstestdriver.TestCaseInfo.DEFAULT_TYPE="default";jstestdriver.TestCaseInfo.ASYNC_TYPE="async";jstestdriver.TestCaseInfo.prototype.testCaseName_;jstestdriver.TestCaseInfo.prototype.template_;jstestdriver.TestCaseInfo.prototype.type_;jstestdriver.TestCaseInfo.prototype.fileName_;jstestdriver.TestCaseInfo.prototype.getType=function(){return this.type_};jstestdriver.TestCaseInfo.prototype.getFileName=function(){return this.fileName_};jstestdriver.TestCaseInfo.prototype.setFileName=function(a){this.fileName_=a};jstestdriver.TestCaseInfo.prototype.getTestCaseName=function(){return this.testCaseName_};jstestdriver.TestCaseInfo.prototype.getTemplate=function(){return this.template_};jstestdriver.TestCaseInfo.prototype.getTestNames=function(){var b=[];for(var a in this.template_.prototype){if(a.indexOf("test")==0){b.push(a)}}return b};jstestdriver.TestCaseInfo.prototype.getDefaultTestRunConfiguration=function(){return new jstestdriver.TestRunFilter(this).getDefaultTestRunConfiguration()};jstestdriver.TestCaseInfo.prototype.getTestRunConfigurationFor=function(a){return new jstestdriver.TestRunFilter(this).getTestRunConfigurationFor(a)};jstestdriver.TestCaseInfo.prototype.equals=function(a){return(!!a)&&typeof a.getTestCaseName!="undefined"&&a.getTestCaseName()==this.testCaseName_};jstestdriver.TestCaseInfo.prototype.toString=function(){return"TestCaseInfo("+this.testCaseName_+","+this.template_+","+this.type_+")"};goog.provide("jstestdriver.TestResult");goog.require("jstestdriver");jstestdriver.TestResult=function(h,c,b,e,d,g,a,f){this.testCaseName=h;this.testName=c;this.result=b;this.message=e;this.log=d;this.time=g;this.data=a||{};this.argument=f};jstestdriver.TestResult.RESULT={PASSED:"passed",ERROR:"error",FAILED:"failed"};goog.provide("jstestdriver.TestRunConfiguration");goog.require("jstestdriver");goog.require("jstestdriver.TestCaseInfo");jstestdriver.TestRunConfiguration=function(a,b,c){this.testCaseInfo_=a;this.tests_=b;this.arguments_=c?c:null};jstestdriver.TestRunConfiguration.prototype.getTestCaseInfo=function(){return this.testCaseInfo_};jstestdriver.TestRunConfiguration.prototype.getTests=function(){return this.tests_};jstestdriver.TestRunConfiguration.prototype.getArguments=function(){return this.arguments_};goog.require("jstestdriver");goog.provide("jstestdriver.TestCaseManager");jstestdriver.TestCaseManager=function(a){this.testCasesInfo_=[];this.fileToTestCaseMap_={};this.testCaseToFileMap_={};this.latestTestCaseInfo_=null;this.pluginRegistrar_=a;this.recentCases_=[]};jstestdriver.TestCaseManager.prototype.add=function(b){var a=this.indexOf_(b);if(a!=-1){throw new Error("duplicate test case names! On "+b+" and "+this.testCasesInfo_[a]+" in "+this.testCasesInfo_[a].getFileName())}else{this.testCasesInfo_.push(b);this.recentCases_.push(b)}};jstestdriver.TestCaseManager.prototype.updateLatestTestCase=function(a){if(this.recentCases_.length){this.fileToTestCaseMap_[a]=this.recentCases_;for(var b=0;this.recentCases_[b];b++){this.recentCases_[b].setFileName(a)}this.recentCases_=[]}};jstestdriver.TestCaseManager.prototype.removeTestCaseForFilename=function(a){var b=this.fileToTestCaseMap_[a]||[];this.fileToTestCaseMap_[a]=null;delete this.fileToTestCaseMap_[a];while(b.length){this.removeTestCase_(this.indexOf_(b.pop()))}};jstestdriver.TestCaseManager.prototype.removeTestCase_=function(b){var a=this.testCasesInfo_.splice(b,1)};jstestdriver.TestCaseManager.prototype.indexOf_=function(a){var c=this.testCasesInfo_.length;for(var b=0;b<c;b++){var d=this.testCasesInfo_[b];if(d.equals(a)){return b}}return -1};jstestdriver.TestCaseManager.prototype.getDefaultTestRunsConfiguration=function(){var a=[];var d=this.testCasesInfo_.length;for(var c=0;c<d;c++){var b=this.testCasesInfo_[c];a.push(b.getDefaultTestRunConfiguration())}return a};jstestdriver.TestCaseManager.prototype.getTestRunsConfigurationFor=function(b){var a=[];this.pluginRegistrar_.getTestRunsConfigurationFor(this.testCasesInfo_,b,a);return a};jstestdriver.TestCaseManager.prototype.getTestCasesInfo=function(){return this.testCasesInfo_};jstestdriver.TestCaseManager.prototype.getCurrentlyLoadedTestCases=function(){var d=[];var c=this.testCasesInfo_.length;for(var b=0;b<c;b++){var a=this.testCasesInfo_[b];d.push({"name":a.getTestCaseName(),"tests":a.getTestNames()})}return{numTests:d.length,testCases:d}};jstestdriver.TestCaseManager.prototype.getCurrentlyLoadedTestCasesFor=function(g){var b=this.getTestRunsConfigurationFor(g);var e=b.length;var h=[];for(var d=0;d<e;d++){var a=b[d];var c=a.getTestCaseInfo();var f=a.getTests();h.push({"name":c.getTestCaseName(),"tests":c.getTestNames(),"fileName":c.getFileName()})}return{numTests:h.length,testCases:h}};jstestdriver.TestCaseManager.prototype.getCurrentlyLoadedTest=function(){var h=[];var e=this.testCasesInfo_.length;for(var d=0;d<e;d++){var b=this.testCasesInfo_[d];var g=b.getTestCaseName();var f=b.getTestNames();var c=f.length;for(var a=0;a<c;a++){h.push(g+"."+f[a])}}return{numTests:h.length,testNames:h}};jstestdriver.TestCaseManager.prototype.getCurrentlyLoadedTestFor=function(g){var l=this.getTestRunsConfigurationFor(g);var m=l.length;var f=[];for(var e=0;e<m;e++){var k=l[e];var b=k.getTestCaseInfo().getTestCaseName();var a=k.getTests();var d=a.length;for(var c=0;c<d;c++){var h=a[c];f.push(b+"."+h)}}return{numTests:f.length,testNames:f}};goog.require("jstestdriver");goog.require("jstestdriver.TestCaseInfo");goog.provide("jstestdriver.TestCaseBuilder");jstestdriver.TestCaseBuilder=function(a){this.testCaseManager_=a};jstestdriver.TestCaseBuilder.prototype.TestCase=function(d,a,c){this.checkNotBeginsWith_(d,"-");this.checkNotContains_(d,",");this.checkNotContains_(d,"#");var b=function(){};if(a){b.prototype=a}if(typeof b.prototype.setUp=="undefined"){b.prototype.setUp=function(){}}if(!b.prototype.hasOwnProperty("toString")){b.prototype.toString=function(){return"TestCase("+d+")"}}if(typeof b.prototype.tearDown=="undefined"){b.prototype.tearDown=function(){}}this.testCaseManager_.add(new jstestdriver.TestCaseInfo(d,b,c));return b};jstestdriver.TestCaseBuilder.prototype.checkNotBeginsWith_=function(b,a){if(b.indexOf(a)==0){throw new Error("Test case names must not begin with '"+a+"'")}};jstestdriver.TestCaseBuilder.prototype.checkNotContains_=function(b,a){if(b.indexOf(a)>-1){throw new Error("Test case names must not contain '"+a+"'")}};jstestdriver.TestCaseBuilder.prototype.AsyncTestCase=function(b,a){return this.TestCase(b,a,jstestdriver.TestCaseInfo.ASYNC_TYPE)};jstestdriver.TestCaseBuilder.prototype.ConditionalTestCase=function(c,d,a,b){if(d()){return this.TestCase(c,a,b)}this.testCaseManager_.add(new jstestdriver.TestCaseInfo(c,jstestdriver.TestCaseBuilder.PlaceHolderCase,b));return function(){}};jstestdriver.TestCaseBuilder.prototype.ConditionalAsyncTestCase=function(b,c,a){return this.ConditionalTestCase(b,c,a,jstestdriver.TestCaseInfo.ASYNC_TYPE)};jstestdriver.TestCaseBuilder.PlaceHolderCase=function(){};jstestdriver.TestCaseBuilder.PlaceHolderCase.prototype.testExcludedByCondition=jstestdriver.EMPTY_FUNC;jstestdriver.TestRunner=function(a){this.pluginRegistrar_=a;this.boundRunNextConfiguration_=jstestdriver.bind(this,this.runNextConfiguration_)};jstestdriver.TestRunner.prototype.runTests=function(a,c,d,b){this.pluginRegistrar_.onTestsStart();this.testRunsConfiguration_=a;this.onTestDone_=c;this.onComplete_=d;this.captureConsole_=b;this.runNextConfiguration_()};jstestdriver.TestRunner.prototype.finish_=function(){var a=this.onComplete_;this.pluginRegistrar_.onTestsFinish();this.testRunsConfiguration_=null;this.onTestDone_=null;this.onComplete_=null;this.captureConsole_=false;a()};jstestdriver.TestRunner.prototype.runNextConfiguration_=function(){if(this.testRunsConfiguration_.length==0){this.finish_();return}this.runConfiguration(this.testRunsConfiguration_.shift(),this.onTestDone_,this.boundRunNextConfiguration_)};jstestdriver.TestRunner.prototype.runConfiguration=function(c,b,d){var a=this;if(a.captureConsole_){a.overrideConsole_()}jstestdriver.log("running configuration "+c);this.pluginRegistrar_.runTestConfiguration(c,b,function(){if(a.captureConsole_){a.resetConsole_()}d.apply(this,arguments)})};jstestdriver.TestRunner.prototype.overrideConsole_=function(){this.logMethod_=console.log;this.logDebug_=console.debug;this.logInfo_=console.info;this.logWarn_=console.warn;this.logError_=console.error;console.log=function(){jstestdriver.console.log.apply(jstestdriver.console,arguments)};console.debug=function(){jstestdriver.console.debug.apply(jstestdriver.console,arguments)};console.info=function(){jstestdriver.console.info.apply(jstestdriver.console,arguments)};console.warn=function(){jstestdriver.console.warn.apply(jstestdriver.console,arguments)};console.error=function(){jstestdriver.console.error.apply(jstestdriver.console,arguments)}};jstestdriver.TestRunner.prototype.resetConsole_=function(){console.log=this.logMethod_;console.debug=this.logDebug_;console.info=this.logInfo_;console.warn=this.logWarn_;console.error=this.logError_};jstestdriver.TestRunner.TestCaseMap=function(){this.testCases_={}};jstestdriver.TestRunner.TestCaseMap.prototype.startCase=function(a){this.testCases_[a]=true};jstestdriver.TestRunner.TestCaseMap.prototype.stopCase=function(a){this.testCases_[a]=false};jstestdriver.TestRunner.TestCaseMap.prototype.hasActiveCases=function(){for(var a in this.testCases_){if(this.testCases_.hasOwnProperty(a)&&this.testCases_[a]){return true}}return false};jstestdriver.testBreather=function(c,a){var d=new Date();function b(f){var e=new Date();if((e-d)>a){c(f,1);d=e}else{f()}}return b};jstestdriver.TIMEOUT=500;jstestdriver.NOOP_COMMAND={command:"noop",parameters:[]};jstestdriver.CommandExecutor=function(c,h,g,b,d,e,f,a){this.streamingService_=c;this.__testCaseManager=h;this.__testRunner=g;this.__pluginRegistrar=b;this.__boundExecuteCommand=jstestdriver.bind(this,this.executeCommand);this.__boundExecute=jstestdriver.bind(this,this.execute);this.__boundEvaluateCommand=jstestdriver.bind(this,this.evaluateCommand);this.boundOnFileLoaded_=jstestdriver.bind(this,this.onFileLoaded);this.boundOnFileLoadedRunnerMode_=jstestdriver.bind(this,this.onFileLoadedRunnerMode);this.commandMap_={};this.testsDone_=[];this.debug_=false;this.now_=d;this.lastTestResultsSent_=0;this.getBrowserInfo=e;this.currentActionSignal_=f;this.currentCommand=null;this.unloadSignal_=a};jstestdriver.CommandExecutor.prototype.executeCommand=function(b){var f;if(b&&b.length){f=jsonParse(b)}else{f=jstestdriver.NOOP_COMMAND}this.currentCommand=f.command;jstestdriver.log("current command "+f.command);try{this.unloadSignal_.set(false);this.commandMap_[f.command](f.parameters)}catch(d){var c="Exception "+d.name+": "+d.message+"\n"+d.fileName+"("+d.lineNumber+"):\n"+d.stack;var a=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.LOG,jstestdriver.JSON.stringify(new jstestdriver.BrowserLog(1000,"jstestdriver.CommandExecutor",c,this.getBrowserInfo())),this.getBrowserInfo());if(top.console&&top.console.log){top.console.log(c)}this.streamingService_.close(a,this.__boundExecuteCommand);this.unloadSignal_.set(true);throw d}};jstestdriver.CommandExecutor.prototype.execute=function(b){var a=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.COMMAND_RESULT,JSON.stringify(this.__boundEvaluateCommand(b)),this.getBrowserInfo());this.streamingService_.close(a,this.__boundExecuteCommand)};jstestdriver.CommandExecutor.prototype.evaluateCommand=function(cmd){var res="";try{var evaluatedCmd=eval("("+cmd+")");if(evaluatedCmd){res=evaluatedCmd.toString()}}catch(e){res="Exception "+e.name+": "+e.message+"\n"+e.fileName+"("+e.lineNumber+"):\n"+e.stack}return res};jstestdriver.CommandExecutor.prototype.registerCommand=function(a,b,c){this.commandMap_[a]=jstestdriver.bind(b,c)};jstestdriver.CommandExecutor.prototype.registerTracedCommand=function(a,b,d){var c=jstestdriver.bind(b,d);var e=this.currentActionSignal_;this.commandMap_[a]=function(){e.set(a);return c.apply(null,arguments)}};jstestdriver.CommandExecutor.prototype.dryRun=function(){var a=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.TEST_QUERY_RESULT,JSON.stringify(this.__testCaseManager.getCurrentlyLoadedTestCases()),this.getBrowserInfo());this.streamingService_.close(a,this.__boundExecuteCommand)};jstestdriver.CommandExecutor.prototype.dryRunFor=function(b){var d=jsonParse('{"expressions":'+b[0]+"}").expressions;var c=JSON.stringify(this.__testCaseManager.getCurrentlyLoadedTestCasesFor(d));var a=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.TEST_QUERY_RESULT,c,this.getBrowserInfo());this.streamingService_.close(a,this.__boundExecuteCommand)};jstestdriver.CommandExecutor.prototype.listen=function(b){var a;if(window.location.href.search("refresh")!=-1){a=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.RESET_RESULT,'{"loadedFiles":'+JSON.stringify(b)+"}",this.getBrowserInfo(),true);jstestdriver.log("Runner reset: "+window.location.href)}else{jstestdriver.log("Listen: "+window.location.href);a=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.BROWSER_READY,'{"loadedFiles":'+JSON.stringify(b)+"}",this.getBrowserInfo(),true)}this.streamingService_.close(a,this.__boundExecuteCommand)};jstestdriver.ManualScriptLoader=function(c,b,a){this.win_=c;this.testCaseManager_=b;this.now_=a;this.onFileLoaded_=null;this.started_=-1;this.file_=null;this.fileMap_={};this.errorHandler_=this.createErrorHandler()};jstestdriver.ManualScriptLoader.prototype.beginLoad=function(a,b){this.fileMap_[a.fileSrc]=a;this.testCaseManager_.removeTestCaseForFilename(a.fileSrc);this.file_=a;this.win_.onerror=this.errorHandler_;this.started_=this.now_();this.onFileLoaded_=b;jstestdriver.log("loading "+a.fileSrc)};jstestdriver.ManualScriptLoader.prototype.endLoad=function(c){var b=this.now_()-this.started_;if(b>50){jstestdriver.log("slow load "+this.file_.fileSrc+" in "+b)}this.testCaseManager_.updateLatestTestCase(c.fileSrc);var a=new jstestdriver.FileResult(c,true,"",this.now_()-this.started_);this.onFileLoaded_(a)};jstestdriver.ManualScriptLoader.prototype.createErrorHandler=function(){var a=this;return function(i,e,d){var h=e.indexOf("/test/");var f=h>-1?e.substr(h,e.length-h):e;var g=a.fileMap_[f];jstestdriver.log("failed load "+f+" in "+(a.now_()-a.started_));var c=a.started_;a.started_=-1;var b="error loading file: "+f;if(d!=undefined&&d!=null){b+=":"+d}if(i!=undefined&&i!=null){b+=": "+i}a.win_.onerror=jstestdriver.EMPTY_FUNC;a.onFileLoaded_(new jstestdriver.FileResult(g,false,b,a.now_()-c))}};jstestdriver.ManualResourceTracker=function(e,d,b,c,a){this.parse_=e;this.serialize_=d;this.getBrowserInfo_=c;this.manualScriptLoader_=a;this.boundOnComplete_=jstestdriver.bind(this,this.onComplete_);this.results_=[];this.resultsIndexMap_={}};jstestdriver.ManualResourceTracker.prototype.startResourceLoad=function(a){var b=this.parse_(a);this.manualScriptLoader_.beginLoad(b,this.boundOnComplete_)};jstestdriver.ManualResourceTracker.prototype.onComplete_=function(b){var c=b.file.fileSrc;var a=this.resultsIndexMap_[c];if(a!=null){if(!b.success){this.results_[a]=b}}else{this.resultsIndexMap_[c]=this.results_.push(b)-1}};jstestdriver.ManualResourceTracker.prototype.finishResourceLoad=function(a){var b=this.parse_(a);this.manualScriptLoader_.endLoad(b)};jstestdriver.ManualResourceTracker.prototype.getResults=function(){return this.results_};jstestdriver.StandAloneLoadTestsCommand=function(e,b,d,f,a,c){this.jsonParse_=e;this.pluginRegistrar_=b;this.boundOnFileLoaded_=jstestdriver.bind(this,this.onFileLoaded);this.getBrowserInfo=d;this.onLoadComplete_=f;this.reporter_=a;this.now_=c};jstestdriver.StandAloneLoadTestsCommand.prototype.loadTest=function(c){var d=c[0];var b=this.jsonParse_('{"f":'+d+"}").f;this.removeScripts(document,b);var a=new jstestdriver.FileLoader(this.pluginRegistrar_,this.boundOnFileLoaded_);this.reporter_.startLoading(this.now_());a.load(b)};jstestdriver.StandAloneLoadTestsCommand.prototype.onFileLoaded=function(a){this.reporter_.addLoadedFileResults(a.loadedFiles);var b=new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.FILE_LOAD_RESULT,JSON.stringify(a),this.getBrowserInfo());this.reporter_.finishLoading(this.now_());this.onLoadComplete_(b)};jstestdriver.StandAloneLoadTestsCommand.prototype.findScriptTagsToRemove_=function(e,l){var c=e.getElementsByTagName("script");var a=l.length;var k=c.length;var b=[];for(var g=0;g<a;g++){var h=l[g].fileSrc;for(var d=0;d<k;d++){var m=c[d];if(m.src.indexOf(h)!=-1){b.push(m);break}}}return b};jstestdriver.StandAloneLoadTestsCommand.prototype.removeScriptTags_=function(e,f){var d=e.getElementsByTagName("head")[0];var c=f.length;for(var b=0;b<c;b++){var a=f[b];d.removeChild(a)}};jstestdriver.StandAloneLoadTestsCommand.prototype.removeScripts=function(b,a){this.removeScriptTags_(b,this.findScriptTagsToRemove_(b,a))};jstestdriver.StandAloneRunTestsCommand=function(g,f,h,i,e,c,d,a,b){this.testCaseManager_=g;this.testRunner_=f;this.pluginRegistrar_=h;this.jsonParse_=d;this.now_=c;this.boundOnTestDone_=jstestdriver.bind(this,this.onTestDone_);this.boundOnComplete_=jstestdriver.bind(this,this.onComplete);this.testsDone_=[];this.getBrowserInfo_=i;this.reporter_=e;this.streamContinue_=a;this.streamStop_=b};jstestdriver.StandAloneRunTestsCommand.prototype.createLog_=function(a){return new jstestdriver.BrowserLog(0,"jstestdriver.StandAloneRunTestsCommand",a,this.getBrowserInfo_())};jstestdriver.StandAloneRunTestsCommand.prototype.runAllTests=function(b){this.streamContinue_(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.LOG,jstestdriver.JSON.stringify(this.createLog_("all tests started.")),this.getBrowserInfo_()));var a=b[0];this.debug_=Boolean(b[2]);this.runTestCases_(this.testCaseManager_.getDefaultTestRunsConfiguration(),a=="true"?true:false)};jstestdriver.StandAloneRunTestsCommand.prototype.runTests=function(b){this.streamContinue_(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.LOG,jstestdriver.JSON.stringify(this.createLog_("started tests.")),this.getBrowserInfo_()));var c=jsonParse('{"expressions":'+b[0]+"}").expressions;var a=b[1];this.debug_=Boolean(b[2]);this.runTestCases_(this.testCaseManager_.getTestRunsConfigurationFor(c),a=="true"?true:false,false)};jstestdriver.StandAloneRunTestsCommand.prototype.runTestCases_=function(a,b){this.reporter_.startTests(this.now_());this.totaltestruns_=a.length;this.testRunner_.runTests(a,this.boundOnTestDone_,this.boundOnComplete_,b)};jstestdriver.StandAloneRunTestsCommand.prototype.onTestDone_=function(a){this.reporter_.updateIsSuccess(a.result==jstestdriver.TestResult.RESULT.PASSED);this.addTestResult(a)};jstestdriver.StandAloneRunTestsCommand.prototype.onComplete=function(){var a=jstestdriver.JSON.stringify(this.testsDone_);this.streamContinue_(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.TEST_RESULT,a,this.getBrowserInfo_()));this.reporter_.setReport(a);this.testsDone_=[];this.reporter_.finishTests(this.now_());this.reporter_.setIsFinished(true);this.streamStop_(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.LOG,jstestdriver.JSON.stringify(this.createLog_("testing complete, isSuccess:"+this.reporter_.isSuccess()+", isFinished:"+this.reporter_.isFinished())),this.getBrowserInfo_()))};jstestdriver.StandAloneRunTestsCommand.prototype.addTestResult=function(a){this.reporter_.addTestResult(a);this.pluginRegistrar_.processTestResult(a);this.testsDone_.push(a)};jstestdriver.NoopCommand=function(a,b){this.streamStop_=a;this.streamStop_=a;this.getBrowserInfo_=b};jstestdriver.NoopCommand.prototype.sendNoop=function(){this.streamStop_(new jstestdriver.Response(jstestdriver.RESPONSE_TYPES.NOOP,"{}",this.getBrowserInfo_()))};jstestdriver.StandAloneTestReporter=function(){this.finished_=false;this.success_=1;this.report_="";this.filesLoaded_=0;this.lastTestResult_="none"};jstestdriver.StandAloneTestReporter.prototype.isFinished=function(){return this.finished_};jstestdriver.StandAloneTestReporter.prototype.startTests=function(a){};jstestdriver.StandAloneTestReporter.prototype.finishTests=function(a){};jstestdriver.StandAloneTestReporter.prototype.startLoading=function(a){};jstestdriver.StandAloneTestReporter.prototype.finishLoading=function(a){};jstestdriver.StandAloneTestReporter.prototype.getReport=function(){return this.report_};jstestdriver.StandAloneTestReporter.prototype.getNumFilesLoaded=function(){return this.filesLoaded_};jstestdriver.StandAloneTestReporter.prototype.setIsFinished=function(a){this.log("finished: "+a+": success"+this.success_);this.finished_=a};jstestdriver.StandAloneTestReporter.prototype.log=function(a){};jstestdriver.StandAloneTestReporter.prototype.setIsSuccess=function(a){this.log("success"+this.success_);this.success_=a};jstestdriver.StandAloneTestReporter.prototype.addTestResult=function(a){this.lastTestResult_=a.testCaseName+"."+a.testName+" "+a.result;this.log("testresult: "+this.lastTestResult_)};jstestdriver.StandAloneTestReporter.prototype.isSuccess=function(){return !!this.success_};jstestdriver.StandAloneTestReporter.prototype.updateIsSuccess=function(a){if(this!=window.top.G_testRunner){window.top.G_testRunner=this}this.success_=a&this.success_;this.log("success"+this.success_)};jstestdriver.StandAloneTestReporter.prototype.setReport=function(a){this.report_=a};jstestdriver.StandAloneTestReporter.prototype.addLoadedFileResults=function(a){var b=a.length;this.log("files loaded: "+b);if(this!=window.top.G_testRunner){window.top.G_testRunner=this}this.filesLoaded_+=b};jstestdriver.StandAloneTestReporter.prototype.toString=function(){return"StandAloneTestReporter(success=["+this.success_+"], finished=["+this.finished_+"], lastTestResult=["+this.lastTestResult_+"], filesLoaded=["+this.filesLoaded_+"] report=["+this.report_+"])"};jstestdriver.config=(function(b){var a=b||{};a.createRunner=function(h,f){var g=f||jstestdriver.plugins.defaultRunTestLoop;jstestdriver.pluginRegistrar=new jstestdriver.PluginRegistrar();jstestdriver.testCaseManager=new jstestdriver.TestCaseManager(jstestdriver.pluginRegistrar);jstestdriver.testRunner=new jstestdriver.TestRunner(jstestdriver.pluginRegistrar);jstestdriver.testCaseBuilder=new jstestdriver.TestCaseBuilder(jstestdriver.testCaseManager);jstestdriver.global.TestCase=jstestdriver.bind(jstestdriver.testCaseBuilder,jstestdriver.testCaseBuilder.TestCase);jstestdriver.global.AsyncTestCase=jstestdriver.bind(jstestdriver.testCaseBuilder,jstestdriver.testCaseBuilder.AsyncTestCase);jstestdriver.global.ConditionalTestCase=jstestdriver.bind(jstestdriver.testCaseBuilder,jstestdriver.testCaseBuilder.ConditionalTestCase);jstestdriver.global.ConditionalAsyncTestCase=jstestdriver.bind(jstestdriver.testCaseBuilder,jstestdriver.testCaseBuilder.ConditionalAsyncTestCase);var c=new jstestdriver.plugins.ScriptLoader(window,document,jstestdriver.testCaseManager,jstestdriver.now);var k=new jstestdriver.plugins.StylesheetLoader(window,document,jstestdriver.jQuery.browser.mozilla||jstestdriver.jQuery.browser.safari);var i=new jstestdriver.plugins.FileLoaderPlugin(c,k,jstestdriver.now);var e=new jstestdriver.plugins.TestRunnerPlugin(Date,function(){jstestdriver.log(jstestdriver.jQuery("body")[0].innerHTML);jstestdriver.jQuery("body").children().remove();jstestdriver.jQuery(document).unbind();jstestdriver.jQuery(document).die()},jstestdriver.pluginRegistrar,jstestdriver.utils.serializeErrors,g);jstestdriver.pluginRegistrar.register(new jstestdriver.plugins.DefaultPlugin(i,e,new jstestdriver.plugins.AssertsPlugin(),new jstestdriver.plugins.TestCaseManagerPlugin()));jstestdriver.pluginRegistrar.register(new jstestdriver.plugins.async.AsyncTestRunnerPlugin(Date,function(){jstestdriver.jQuery("body").children().remove();jstestdriver.jQuery(document).unbind();jstestdriver.jQuery(document).die()},jstestdriver.utils.serializeErrors));jstestdriver.testCaseManager.TestCase=jstestdriver.global.TestCase;var d=parseInt(jstestdriver.extractId(top.location.toString()));function j(){return new jstestdriver.BrowserInfo(d)}jstestdriver.manualResourceTracker=new jstestdriver.ManualResourceTracker(jstestdriver.JSON.parse,jstestdriver.JSON.stringify,jstestdriver.pluginRegistrar,j,new jstestdriver.ManualScriptLoader(window,jstestdriver.testCaseManager,jstestdriver.now));return jstestdriver.executor=h(jstestdriver.testCaseManager,jstestdriver.testRunner,jstestdriver.pluginRegistrar,jstestdriver.now,window.location.toString(),j,d)};a.createExecutor=function(d,t,k,f,c,u,r){var g=jstestdriver.createPath(top.location.toString(),jstestdriver.SERVER_URL+r);var n=new jstestdriver.Signal(false);var p=new jstestdriver.StreamingService(g,f,jstestdriver.createAsynchPost(jstestdriver.jQuery),jstestdriver.createSynchPost(jstestdriver.jQuery),jstestdriver.setTimeout,n);var j=new jstestdriver.Signal(null);var e=new jstestdriver.CommandExecutor(p,d,t,k,f,u,j,n);var s=jstestdriver.bind(e,e.executeCommand);function h(x){p.close(x,s)}function m(x){p.stream(x,s)}var w=new jstestdriver.LoadTestsCommand(jsonParse,k,u,h);var v=new jstestdriver.RunTestsCommand(d,t,k,u,jstestdriver.now,jsonParse,m,h);var i=new jstestdriver.ResetCommand(window.location,n,jstestdriver.now);var q=new jstestdriver.NoopCommand(h,u);e.registerCommand("execute",e,e.execute);e.registerCommand("noop",q,q.sendNoop);e.registerCommand("runAllTests",v,v.runAllTests);e.registerCommand("runTests",v,v.runTests);e.registerCommand("loadTest",w,w.loadTest);e.registerCommand("reset",i,i.reset);e.registerCommand("dryRun",e,e.dryRun);e.registerCommand("dryRunFor",e,e.dryRunFor);e.registerCommand("unknownBrowser",null,function(){});e.registerCommand("stop",null,function(){if(window.console&&window.console.log){window.console.log("Stopping executor by server request.")}});e.registerCommand("streamAcknowledged",p,p.streamAcknowledged);function l(){return j.get()}var o=new jstestdriver.PageUnloadHandler(p,u,l,n);jstestdriver.jQuery(window).bind("unload",jstestdriver.bind(o,o.onUnload));jstestdriver.jQuery(window).bind("beforeunload",jstestdriver.bind(o,o.onUnload));window.onbeforeunload=jstestdriver.bind(o,o.onUnload);return e};a.createVisualExecutor=function(h,g,d,e,c,f,i){return a.createStandAloneExecutorWithReporter(h,g,d,e,c,new jstestdriver.VisualTestReporter(function(j){return document.createElement(j)},function(j){return document.body.appendChild(j)},jstestdriver.jQuery,JSON.parse),f,i)};a.createStandAloneExecutor=function(h,g,d,e,c,f,i){return a.createStandAloneExecutorWithReporter(h,g,d,e,c,new jstestdriver.StandAloneTestReporter(),f,i)};a.createStandAloneExecutorWithReporter=function(d,q,j,f,c,p,r,n){var g=jstestdriver.createPath(top.location.toString(),jstestdriver.SERVER_URL+n);var l=new jstestdriver.Signal(false);var m=new jstestdriver.StreamingService(g,f,jstestdriver.convertToJson(jstestdriver.jQuery.post),jstestdriver.createSynchPost(jstestdriver.jQuery),jstestdriver.setTimeout,l);window.top.G_testRunner=p;jstestdriver.reporter=p;var i=new jstestdriver.Signal(null);var e=new jstestdriver.CommandExecutor(m,d,q,j,f,r,i,l);var o=jstestdriver.bind(e,e.executeCommand);function h(u){m.close(u,o)}function k(u){m.stream(u,o)}var t=new jstestdriver.StandAloneLoadTestsCommand(jsonParse,j,r,h,p,jstestdriver.now);var s=new jstestdriver.StandAloneRunTestsCommand(d,q,j,r,p,f,jsonParse,k,h);e.registerTracedCommand("execute",e,e.execute);e.registerTracedCommand("noop",null,h);e.registerTracedCommand("runAllTests",s,s.runAllTests);e.registerTracedCommand("runTests",s,s.runTests);e.registerTracedCommand("loadTest",t,t.loadTest);e.registerTracedCommand("reset",e,e.reset);e.registerTracedCommand("dryRun",e,e.dryRun);e.registerTracedCommand("dryRunFor",e,e.dryRunFor);e.registerCommand("streamAcknowledged",m,m.streamAcknowledged);e.registerCommand("unknownBrowser",null,function(){});e.registerCommand("stop",null,function(){if(window.console&&window.console.log){window.console.log("Stopping executor by server request.")}});return e};return a})(jstestdriver.config);/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

/**
 * @fileoverview Defines the FiniteUseCallback class, which decorates a
 * Javascript function by notifying the test runner about any exceptions thrown
 * when the function executes.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.CatchingCallback');

goog.require('jstestdriver');

/**
 * Constructs a CatchingCallback.
 *
 * @param {Object} testCase the testCase to use as 'this' when calling the
 *    wrapped function.
 * @param {jstestdriver.plugins.async.CallbackPool} pool the pool to which this
 *    callback belongs.
 * @param {Function} wrapped the wrapped callback function.
 * @constructor
 */
jstestdriver.plugins.async.CatchingCallback = function(
    testCase, pool, wrapped) {
  this.testCase_ = testCase;
  this.pool_ = pool;
  this.callback_ = wrapped;
};


/**
 * Invokes the wrapped callback, catching any exceptions and reporting the
 * status to the pool.
 * @return {*} The return value of the original callback.
 */
jstestdriver.plugins.async.CatchingCallback.prototype.invoke = function() {
  var result;
  var message;
  try {
    result = this.callback_.apply(this.testCase_, arguments);
    message = 'success.';
    return result;
  } catch (e) {
    this.pool_.onError(e);
    message = 'failure: ' + e;
    throw e;
  } finally {
    this.pool_.remove(message);
  }
};
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the ExpiringCallback class, which decorates a
 * Javascript function by restricting the length of time the asynchronous system
 * may delay before calling the function.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.ExpiringCallback');

goog.require('jstestdriver');

/**
 * Constructs an ExpiringCallback.
 *
 * @param {jstestdriver.plugins.async.CallbackPool} pool The pool to which this
 *     callback belongs.
 * @param {jstestdriver.plugins.async.FiniteUseCallback} callback A
 *     FiniteUseCallback.
 * @param {jstestdriver.plugins.async.Timeout} timeout A Timeout object.
 * @param {string} stepDescription A description of the current test step.
 * @constructor
 */
jstestdriver.plugins.async.ExpiringCallback = function(
    pool, callback, timeout, stepDescription, callbackDescription) {
  this.pool_ = pool;
  this.callback_ = callback;
  this.timeout_ = timeout;
  this.stepDescription_ = stepDescription;
  this.callbackDescription_ = callbackDescription;
};


/**
 * Arms this callback to expire after the given delay.
 *
 * @param {number} delay The amount of time (ms) before this callback expires.
 */
jstestdriver.plugins.async.ExpiringCallback.prototype.arm = function(delay) {
  var callback = this;
  this.timeout_.arm(function() {
    callback.pool_.onError(new Error('Callback \'' +
        callback.callbackDescription_ + '\' expired after ' + delay +
        ' ms during test step \'' + callback.stepDescription_ + '\''));
    callback.pool_.remove('expired.', callback.callback_.getRemainingUses());
    callback.callback_.deplete();
  }, delay);
};


/**
 * Invokes this callback.
 * @return {*} The return value of the FiniteUseCallback.
 */
jstestdriver.plugins.async.ExpiringCallback.prototype.invoke = function() {
  return this.callback_.invoke.apply(this.callback_, arguments);
};

/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the FiniteUseCallback class, which decorates a
 * Javascript function by restricting the number of times the asynchronous
 * system may call it.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.FiniteUseCallback');

goog.require('jstestdriver');

/**
 * Constructs a FiniteUseCallback.
 *
 * @param {jstestdriver.plugins.async.CatchingCallback} callback A
 *     CatchingCallback.
 * @param {Function} onDepleted a function to execute when this
 *     FiniteUseCallback depletes.
 * @param {?number} opt_remainingUses the number of permitted uses remaining;
 *     defaults to one.
 * @constructor
 */
jstestdriver.plugins.async.FiniteUseCallback = function(
    callback, onDepleted, opt_remainingUses) {
  this.callback_ = callback;
  this.onDepleted_ = onDepleted;
  this.remainingUses_ = opt_remainingUses || 1;
};


/**
 * Depletes the remaining permitted uses.  Calls onDepleted.
 */
jstestdriver.plugins.async.FiniteUseCallback.prototype.deplete = function() {
  this.remainingUses_ = 0;
  if (this.onDepleted_) {
    this.onDepleted_.apply();
  }
};


/**
 * @return {number} The number of remaining permitted uses.
 */
jstestdriver.plugins.async.FiniteUseCallback.prototype.getRemainingUses =
    function() {
  return this.remainingUses_;
};


/**
 * Invokes this callback if it is usable. Calls onDepleted if invoking this
 * callback depletes its remaining permitted uses.
 * @param {...*} var_args The original callback arguments.
 * @return {*} The return value of the CatchingCallback or null.
 */
jstestdriver.plugins.async.FiniteUseCallback.prototype.invoke =
    function(var_args) {
  if (this.isUsable()) {
    try {
      this.remainingUses_ -= 1;
      return this.callback_.invoke.apply(this.callback_, arguments);
    } finally {
      if (this.onDepleted_ && !this.isUsable()) {
        this.onDepleted_.apply();
      }
    }
  }
};


/**
 * @return {boolean} True if any permitted uses remain.
 */
jstestdriver.plugins.async.FiniteUseCallback.prototype.isUsable = function() {
  return this.remainingUses_ > 0;
};
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the Timeout class.  The arm() method is equivalent to
 * window.setTimeout() and maybeDisarm() is equivalent to window.clearTimeout().
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.Timeout');

goog.require('jstestdriver');

/**
 * Constructs a Timeout. Accepts alternate implementations of setTimeout and
 * clearTimeout.
 *
 * @param {Function} setTimeout The global setTimeout function to use.
 * @param {Function} clearTimeout The global clearTimeout function to use.
 * @constructor
 */
jstestdriver.plugins.async.Timeout = function(setTimeout, clearTimeout) {
  this.setTimeout_ = setTimeout;
  this.clearTimeout_ = clearTimeout;
  this.handle_ = null;
};


/**
 * Arms this Timeout to fire after the specified delay.
 *
 * @param {Function} callback The callback to call after the delay passes.
 * @param {number} delay The timeout delay in milliseconds.
 */
jstestdriver.plugins.async.Timeout.prototype.arm = function(callback, delay) {
  var self = this;
  this.handle_ = this.setTimeout_(function() {
    self.maybeDisarm();
    return callback.apply(null, arguments);
  }, delay);
};

/**
 * Explicitly disarms the timeout.
 * @private
 */
jstestdriver.plugins.async.Timeout.prototype.disarm_ = function() {
  this.clearTimeout_(this.handle_);
  this.handle_ = null;
};


/**
 * @return {boolean} True if the timeout is armed.
 */
jstestdriver.plugins.async.Timeout.prototype.isArmed = function() {
  return this.handle_ != null;
};


/**
 * Disarms the timeout if it is armed.
 */
jstestdriver.plugins.async.Timeout.prototype.maybeDisarm = function() {
  if (this.isArmed()) {
    this.disarm_();
  }
};
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the TestSafeCallbackBuilder class. It decorates a
 * Javascript function with several safeguards so that it may be safely executed
 * asynchronously within a test.
 *
 * The safeguards include:
 *   1) notifying the test runner about any exceptions thrown when the function
 *      executes
 *   2) restricting the number of times the asynchronous system may call the
 *      function
 *   3) restricting the length of time the asynchronous system may delay before
 *      calling the function
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.TestSafeCallbackBuilder');

goog.require('jstestdriver');
goog.require('jstestdriver.plugins.async.CatchingCallback');
goog.require('jstestdriver.plugins.async.ExpiringCallback');
goog.require('jstestdriver.plugins.async.FiniteUseCallback');
goog.require('jstestdriver.plugins.async.Timeout');

/**
 * Constructs a TestSafeCallbackBuilder.
 *
 * @param {Function} opt_setTimeout the global setTimeout function to use.
 * @param {Function} opt_clearTimeout the global clearTimeout function to use.
 * @param {Function} opt_timeoutConstructor a constructor for obtaining new the
 *     Timeouts.
 * @constructor
 */
jstestdriver.plugins.async.TestSafeCallbackBuilder = function(
    opt_setTimeout, opt_clearTimeout, opt_timeoutConstructor) {
  this.setTimeout_ = opt_setTimeout || jstestdriver.setTimeout;
  this.clearTimeout_ = opt_clearTimeout || jstestdriver.clearTimeout;
  this.timeoutConstructor_ = opt_timeoutConstructor ||
      jstestdriver.plugins.async.Timeout;
  this.callbackDescription = 'Unknown callback.';
  this.stepDescription_ = 'Unknown step.';
  this.pool_ = null;
  this.remainingUses_ = null;
  this.testCase_ = null;
  this.wrapped_ = null;
};


/**
 * Returns the original function decorated with safeguards.
 * @return {*} The return value of the original callback.
 */
jstestdriver.plugins.async.TestSafeCallbackBuilder.prototype.build =
    function() {
  var catchingCallback = new jstestdriver.plugins.async.CatchingCallback(
      this.testCase_, this.pool_, this.wrapped_);
  var timeout = new (this.timeoutConstructor_)(
      this.setTimeout_, this.clearTimeout_);
  var onDepleted = function() {
    timeout.maybeDisarm();
  };
  var finiteUseCallback = new jstestdriver.plugins.async.FiniteUseCallback(
      catchingCallback, onDepleted, this.remainingUses_);
  return new jstestdriver.plugins.async.ExpiringCallback(
      this.pool_, finiteUseCallback, timeout,
      this.stepDescription_, this.callbackDescription_);
};


jstestdriver.plugins.async.TestSafeCallbackBuilder.
    prototype.setCallbackDescription = function(callbackDescription) {
  this.callbackDescription_ = callbackDescription;
  return this;
};


jstestdriver.plugins.async.TestSafeCallbackBuilder.
    prototype.setStepDescription = function(stepDescription) {
  this.stepDescription_ = stepDescription;
  return this;
};


/**
 * @param {jstestdriver.plugins.async.CallbackPool} pool the CallbackPool to
 *     contain the callback.
 * @return {jstestdriver.plugins.async.TestSafeCallbackBuilder} This.
 */
jstestdriver.plugins.async.TestSafeCallbackBuilder.prototype.setPool = function(
    pool) {
  this.pool_ = pool;
  return this;
};


/**
 * @param {number} remainingUses The remaining number of permitted calls.
 * @return {jstestdriver.plugins.async.TestSafeCallbackBuilder} This.
 */
jstestdriver.plugins.async.TestSafeCallbackBuilder.prototype.setRemainingUses =
    function(remainingUses) {
  this.remainingUses_ = remainingUses;
  return this;
};


/**
 * @param {Object} testCase The test case instance available as 'this' within
 *     the function's scope.
 * @return {jstestdriver.plugins.async.TestSafeCallbackBuilder} This.
 */
jstestdriver.plugins.async.TestSafeCallbackBuilder.prototype.setTestCase =
    function(testCase) {
  this.testCase_ = testCase;
  return this;
};


/**
 * @param {Function} wrapped The function wrapped by the above safeguards.
 * @return {jstestdriver.plugins.async.TestSafeCallbackBuilder} This.
 */
jstestdriver.plugins.async.TestSafeCallbackBuilder.prototype.setWrapped =
    function(wrapped) {
  this.wrapped_ = wrapped;
  return this;
};
/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the CallbackPool class, which decorates given callback
 * functions with safeguards and tracks them until they execute or expire.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.CallbackPool');

goog.require('jstestdriver');
goog.require('jstestdriver.plugins.async.TestSafeCallbackBuilder');

/**
 * Constructs a CallbackPool.
 *
 * @param {Function} setTimeout The global setTimeout function.
 * @param {Object} testCase The test case instance.
 * @param {Function} onPoolComplete A function to call when the pool empties.
 * @param {string} stepDescription A description of the current test step.
 * @param {boolean} opt_pauseForHuman Whether or not to pause for debugging.
 * @param {Function} opt_callbackBuilderConstructor An optional constructor for
 *     a callback builder.
 * @constructor
 */
jstestdriver.plugins.async.CallbackPool = function(setTimeout, testCase,
      onPoolComplete, stepDescription, opt_pauseForHuman,
      opt_callbackBuilderConstructor) {
  this.setTimeout_ = setTimeout;
  this.testCase_ = testCase;
  this.onPoolComplete_ = onPoolComplete;
  this.stepDescription_ = stepDescription;
  this.pauseForHuman_ = !!opt_pauseForHuman;
  this.callbackBuilderConstructor_ = opt_callbackBuilderConstructor ||
      jstestdriver.plugins.async.TestSafeCallbackBuilder;
  this.errors_ = [];
  this.count_ = 0;
  this.callbackIndex_ = 1;
  this.active_ = false;
};


/**
 * The number of milliseconds to wait before expiring a delinquent callback.
 */
jstestdriver.plugins.async.CallbackPool.TIMEOUT = 30000;


/**
 * Calls onPoolComplete if the pool is active and empty.
 */
jstestdriver.plugins.async.CallbackPool.prototype.maybeComplete = function() {
  if (this.active_ && this.count_ == 0 && this.onPoolComplete_) {
    var pool = this;
    this.setTimeout_(function() {
      pool.active_ = false;
      pool.onPoolComplete_(pool.errors_);
    }, 0);
  }
};


/**
 * Activates the pool and calls maybeComplete.
 */
jstestdriver.plugins.async.CallbackPool.prototype.activate = function() {
    this.active_ = true;
    this.maybeComplete();
};


/**
 * @return {number} The number of outstanding callbacks in the pool.
 */
jstestdriver.plugins.async.CallbackPool.prototype.count = function() {
  return this.count_;
};


/**
 * Accepts errors to later report them to the test runner via onPoolComplete.
 * @param {Error} error The error to report.
 */
jstestdriver.plugins.async.CallbackPool.prototype.onError = function(error) {
  this.errors_.push(error);
  this.count_ = 0;
  this.maybeComplete();
};


/**
 * Adds a callback function to the pool, optionally more than once.
 *
 * @param {Function} wrapped The callback function to decorate with safeguards
 *     and to add to the pool.
 * @param {number} opt_n The number of permitted uses of the given callback;
 *     defaults to one.
 * @param {number} opt_timeout The timeout in milliseconds.
 * @return {Function} A test safe callback.
 */
jstestdriver.plugins.async.CallbackPool.prototype.addCallback = function(
    wrapped, opt_n, opt_timeout, opt_description) {
  this.count_ += opt_n || 1;
  var callback = new (this.callbackBuilderConstructor_)()
      .setCallbackDescription(opt_description || '#' + this.callbackIndex_++)
      .setStepDescription(this.stepDescription_)
      .setPool(this)
      .setRemainingUses(opt_n)
      .setTestCase(this.testCase_)
      .setWrapped(wrapped)
      .build();
  if (!this.pauseForHuman_) {
    callback.arm(opt_timeout ||
        jstestdriver.plugins.async.CallbackPool.TIMEOUT);
  }
  return function() {
    return callback.invoke.apply(callback, arguments);
  };
};


/**
 * Adds a callback function to the pool, optionally more than once.
 *
 * @param {Function} wrapped The callback function to decorate with safeguards
 *     and to add to the pool.
 * @param {number} opt_n The number of permitted uses of the given callback;
 *     defaults to one.
 * @deprecated Use CallbackPool#addCallback().
 */
jstestdriver.plugins.async.CallbackPool.prototype.add =
    jstestdriver.plugins.async.CallbackPool.prototype.addCallback;


/**
 * @return {Function} An errback function to attach to an asynchronous system so
 *     that the test runner can be notified in the event of error.
 * @param {string} message A message to report to the user upon error.
 */
jstestdriver.plugins.async.CallbackPool.prototype.addErrback = function(
    message) {
  var pool = this;
  return function() {
    pool.onError(new Error(
        'Errback ' + message + ' called with arguments: ' +
            Array.prototype.slice.call(arguments)));
  };
};


/**
 * Removes a callback from the pool, optionally more than one.
 *
 * @param {string} message A message to pass to the pool for logging purposes;
 *     usually the reason that the callback was removed from the pool.
 * @param {number} opt_n The number of callbacks to remove from the pool.
 */
jstestdriver.plugins.async.CallbackPool.prototype.remove = function(
    message, opt_n) {
  if (this.count_ > 0) {
    this.count_ -= opt_n || 1;
    this.maybeComplete();
  }
};
/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the CallbackPoolDelegate class. Encapsulates a
 * CallbackPool behind a narrower interface. Also, validates arguments.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.CallbackPoolDelegate');

goog.require('jstestdriver');

/**
 * Constructs a CallbackPoolDelegate.
 * @param {jstestdriver.plugins.async.CallbackPool} pool The pool.
 * @constructor
 * @export
 */
jstestdriver.plugins.async.CallbackPoolDelegate = function(pool) {
  this.pool_ = pool;
};


/**
 * Adds a callback to the pool.
 * @param {Object|Function} callback The callback to wrap.
 * @param {number=} opt_n An optional number of times to wait for the callback to
 *     be called.
 * @param {number=} opt_timeout The timeout in milliseconds.
 * @param {string=} opt_description The callback description.
 * @return {Function} The wrapped callback.
 * @export
 */
jstestdriver.plugins.async.CallbackPoolDelegate.prototype.addCallback = function(
    callback, opt_n, opt_timeout, opt_description) {
  if (typeof callback == 'object') {
    var params = callback;
    callback = params['callback'];
    opt_n = params['invocations'];
    opt_timeout = params['timeout'] ? params['timeout'] * 1000 : undefined;
    opt_description = params['description'];
  }

  if (typeof callback == 'function' && callback) {
    return this.pool_.addCallback(
        callback, opt_n, opt_timeout, opt_description);
  }

  return null;
};


/**
 * @return {Function} An errback function to attach to an asynchronous system so
 *     that the test runner can be notified in the event of error.
 * @param {string} message A message to report to the user upon error.
 * @export
 */
jstestdriver.plugins.async.CallbackPoolDelegate.prototype.addErrback = function(
    message) {
  return this.pool_.addErrback(message);
};


/**
 * Adds a callback to the pool.
 * @param {Object|Function} callback The callback to wrap.
 * @param {number=} opt_n An optional number of times to wait for the callback to
 *     be called.
 * @param {number=} opt_timeout The timeout in milliseconds.
 * @param {string=} opt_description The callback description.
 * @return {Function} The wrapped callback.
 * @export
 * @deprecated Use addCallback().
 */
jstestdriver.plugins.async.CallbackPoolDelegate.prototype.add =
    jstestdriver.plugins.async.CallbackPoolDelegate.prototype.addCallback;


/**
 * A no-op callback that's useful for waiting until an asynchronous operation
 * completes without performing any action.
 * @param {Object|number=} opt_n An optional number of times to wait for the
 *     callback to be called.
 * @param {number=} opt_timeout The timeout in milliseconds.
 * @param {string=} opt_description The description.
 * @return {Function} A noop callback.
 * @export
 * @deprecated Use wait().
 */
jstestdriver.plugins.async.CallbackPoolDelegate.prototype.noop = function(
    opt_n, opt_timeout, opt_description) {
  if (typeof opt_n == 'object') {
    var params = opt_n;
    opt_timeout = params['timeout'] ? params['timeout'] * 1000 : undefined;
    opt_description = params['description'];
    opt_n = params['invocations'];
  }
  return this.pool_.addCallback(
      jstestdriver.EMPTY_FUNC, opt_n, opt_timeout, opt_description);
};


/**
 * Adds an empty callback to the queue.
 * @return {Function} The callback.
 * @export
 */
jstestdriver.plugins.async.CallbackPoolDelegate.prototype.wait =
    jstestdriver.plugins.async.CallbackPoolDelegate.prototype.noop;
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the DeferredQueue class.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.DeferredQueue');

goog.require('jstestdriver');
goog.require('jstestdriver.plugins.async.DeferredQueueDelegate');
goog.require('jstestdriver.plugins.async.CallbackPool');
goog.require('jstestdriver.plugins.async.CallbackPoolDelegate');

/**
 * Constructs a DeferredQueue.
 * @param {Function} setTimeout The setTimeout function.
 * @param {Object} testCase The test case that owns this queue.
 * @param {Function} onQueueComplete The queue complete callback.
 * @param {jstestdriver.plugins.async.DeferredQueueDelegate} delegate The
 *     delegate wrapping all DeferredQueues for this test run0.
 * @param {boolean} opt_pauseForHuman Whether or not to pause for debugging.
 * @param {Function} opt_queueConstructor The DeferredQueue constructor.
 * @param {Function} opt_queueDelegateConstructor The DeferredQueueDelegate
 *     constructor.
 * @param {Function} opt_poolConstructor The CallbackPool constructor.
 * @param {Function} opt_poolDelegateConstructor The CallbackPoolDelegate constructor.
 * @constructor
 */
jstestdriver.plugins.async.DeferredQueue = function(setTimeout, testCase,
    onQueueComplete, delegate, opt_pauseForHuman, opt_queueConstructor,
    opt_queueDelegateConstructor, opt_poolConstructor, opt_poolDelegateConstructor) {
  this.setTimeout_ = setTimeout;
  this.testCase_ = testCase;
  this.onQueueComplete_ = onQueueComplete;
  this.delegate_ = delegate;
  this.pauseForHuman_ = !!opt_pauseForHuman;
  this.queueConstructor_ = opt_queueConstructor ||
      jstestdriver.plugins.async.DeferredQueue;
  this.queueDelegateConstructor_ = opt_queueDelegateConstructor ||
      jstestdriver.plugins.async.DeferredQueueDelegate;
  this.poolConstructor_ = opt_poolConstructor ||
      jstestdriver.plugins.async.CallbackPool;
  this.poolDelegateConstructor_ = opt_poolDelegateConstructor ||
      jstestdriver.plugins.async.CallbackPoolDelegate;
  this.descriptions_ = [];
  this.operations_ = [];
  this.errors_ = [];
};


/**
 * Executes a step of the test.
 * @param {Function} operation The next test step.
 * @param {Function} onQueueComplete The queue complete callback.
 * @private
 */
jstestdriver.plugins.async.DeferredQueue.prototype.execute_ = function(
    description, operation, onQueueComplete) {
  var queue = new (this.queueConstructor_)(this.setTimeout_,
      this.testCase_, onQueueComplete, this.delegate_, this.pauseForHuman_);
  this.delegate_.setQueue(queue);

  var onPoolComplete = function(errors) {
    queue.finishStep_(errors);
  };
  var pool = new (this.poolConstructor_)(
      this.setTimeout_, this.testCase_, onPoolComplete, description, this.pauseForHuman_);
  var poolDelegate = new (this.poolDelegateConstructor_)(pool);

  if (operation) {
    try {
      operation.call(this.testCase_, poolDelegate, this.delegate_);
    } catch (e) {
      pool.onError(e);
    }
  }

  pool.activate();
};


/**
 * Enqueues a test step.
 * @param {string} description The test step description.
 * @param {Function} operation The test step to add to the queue.
 */
jstestdriver.plugins.async.DeferredQueue.prototype.defer = function(
    description, operation) {
  this.descriptions_.push(description);
  this.operations_.push(operation);
};


/**
 * Starts the next test step.
 */
jstestdriver.plugins.async.DeferredQueue.prototype.startStep = function() {
  var nextDescription = this.descriptions_.shift();
  var nextOp = this.operations_.shift();
  if (nextOp) {
    var q = this;
    this.execute_(nextDescription, nextOp, function(errors) {
      q.finishStep_(errors);
    });
  } else {
    this.onQueueComplete_([]);
  }
};


/**
 * Finishes the current test step.
 * @param {Array.<Error>} errors An array of any errors that occurred during the
 *     previous test step.
 * @private
 */
jstestdriver.plugins.async.DeferredQueue.prototype.finishStep_ = function(
    errors) {
  this.errors_ = this.errors_.concat(errors);
  if (this.errors_.length) {
    this.onQueueComplete_(this.errors_);
  } else {
    this.startStep();
  }
};
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the DeferredQueueInterface class. Encapsulates a
 * DeferredQueue behind a narrower interface. Also, validates arguments.
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.DeferredQueueDelegate');

goog.require('jstestdriver');

/**
 * Constructs a DeferredQueueDelegate.
 * @param {function(Object)} toJson a function to convert objects to JSON.
 * @constructor
 * @export
 */
jstestdriver.plugins.async.DeferredQueueDelegate = function(toJson) {
  this.toJson_ = toJson;
  this.q_ = null;
  this.step_ = 1;
};


/**
 * Sets the current queue instance.
 * @param {jstestdriver.plugins.async.DeferredQueue} queue The queue.
 */
jstestdriver.plugins.async.DeferredQueueDelegate.prototype.setQueue = function(
    queue) {
  this.q_ = queue;
};


/**
 * Adds a function to the queue to call later.
 * @param {string|Function} description The description or function.
 * @param {Function=} operation The function.
 * @return {jstestdriver.plugins.async.DeferredQueueDelegate} This.
 * @export
 */
jstestdriver.plugins.async.DeferredQueueDelegate.prototype.call = function(
    description, operation) {
  if (!this.q_) {
    throw new Error('Queue undefined!');
  }

  if (typeof description == 'function') {
    operation = description;
    description = this.nextDescription_();
  }

  if (typeof description == 'object') {
    operation = description.operation;
    description = description.description;
  }

  if (!description) {
    description = this.nextDescription_();
  }

  if (operation) {
    this.q_.defer(description, operation);
    this.step_ += 1;
  }

  return this;
};


/**
 * @return {string} A description for the next step.
 */
jstestdriver.plugins.async.DeferredQueueDelegate.prototype.nextDescription_ =
    function() {
  return '#' + this.step_;
};


/**
 * Adds a function to the queue to call later.
 * @param {string|Function} description The description or function.
 * @param {Function=} operation The function.
 * @deprecated Use DeferredQueueDelegate#call().
 * @export
 */
jstestdriver.plugins.async.DeferredQueueDelegate.prototype.defer =
    jstestdriver.plugins.async.DeferredQueueDelegate.prototype.call;
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the TestStage class.
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.TestStage');
goog.provide('jstestdriver.plugins.async.TestStage.Builder');

goog.require('jstestdriver');
goog.require('jstestdriver.setTimeout');
goog.require('jstestdriver.plugins.async.DeferredQueueDelegate');
goog.require('jstestdriver.plugins.async.DeferredQueue');

/**
 * Constructs a TestStage.
 *
 * A TestStage is an executable portion of a test, such as setUp, tearDown, or
 * the test method.
 *
 * @param {Function} onError An error handler.
 * @param {Function} onStageComplete A callback for stage completion.
 * @param {Object} testCase The test case that owns this test stage.
 * @param {Function} testMethod The test method this stage represents.
 * @param {function(Object)} toJson a function to convert objects to JSON.
 * @param {Object} opt_argument An argument to pass to the test method.
 * @param {boolean} opt_pauseForHuman Whether to pause for debugging.
 * @param {Function} opt_queueDelegateConstructor The constructor of
 * DeferredQueueDelegate.
 * @param {Function} opt_queueConstructor The constructor of DeferredQueue.
 * @param {Function} opt_setTimeout The setTimeout function or suitable
 *     replacement.
 * @constructor
 */
jstestdriver.plugins.async.TestStage = function(
    onError, onStageComplete, testCase, testMethod, toJson, opt_argument,
    opt_pauseForHuman, opt_queueDelegateConstructor, opt_queueConstructor,
    opt_setTimeout) {
  this.onError_ = onError;
  this.onStageComplete_ = onStageComplete;
  this.testCase_ = testCase;
  this.testMethod_ = testMethod;
  this.toJson_ = toJson;
  this.argument_ = opt_argument;
  this.pauseForHuman_ = !!opt_pauseForHuman;
  this.queueDelegateConstructor_ = opt_queueDelegateConstructor ||
      jstestdriver.plugins.async.DeferredQueueDelegate;
  this.queueConstructor_ = opt_queueConstructor ||
      jstestdriver.plugins.async.DeferredQueue;
  this.setTimeout_ = opt_setTimeout || jstestdriver.setTimeout;
};


/**
 * Executes this TestStage.
 */
jstestdriver.plugins.async.TestStage.prototype.execute = function() {
  var delegate = new (this.queueDelegateConstructor_)(this.toJson_);
  var queue = new (this.queueConstructor_)(this.setTimeout_, this.testCase_,
      this.onStageComplete_, delegate, this.pauseForHuman_);
  delegate.setQueue(queue);

  if (this.testMethod_) {
    try {
      this.testMethod_.call(this.testCase_, delegate, this.argument_);
    } catch (e) {
      this.onError_(e);
    }
  }

  queue.startStep();
};



/**
 * Constructor for a Builder of TestStages. Used to avoid confusion when
 * trying to construct TestStage objects (as the constructor takes a lot
 * of parameters of similar types).
 * @constructor
 */
jstestdriver.plugins.async.TestStage.Builder = function() {
  this.onError_ = null;
  this.onStageComplete_ = null;
  this.testCase_ = null;
  this.testMethod_ = null;
  this.toJson_ = null;
  this.opt_argument_ = null;
  this.opt_pauseForHuman_ = null;
  this.opt_queueDelegateConstructor_ =
      jstestdriver.plugins.async.DeferredQueueDelegate;
  this.opt_queueConstructor_ = jstestdriver.plugins.async.DeferredQueue;
  this.opt_setTimeout_ = jstestdriver.setTimeout;
};


// Setters for the various fields; they return the Builder instance to allow
// method call chaining.
jstestdriver.plugins.async.TestStage.Builder.prototype.setOnError =
    function(onError) {
  this.onError_ = onError;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setOnStageComplete =
    function(onStageComplete) {
  this.onStageComplete_ = onStageComplete;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setTestCase =
    function(testCase) {
  this.testCase_ = testCase;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setTestMethod =
    function(testMethod) {
  this.testMethod_ = testMethod;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setToJson =
    function(toJson) {
  this.toJson_ = toJson;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setArgument =
    function(argument) {
  this.opt_argument_ = argument;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setPauseForHuman =
    function(pauseForHuman) {
  this.opt_pauseForHuman_ = pauseForHuman;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.
    setQueueDelegateConstructor = function(queueDelegateConstructor) {
  this.opt_queueDelegateConstructor_ = queueDelegateConstructor;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setQueueConstructor =
    function(queueConstructor) {
  this.opt_queueConstructor_ = queueConstructor;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.setTimeoutSetter =
    function(setTimeout) {
  this.opt_setTimeout_ = setTimeout;
  return this;
};


jstestdriver.plugins.async.TestStage.Builder.prototype.build = function() {
  return new jstestdriver.plugins.async.TestStage(
      this.onError_, this.onStageComplete_, this.testCase_, this.testMethod_,
      this.toJson_, this.opt_argument_, this.opt_pauseForHuman_,
      this.opt_queueDelegateConstructor_, this.opt_queueConstructor_,
      this.opt_setTimeout_);
};
/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
jstestdriver.plugins.ScriptLoader = function(win, dom, testCaseManager, now) {
  this.win_ = win;
  this.dom_ = dom;
  this.testCaseManager_ = testCaseManager;
  this.now_ = now;
};


jstestdriver.plugins.ScriptLoader.prototype.load = function(file, callback) {
  this.testCaseManager_.removeTestCaseForFilename(file.fileSrc);
  this.fileResult_ = null;
  var head = this.dom_.getElementsByTagName('head')[0];
  var script = this.dom_.createElement('script');
  var start = this.now_();

  if (!jstestdriver.jQuery.browser.opera) {
    script.onload = jstestdriver.bind(this, function() {
      this.cleanCallBacks(script)
      this.onLoad_(file, callback, start);
    });
  }
  script.onreadystatechange = jstestdriver.bind(this, function() {
    if (script.readyState === "loaded" || script.readyState === "complete") {
      this.cleanCallBacks(script)
      this.onLoad_(file, callback, start);
    }
  });

  var handleError = jstestdriver.bind(this, function(msg, url, line) {
    this.testCaseManager_.removeTestCaseForFilename(file.fileSrc);
    var loadMsg = 'error loading file: ' + file.fileSrc;

    if (line != undefined && line != null) {
      loadMsg += ':' + line;
    }
    if (msg != undefined && msg != null) {
      loadMsg += ': ' + msg;
    }
    this.cleanCallBacks(script)
    callback(new jstestdriver.FileResult(file, false, loadMsg));
  });
  this.win_.onerror = handleError; 
  script.onerror = handleError;

  script.type = "text/javascript";
  script.src = file.fileSrc;
  head.appendChild(script);

};

jstestdriver.plugins.ScriptLoader.prototype.cleanCallBacks = function(script) {
  script.onerror = jstestdriver.EMPTY_FUNC;
  script.onload = jstestdriver.EMPTY_FUNC;
  script.onreadystatechange = jstestdriver.EMPTY_FUNC;
  this.win_.onerror = jstestdriver.EMPTY_FUNC;
};


jstestdriver.plugins.ScriptLoader.prototype.onLoad_ =
    function(file, callback, start) {
  this.testCaseManager_.updateLatestTestCase(file.fileSrc);
  var result = new jstestdriver.FileResult(file, true, '', this.now_() - start);
  this.win_.onerror = jstestdriver.EMPTY_FUNC;
  callback(result);
};


jstestdriver.plugins.ScriptLoader.prototype.updateResult_ = function(fileResult) {
  if (this.fileResult_ == null) {
    this.fileResult_ = fileResult;
  }
};
/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
jstestdriver.plugins.StylesheetLoader = function(win, dom, synchronousCallback) {
  this.win_ = win;
  this.dom_ = dom;
  this.synchronousCallback_ = synchronousCallback;
};


jstestdriver.plugins.StylesheetLoader.prototype.load = function(file, callback) {
  this.fileResult_ = null;
  var head = this.dom_.getElementsByTagName('head')[0];
  var link = this.dom_.createElement('link');
  var handleError = jstestdriver.bind(this, function(msg, url, line) {
    var loadMsg = 'error loading file: ' + file.fileSrc;

    if (line != undefined && line != null) {
      loadMsg += ':' + line;
    }
    if (msg != undefined && msg != null) {
      loadMsg += ': ' + msg;
    }
    this.updateResult_(new jstestdriver.FileResult(file, false, loadMsg));
  });

  this.win_.onerror = handleError;
  link.onerror = handleError;
  if (!jstestdriver.jQuery.browser.opera) {
    link.onload = jstestdriver.bind(this, function() {
      this.onLoad_(file, callback);
    });
  }
  link.onreadystatechange = jstestdriver.bind(this, function() {
    if (link.readyState == 'loaded') {
      this.onLoad_(file, callback);
    }
  });
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = file.fileSrc;
  head.appendChild(link);

  // Firefox and Safari don't seem to support onload or onreadystatechange for link
  if (this.synchronousCallback_) {
    this.onLoad_(file, callback);
  }
};


jstestdriver.plugins.StylesheetLoader.prototype.onLoad_ = function(file, callback) {
  this.updateResult_(new jstestdriver.FileResult(file, true, ''));
  this.win_.onerror = jstestdriver.EMPTY_FUNC;
  callback(this.fileResult_);  
};


jstestdriver.plugins.StylesheetLoader.prototype.updateResult_ = function(fileResult) {
  if (this.fileResult_ == null) {
    this.fileResult_ = fileResult;
  }
};
/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
jstestdriver.plugins.FileLoaderPlugin = function(scriptLoader, stylesheetLoader) {
  this.scriptLoader_ = scriptLoader;
  this.stylesheetLoader_ = stylesheetLoader;
};


jstestdriver.plugins.FileLoaderPlugin.prototype.loadSource = function(file, onSourceLoaded) {
  if (file.fileSrc.match(/\.css$/)) {
    this.stylesheetLoader_.load(file, onSourceLoaded);
  } else {
    this.scriptLoader_.load(file, onSourceLoaded);
  }
};
/*
 * Copyright 2009 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
goog.require('jstestdriver');
goog.require('jstestdriver.TestResult');
goog.require('jstestdriver.TestCaseInfo');


goog.provide('jstestdriver.plugins.TestRunnerPlugin');

/**
 * @param {Date} dateObj
 * @param {Function} clearBody
 * @param {jstestdriver.PluginRegistrar} pluginRegistrar
 * @param {Function} serializeErrors
 * @param {Function} opt_runTestLoop
 * @constructor
 */
jstestdriver.plugins.TestRunnerPlugin = function(dateObj,
    clearBody,
    pluginRegistrar,
    serializeErrors,
    opt_runTestLoop) {
  this.dateObj_ = dateObj;
  this.clearBody_ = clearBody;
  this.boundRunTest_ = jstestdriver.bind(this, this.runTest);
  this.runTestLoop_ = opt_runTestLoop || jstestdriver.plugins.defaultRunTestLoop;
  this.pluginRegistrar_ = pluginRegistrar;
  this.serializeErrors_ = serializeErrors;
  this.name = 'TestRunnerPlugin';
};


jstestdriver.plugins.timedProcessArray = function(interval, array, process, finish, now, setTimeout)
{
  var items = array.concat(); //clone the array
  setTimeout(function nestedFunction(){
    var start = now();
    do{
      process(items.shift());
    }while(items.length > 0 && (now() - start < interval));

    if (items.length > 0){
      setTimeout(nestedFunction, 25);
    }else{
      finish();
    }
  }, 25);
};


jstestdriver.plugins.createPausingRunTestLoop =
    function (interval, now, setTimeout) {
  var lastPause;
  function pausingRunTestLoop(testCaseName,
                              template,
                              tests,
                              runTest,
                              onTest,
                              onComplete) {
      jstestdriver.plugins.timedProcessArray(interval, tests, function(oItem){
      onTest(runTest(testCaseName, template, oItem));
    }, onComplete, now, setTimeout);
  }
  return pausingRunTestLoop;
};


jstestdriver.plugins.pausingRunTestLoop =
    jstestdriver.plugins.createPausingRunTestLoop(
        50,
        jstestdriver.now,
        jstestdriver.setTimeout);


jstestdriver.plugins.defaultRunTestLoop =
    function(testCaseName, template, tests, runTest, onTest, onComplete) {
  for (var i = 0; tests[i]; i++) {
    onTest(runTest(testCaseName, template, tests[i]));
  }
  onComplete();
};


/**
 * 
 * @expose
 */
jstestdriver.plugins.TestRunnerPlugin.prototype.runTestConfiguration =
    function(testRunConfiguration, onTestDone, onTestRunConfigurationComplete) {
  var testCaseInfo = testRunConfiguration.getTestCaseInfo();
  var tests = testRunConfiguration.getTests();
  var size = tests.length;

  if (testCaseInfo.getType() != jstestdriver.TestCaseInfo.DEFAULT_TYPE) {
    for (var i = 0; tests[i]; i++) {
      onTestDone(new jstestdriver.TestResult(
          testCaseInfo.getTestCaseName(),
          tests[i],
          'error',
          testCaseInfo.getTestCaseName() +
            ' is an unhandled test case: ' +
            testCaseInfo.getType(),
          '',
          0));
    }
    onTestRunConfigurationComplete();
    return;
  }

  this.runTestLoop_(testCaseInfo.getTestCaseName(),
                    testCaseInfo.getTemplate(),
                    tests,
                    this.boundRunTest_,
                    onTestDone,
                    onTestRunConfigurationComplete)
};

/**
 * @param {String} testCaseName
 * @param {Function} testCase
 * @param {String} testName
 */
jstestdriver.plugins.TestRunnerPlugin.prototype.runTest =
    function(testCaseName, testCase, testName) {
  var testCaseInstance;
  var errors = [];
  try {
    try {
      testCaseInstance = new testCase();
    } catch (e) {
      return new jstestdriver.TestResult(
          testCaseName,
          testName,
          jstestdriver.TestResult.RESULT.ERROR,
          testCaseName + ' is not a test case',
          '',
          0);
    }
    var start = new this.dateObj_().getTime();

    jstestdriver.expectedAssertCount = -1;
    jstestdriver.assertCount = 0;
    var res = jstestdriver.TestResult.RESULT.PASSED;
    try {
      if (testCaseInstance['setUp']) {
        testCaseInstance['setUp']();
      }
      if (!(testName in testCaseInstance)) {
        var err = new Error(testName + ' not found in ' + testCaseName);
        err.name = 'AssertError';
        throw err;
      }
      testCaseInstance[testName]();
      if (jstestdriver.expectedAssertCount != -1 &&
          jstestdriver.expectedAssertCount != jstestdriver.assertCount) {
        var err = new Error("Expected '" +
            jstestdriver.expectedAssertCount +
            "' asserts but '" +
            jstestdriver.assertCount +
            "' encountered.");

        err.name = 'AssertError';
        throw err;
      }
    } catch (e) {
      res = this.pluginRegistrar_.isFailure(e) ?
          jstestdriver.TestResult.RESULT.FAILED :
            jstestdriver.TestResult.RESULT.ERROR;
      errors.push(e);
    }
    try {
      if (testCaseInstance['tearDown']) {
        testCaseInstance['tearDown']();
      }
      this.clearBody_();
    } catch (e) {
      if (res == jstestdriver.TestResult.RESULT.PASSED) {
        res = jstestdriver.TestResult.RESULT.ERROR;
      }
      errors.push(e);
    }
    var end = new this.dateObj_().getTime();
    var msg = this.serializeError(errors);
    return new jstestdriver.TestResult(testCaseName, testName, res, msg,
            jstestdriver.console.getAndResetLog(), end - start);
  } catch (e) {
    errors.push(e);
    return new jstestdriver.TestResult(testCaseName, testName,
            'error', 'Unexpected runner error: ' + this.serializeError(errors),
            jstestdriver.console.getAndResetLog(), 0);
  }
};

/**
 * @param {Error} e
 * @return {Object}
 */
jstestdriver.plugins.TestRunnerPlugin.prototype.serializeError = function(e) {
  return this.serializeErrors_(e);
};
/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * @fileoverview Defines the AsyncTestRunnerPlugin class, which executes
 * asynchronous test cases within JsTestDriver.
 *
 *     +----------------------------- more tests? ------------ nextTest() <--------------+
 *     |                                                                                 |
 *     v                                                                                 |
 * startSetUp() ---- execute ---> finishSetUp(errors)                                    |
 *                                     |                                                 |
 * startTestMethod() <--- no errors ---+---- errors ----+                                |
 *        |                                             |                                |
 *     execute                                          |                                |
 *        |                                             |                                |
 *        v                                             v                                |
 * finishTestMethod(errors) -- errors or no errors -> startTearDown() -- execute -> finishTearDown(errors)
 *
 * @author rdionne@google.com (Robert Dionne)
 */

goog.provide('jstestdriver.plugins.async.AsyncTestRunnerPlugin');

goog.require('jstestdriver');
goog.require('jstestdriver.setTimeout');
goog.require('jstestdriver.TestCaseInfo');
goog.require('jstestdriver.TestResult');
goog.require('jstestdriver.plugins.async.CallbackPool');
goog.require('jstestdriver.plugins.async.CallbackPoolDelegate');
goog.require('jstestdriver.plugins.async.DeferredQueue');
goog.require('jstestdriver.plugins.async.DeferredQueueDelegate');
goog.require('jstestdriver.plugins.async.TestStage');
goog.require('jstestdriver.plugins.async.TestStage.Builder');

/**
 * Constructs an AsyncTestRunnerPlugin.
 *
 * @param {Function} dateObj the date object constructor
 * @param {Function} clearBody a function to call to clear the document body.
 * @param {Function} toJson a function to call to convert an object to JSON.
 * @param {boolean} opt_pauseForHuman Whether to pause for debugging.
 * @param {Function} opt_setTimeout window.setTimeout replacement.
 * @param {Function} opt_queueConstructor a constructor for obtaining new
 *     DeferredQueues.
 * @param {Function} opt_queueDelegateConstructor a constructor for obtaining new
 *     DeferredQueueDelegates.
 * @constructor
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin = function(dateObj, clearBody,
      toJson, opt_pauseForHuman, opt_setTimeout, opt_queueConstructor,
      opt_queueDelegateConstructor) {
  this.name = "AsyncTestRunnerPlugin";
  this.dateObj_ = dateObj;
  this.clearBody_ = clearBody;
  this.toJson_ = toJson;
  this.pauseForHuman_ = !!opt_pauseForHuman;
  this.setTimeout_ = opt_setTimeout || jstestdriver.setTimeout;
  this.queueConstructor_ = opt_queueConstructor || jstestdriver.plugins.async.DeferredQueue;
  this.queueDelegateConstructor_ = opt_queueDelegateConstructor ||
      jstestdriver.plugins.async.DeferredQueueDelegate;
  this.testRunConfiguration_ = null;
  this.testCaseInfo_ = null;
  this.onTestDone_ = null;
  this.onTestRunConfigurationComplete_ = null;
  this.testIndex_ = 0;
  this.testCase_ = null;
  this.testName_ = null;
  this.start_ = null;
  this.errors_ = null;
};

/**
 * Runs a test case.
 *
 * @param {jstestdriver.TestRunConfiguration} testRunConfiguration the test 
 *        case configuration
 * @param {function(jstestdriver.TestResult)} onTestDone the function to call to 
 *        report a test is complete
 * @param {function()=} opt_onTestRunConfigurationComplete the function to call 
 *        to report a test case is complete. A no-op will be used if this is
 *        not specified.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.runTestConfiguration = function(
    testRunConfiguration, onTestDone, opt_onTestRunConfigurationComplete) {
  if (testRunConfiguration.getTestCaseInfo().getType() == jstestdriver.TestCaseInfo.ASYNC_TYPE) {
    this.testRunConfiguration_ = testRunConfiguration;
    this.testCaseInfo_ = testRunConfiguration.getTestCaseInfo();
    this.onTestDone_ = onTestDone;
    this.onTestRunConfigurationComplete_ = opt_onTestRunConfigurationComplete ||
        function() {};
    this.testIndex_ = 0;
    this.nextTest();
    return true;
  }

  return false;
};

/**
 * Runs the next test in the current test case.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.nextTest = function() {
  this.start_ = new this.dateObj_().getTime();
  if (this.testIndex_ < this.testRunConfiguration_.getTests().length) {
    jstestdriver.expectedAssertCount = -1;
    jstestdriver.assertCount = 0;
    this.testCase_ = new (this.testCaseInfo_.getTemplate());
    this.testName_ = this.testRunConfiguration_.getTests()[this.testIndex_];
    this.errors_ = [];
    this.startSetUp();
  } else {
    this.testRunConfiguration_ = null;
    this.testCaseInfo_ = null;
    this.onTestDone_ = null;
    this.testIndex_ = 0;
    this.testCase_ = null;
    this.testName_ = null;
    this.start_ = null;
    this.errors_ = null;

    // Unset this callback before running it because the next callback may be
    // set by the code run by the callback.
    var onTestRunConfigurationComplete = this.onTestRunConfigurationComplete_;
    this.onTestRunConfigurationComplete_ = null;
    onTestRunConfigurationComplete.call(this);
  }
};


/**
 * Starts the next phase of the current test in the current test case. Creates a
 * DeferredQueue to manage the steps of this phase, executes the phase
 * catching any exceptions, and then hands the control over to the queue to
 * call onQueueComplete when it empties.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.execute_ = function(
    onStageComplete, invokeMethod) {
  var runner = this;
  var onError = function(error) {runner.errors_.push(error);};
  var args = this.testRunConfiguration_.getArguments();
  var argument = args ? args[this.testName_] : null;
  var stage = new jstestdriver.plugins.async.TestStage.Builder().
      setOnError(onError).
      setOnStageComplete(onStageComplete).
      setTestCase(this.testCase_).
      setTestMethod(invokeMethod).
      setArgument(argument).
      setPauseForHuman(this.pauseForHuman_).
      setQueueDelegateConstructor(this.queueDelegateConstructor_).
      setQueueConstructor(this.queueConstructor_).
      setTimeoutSetter(this.setTimeout_).
      setToJson(this.toJson_).
      build();
  stage.execute();
};


/**
 * Starts the setUp phase.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.startSetUp = function() {
  var runner = this;
  this.execute_(function(errors) {
    runner.finishSetUp(errors);
  }, this.testCase_['setUp']);
};

/**
 * Finishes the setUp phase and reports any errors. If there are errors it
 * initiates the tearDown phase, otherwise initiates the testMethod phase.
 *
 * @param errors errors caught during the current asynchronous phase.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.finishSetUp = function(errors) {
  this.errors_ = this.errors_.concat(errors);
  if (this.errors_.length) {
    this.startTearDown();
  } else {
    this.startTestMethod();
  }
};

/**
 * Starts the testMethod phase.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.startTestMethod = function() {
  var runner = this;
  this.execute_(function(errors) {
    runner.finishTestMethod(errors);
  }, this.testCase_[this.testName_]);
};

/**
 * Finishes the testMethod phase and reports any errors. Continues with the
 * tearDown phase.
 *
 * @param errors errors caught during the current asynchronous phase.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.finishTestMethod = function(errors) {
  this.errors_ = this.errors_.concat(errors);
  this.startTearDown();
};


/**
 * Start the tearDown phase.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.startTearDown = function() {
  var runner = this;
  this.execute_(function(errors){
    runner.finishTearDown(errors);
  }, this.testCase_['tearDown']);
};


/**
 * Finishes the tearDown phase and reports any errors. Submits the test results
 * to the test runner. Continues with the next test.
 *
 * @param errors errors caught during the current asynchronous phase.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.finishTearDown = function(errors) {
  this.errors_ = this.errors_.concat(errors);
  this.clearBody_();
  this.onTestDone_(this.buildResult());
  this.testIndex_ += 1;
  this.nextTest();
};

/**
 * Builds a test result.
 */
jstestdriver.plugins.async.AsyncTestRunnerPlugin.prototype.buildResult = function() {
  var end = new this.dateObj_().getTime();
  var result = jstestdriver.TestResult.RESULT.PASSED;
  var message = '';
  if (this.errors_.length) {
    result = jstestdriver.TestResult.RESULT.FAILED;
    message = this.toJson_(this.errors_);
  } else if (jstestdriver.expectedAssertCount != -1 &&
             jstestdriver.expectedAssertCount != jstestdriver.assertCount) {
    result = jstestdriver.TestResult.RESULT.FAILED;
    message = this.toJson_([new Error("Expected '" +
        jstestdriver.expectedAssertCount +
        "' asserts but '" +
        jstestdriver.assertCount +
        "' encountered.")]);
  }
  var args = this.testRunConfiguration_.getArguments();
  var argument = args ? args[this.testName_] : null;
  return new jstestdriver.TestResult(
      this.testCaseInfo_.getTestCaseName(), this.testName_, result, message,
      jstestdriver.console.getAndResetLog(), end - this.start_, null, argument);
};
/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
jstestdriver.plugins.DefaultPlugin = function(fileLoaderPlugin,
                                              testRunnerPlugin,
                                              assertsPlugin,
                                              testCaseManagerPlugin) {
  this.fileLoaderPlugin_ = fileLoaderPlugin;
  this.testRunnerPlugin_ = testRunnerPlugin;
  this.assertsPlugin_ = assertsPlugin;
  this.testCaseManagerPlugin_ = testCaseManagerPlugin;
};


jstestdriver.plugins.DefaultPlugin.prototype.name = 'defaultPlugin';


jstestdriver.plugins.DefaultPlugin.prototype.loadSource = function(file, onSourceLoaded) {
  return this.fileLoaderPlugin_.loadSource(file, onSourceLoaded);
};


jstestdriver.plugins.DefaultPlugin.prototype.runTestConfiguration = function(testRunConfiguration,
    onTestDone, onTestRunConfigurationComplete) {
  return this.testRunnerPlugin_.runTestConfiguration(testRunConfiguration, onTestDone,
      onTestRunConfigurationComplete);
};


jstestdriver.plugins.DefaultPlugin.prototype.isFailure = function(exception) {
  return this.assertsPlugin_.isFailure(exception);
};


jstestdriver.plugins.DefaultPlugin.prototype.getTestRunsConfigurationFor =
    function(testCaseInfos, expressions, testRunsConfiguration) {
  return this.testCaseManagerPlugin_.getTestRunsConfigurationFor(testCaseInfos,
                                                                expressions,
                                                                testRunsConfiguration);
};


jstestdriver.plugins.DefaultPlugin.prototype.onTestsStart =
    jstestdriver.EMPTY_FUNC;


jstestdriver.plugins.DefaultPlugin.prototype.onTestsFinish =
  jstestdriver.EMPTY_FUNC;
/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
 
goog.provide('jstestdriver.plugins.AssertsPlugin');
 
jstestdriver.plugins.AssertsPlugin = function() {
  this.name = 'AssertPlugin';
};

/**
 * @param {Error}
 * @return
 */
jstestdriver.plugins.AssertsPlugin.prototype.isFailure = function(e) {
  return e.name == 'AssertError';
};
/*
 * Copyright 2009 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * Plugin that handles the default behavior for the TestCaseManager.
 * @author corysmith@google.com (Cory Smith)
 */
jstestdriver.plugins.TestCaseManagerPlugin = function() {
  this.name = 'TestCaseManagerPlugin';
};


/**
 * Write testRunconfigurations retrieved from testCaseInfos defined by expressions.
 * @param {Array.<jstestdriver.TestCaseInfo>} testCaseInfos The loaded test case infos.
 * @param {Array.<String>} The expressions that define the TestRunConfigurations
 * @parma {Array.<jstestdriver.TestRunConfiguration>} The resultant array of configurations.
 */
jstestdriver.plugins.TestCaseManagerPlugin.prototype.getTestRunsConfigurationFor =
    function(testCaseInfos, expressions, testRunsConfiguration) {
  var size = testCaseInfos.length;
  for (var i = 0; i < size; i++) {
    var testCaseInfo = testCaseInfos[i];
    var testRunConfiguration = testCaseInfo.getTestRunConfigurationFor(expressions);

    if (testRunConfiguration != null) {
      testRunsConfiguration.push(testRunConfiguration);
    }
  }
  return true;
};
