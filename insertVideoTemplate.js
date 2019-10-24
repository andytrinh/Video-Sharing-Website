(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['insertVideo'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"video-container\">\r\n  <div class=\"video\">\r\n    <h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    <iframe width=\"960\" height=\"540\" src=\"https://www.youtube.com/embed/"
    + alias4(((helper = (helper = helpers.videoId || (depth0 != null ? depth0.videoId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"videoId","hash":{},"data":data}) : helper)))
    + "\" frameborder=\"0\" allowfullscreen></iframe>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();