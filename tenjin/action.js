<?js function setEase(options) {
	if(options){
		console.log(options);
	var type = options["Type"]; ?>
frame.setTweenType(${type});
<?js
    var points = options["Points"];
    var result = [];
    if(points){ ?>
    	frame.setEasingParams([
       <?js points.forEach(function(p){ ?>
           	${p.X}, ${p.Y},
   <?js }); ?>
       ]);
<?js   }
 }
} ?>
var action = new ccs.ActionTimeline();
action.setDuration(#{it.Duration});
action.setTimeSpeed(#{it.Speed});
<?js var tags = []; ?>
<?js it.Timelines.forEach(function(timeline){ ?>
<?js tags.push(timeline.ActionTag); ?>
<?js var prop = timeline.Property; ?>
var t = new ccs.Timeline();
t.setActionTag(${timeline.ActionTag});
<?js if(prop == "Position") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.PositionFrame();
<?js setEase(f.EasingData); ?>
frame.setPosition(cc.p(${f.X}, ${f.Y}));
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>
<?js if(prop == "VisibleForFrame") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.VisibleFrame();
frame.setVisible(${f.Value});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "Scale") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.ScaleFrame();
<?js setEase(f.EasingData); ?>
frame.setScaleX(${f.X});
frame.setScaleY(${f.Y});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "Rotation") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.RotationFrame();
<?js setEase(f.EasingData); ?>
frame.setRotation(f.Rotation);
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "Skew") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.SkewFrame();
<?js setEase(f.EasingData); ?>
frame.setSkewX(${f.X});
frame.setSkewY(${f.Y});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "RotationSkew") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.RotationSkewFrame();
<?js setEase(f.EasingData); ?>
frame.setSkewX(${f.X});
frame.setSkewY(${f.Y});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "Anchor") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.AnchorPointFrame();
<?js setEase(f.EasingData); ?>
frame.setAnchorPoint(cc.p(${f.X}, ${f.Y}));
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "InnerAction") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.InnerActionFrame();
<?js setEase(f.EasingData); ?>
frame.setInnerActionType(${f.InnerActionType});
frame.setStartFrameIndex(${f.StartFrame});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "CColor") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.ColorFrame();
<?js setEase(f.EasingData); ?>
frame.setColor(cc.color(${f.Color.R || 255}, ${f.Color.G || 255}, ${f.Color.B || 255}));
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "Alpha") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.AlphaFrame();
<?js setEase(f.EasingData); ?>
frame.setAlpha(${f.Value});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "FileData") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.TextureFrame();
<?js setEase(f.EasingData); ?>
var path = "${f.TextureFile.Path}";
var spriteFrame = cc.spriteFrameCache.getSpriteFrame(path);
if(spriteFrame == null){
    path = "res/" + path;
}
frame.setTextureName(path);
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "FrameEvent") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.EventFrame();
<?js setEase(f.EasingData); ?>
frame.setEvent("${f.Value}");
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "ZOrder") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.ZOrderFrame();
<?js setEase(f.EasingData); ?>
frame.setZOrder(${f.Value});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>

<?js if(prop == "ActionValue") { ?>
<?js timeline.Frames.forEach(function(f){ ?>
var frame = new ccs.InnerActionFrame();
<?js setEase(f.EasingData); ?>
frame.setInnerActionType(ccs.InnerActionType[${f.InnerActionType}]);
frame.setSingleFrameIndex(${f.SingleFrameIndex});
frame.setEnterWithName(true);
frame.setAnimationName(${f.CurrentAniamtionName});
frame.setFrameIndex(${f.FrameIndex});
<?js if(f.Tween!=null){ ?>
frame.setTween(${f.Tween});
<?js } ?>
t.addFrame(frame);
 <?js }); ?>
action.addTimeline(t);
<?js } ?>
<?js }); ?>
var self = this;
action.setFrameEventCallFunc(function(e){
	self.puremvc_event.call(this, e._event, e);
});
this.timeline = action;
<?js var animationlist = it.anims;  animationlist.forEach(function(data){ ?>
this.anims.${data.Name} = [${data.StartIndex}, ${data.EndIndex}];
<?js }); ?>
