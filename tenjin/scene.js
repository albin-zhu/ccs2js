// file nmae : #{it.Name}.js
// auto generated, do not modify this file, you can extend this to add new features
var #{it.Name} = cc.#{it.Class}.extend({
    timeline : null,
    anims : {},
    ctor : function() {
	this._super();
	this.setContentSize(cc.winSize);
        #{it.anims}
        #{it.children}
	return true;
    },
    onEnter: function(e) {
	if(#{it.Name}.map) {
	    #{it.Name}.map(this);
	}
	this._super();
	this.runAction(this.timeline);
    },
    playAnim : function(animName, loop, reverse) {
	loop = loop || false;
	var info = this.anims[animName];
	if(info){
	    this.timeline.gotoFrameAndPlay(info[0] || 0, info[1] - 1 || 0, reverse ? info[0] : this.timeline.getCurrentFrame(), loop);
	}
    }
});
#{it.Name}.resources = [
<?js for(var i = 0; i < it.resources.length; i++) { ?>
    "res/#{it.resources[i]}" <?js if(i != it.resources.length - 1) { ?>,<?js } ?>						    
<?js } ?>
];
#{it.Name}.extend = cc.Class.extend;

