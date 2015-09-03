#{it.defineType + it.Name} = new cc.Sprite();
<?js if (it.FileData.Type == "MarkedSubImage") { ?> 
var spriteFrame = cc.spriteFrameCache.getSpriteFrame("#{it.FileData.Path}");
#{it.Name}.setSpriteFrame(spriteFrame);<?js }?>
<?js if (it.FileData.Type != "MarkedSubImage") { ?>#{it.Name}.setTexture("res/#{it.FileData.Path}");<?js } ?>
<?js if (it.FlipY) { ?>#{it.Name}.setFlippedY(true);<?js } ?>
<?js if (it.FlipX) { ?>#{it.Name}.setFlippedX(true);<?js } ?>
<?js if (it.Position) { ?>
<?js var position = it.Position; ?>
#{it.Name}.setPosition(cc.p(${position.X || 0}, ${position.Y || 0}));
<?js } ?>
<?js var scale = it.Scale;  if(scale != null){ ?>
#{it.Name}.setScaleX(${scale.ScaleX || 1});
#{it.Name}.setScaleY(${scale.ScaleY || 1});
 <?js } ?>
<?js  var rotationSkewX = it.RotationSkewX;  if (rotationSkewX != null){ ?>
 #{it.Name}.setRotationX(${rotationSkewX});
 <?js } ?>
<?js  var rotationSkewY = it.RotationSkewY;  if (rotationSkewY) { ?>
 #{it.Name}.setRotationY(${rotationSkewY});
 <?js } ?>
<?js  var anchor = it.AnchorPoint;    if(anchor != null){ ?>
 #{it.Name}.setAnchorPoint(cc.p(${anchor.ScaleX || 0}, ${anchor.ScaleY || 0}));
 <?js } ?>
<?js  if (it.ZOrder != null) { ?>
#{it.Name}.setLocalZOrder(#{it.ZOrder});
 <?js } ?>
<?js if(it.VisibleForFrame == false) { ?>
#{it.Name}.setVisible(false);
 <?js } ?>
#{it.Name}.setContentSize(cc.size(#{it.Size.X || 0}, #{it.Size.Y || 0}));
<?js if (it.Alpha != null) { ?>
#{it.Name}.setOpacity(#{it.Alpha});
 <?js } ?>
#{it.Name}.setTag(#{it.Tag || 0 });
#{it.Name}.setUserObject(new ccs.ActionTimelineData(#{it.ActionTag || 0 }));
#{it.Name}.runAction(this.timeline);
 #{it.Name}.setCascadeColorEnabled(true);
#{it.Name}.setCascadeOpacityEnabled(true);
<?js if (it.color) { ?>
#{it.Name}.setColor(#{it.color});
<?js } ?>
<?js if(it.parent) {?>
#{it.parent}.addChild(#{it.Name});
<?js } ?>
#{it.children}
// #{it.Name} end
     
