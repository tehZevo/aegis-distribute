var ProtoPost = require("protopost");
var fetch = require("node-fetch");

var protopost = ProtoPost.client;

var urls = process.env.URLS;
if(urls == null || urls.trim() == "")
{
  console.error("Must provide at least one url via URLS");
  process.exit(1);
}

urls = urls.split(/\s+/);
console.log(urls)

var sync = process.env.SYNC;
sync = sync != null ? (sync.toLowerCase() == "true") : false;

var auto = process.env.AUTO;
auto = auto != null ? (auto.toLowerCase() == "true") : false;

var port = process.env.PORT || "80";

//run each in succession
async function syncFunction(urls)
{
  for(var url of urls)
  {
    await protopost(url);
  }
}

//run each async
async function asyncFunction(urls)
{
  return Promise.all(urls.map((e) => protopost(e)));
}

var runFunction = sync ? syncFunction : asyncFunction;

//if auto, run a loop
if(auto)
{
  (async () => {
    while(true)
    {
      await runFunction(urls);
    }
  })();
}

//otherwise start protopost server
else
{
  //TODO: return stuff
  new ProtoPost({}, (data) => runFunction(urls, "", data)).start();
}
