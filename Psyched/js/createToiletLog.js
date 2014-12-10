(function() {
  var app = angular.module('IBD', ["mobile-angular-ui"]);

  app.controller('ToiletLogController', function(){
  	var date = new Date();
    this.time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes();
    // console.log(this.time);
    this.texture = [];
    this.pain = [];

    this.setTexture = function(texture) {
    	this.texture = texture;
    };
    this.textureIsSet = function(texture) {
    	return this.texture == texture;
    };

    this.setPain = function(pain) {
    	this.pain = pain;
    };
    this.painIsSet = function(pain) {
    	return this.pain == pain;
    };
  });
})();