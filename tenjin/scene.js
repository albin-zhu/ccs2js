// file nmae : #{it.Name}.js
// auto generated, do not modify this file, you can extend this to add new features

var auto = auto || {};
auto.#{it.Name} = cc.#{it.Class}.extend({
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
auto.#{it.Name}.extend = cc.Class.extend;

