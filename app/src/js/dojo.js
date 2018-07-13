var locationPath = location.pathname.replace(/\/[^\/]+$/, "");
var _a = window.location, pathname = _a.pathname, search = _a.search;
var distPath = pathname.substring(0, pathname.lastIndexOf("/"));
var appPath = distPath.slice(0, distPath.lastIndexOf("/"));
var templateAppPath = appPath.slice(0, appPath.lastIndexOf("/"));
var localeUrlParamRegex = /locale=([\w-]+)/;
var dojoLocale = search.match(localeUrlParamRegex) ? RegExp.$1 : undefined;
window["dojoConfig"] = {
    async: true,
    locale: dojoLocale,
    packages: [
        {
            name: "app",
            location: locationPath + "app"
        }
        // {
        //   name: "resources",
        //   location: "../app/Share/nls/resources"
        // }
    ]
};
//# sourceMappingURL=dojo.js.map