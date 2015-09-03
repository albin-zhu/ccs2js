#{it.Name} = new ccui.CheckBox();
// attr
#{it.Name}.setCascadeColorEnabled(true);
#{it.Name}.setCascadeOpacityEnabled(true);
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
<?js if(it.color) { ?>
#{it.Name}.setColor(#{it.color});
<?js } ?>
#{it.Name}.setContentSize(cc.size(#{it.Size.X || 0}, #{it.Size.Y || 0}));
<?js if (it.Alpha != null) { ?>
#{it.Name}.setOpacity(#{it.Alpha});
 <?js } ?>
#{it.Name}.setTag(#{it.Tag || 0 });
<?js var actionTag = it.ActionTag || 0; ?>
var extensionData = new ccs.ObjectExtensionData();
<?js var customProperty = it.UserData;
if(customProperty !== undefined) { ?>
extensionData.setCustomProperty(${customProperty});
<?js } ?>
extensionData.setActionTag(${actionTag});
#{it.Name}.setUserObject(extensionData);
#{it.Name}.setTouchEnabled(#{it.TouchEnable || false});
<?js  var callBackType = it.CallBackType;  if(callBackType != null) {?>
#{it.Name}.setCallbackType("${callBackType}");
<?js } ?>
<?js  var callBackName = it.CallBackName;  if(callBackName != null) {?>
#{it.Name}.setCallbackName("${callBackName}");
<?js } ?>
var layoutComponent = ccui.LayoutComponent.bindLayoutComponent(#{it.Name});
<?js if (it.PositionPercentXEnable && it.PrePosition) { ?>
layoutComponent.setPositionPercentXEnabled(true);
layoutComponent.setPositionPercentX(#{it.PrePosition.X || 0});
<?js } ?>
<?js if (it.PositionPercentYEnable && it.PrePosition) { ?>
layoutComponent.setPositionPercentYEnabled(true);
layoutComponent.setPositionPercentY(#{it.PrePosition.Y || 0});
<?js } ?>
<?js if(it.PercentWidthEnable && it.PreSize) { ?>
layoutComponent.setPercentWidthEnabled(true);
layoutComponent.setPercentWidth(#{it.PreSize.X  || 0});
<?js } ?>
<?js if(it.PercentHeightEnable && it.PreSize) { ?>
layoutComponent.setPercentHeightEnabled(true);
layoutComponent.setPercentHeight(#{it.PreSize.Y  || 0});
<?js } ?>
layoutComponent.setStretchWidthEnabled(#{it.StretchWidthEnable|| false});
layoutComponent.setStretchHeightEnabled(#{it.StretchHeightEnable|| false});

<?js if(it.HorizontalEdge == "LeftEdge") {?>
layoutComponent.setHorizontalEdge(ccui.LayoutComponent.horizontalEdge.LEFT);
<?js } ?>
<?js if(it.HorizontalEdge == "RightEdge") {?>
layoutComponent.setHorizontalEdge(ccui.LayoutComponent.horizontalEdge.RIGHT);
<?js } ?>
<?js if(it.HorizontalEdge == "BothEdge") {?>
layoutComponent.setHorizontalEdge(ccui.LayoutComponent.horizontalEdge.CENTER);
<?js } ?>
<?js if(!it.HorizontalEdge) {?>
layoutComponent.setHorizontalEdge(ccui.LayoutComponent.horizontalEdge.NONE);
<?js } ?>
<?js if(it.VerticalEdge == "TopEdge") {?>
layoutComponent.setVerticalEdge(ccui.LayoutComponent.verticalEdge.TOP);
<?js } ?>
<?js if(it.VerticalEdge == "BottomEdge") {?>
layoutComponent.setVerticalEdge(ccui.LayoutComponent.verticalEdge.BOTTOM);
<?js } ?>
<?js if(it.VerticalEdge == "BothEdge") {?>
layoutComponent.setVerticalEdge(ccui.LayoutComponent.verticalEdge.CENTER);
<?js } ?>
<?js if(!it.VerticalEdge) {?>
layoutComponent.setVerticalEdge(ccui.LayoutComponent.verticalEdge.NONE);
<?js } ?>
layoutComponent.setTopMargin(#{it.TopMargin || 0});
layoutComponent.setBottomMargin( #{it.BottomMargin || 0});
layoutComponent.setLeftMargin(#{it.LeftMargin || 0});
layoutComponent.setRightMargin(#{it.RightMargin || 0});
layoutComponent.refreshLayout();
//attr end
//custom
<?js  var dataList = [
            {name: "NormalBackFileData", handle: "loadTextureBackGround"},
            {name: "PressedBackFileData", handle: "loadTextureBackGroundSelected"},
            {name: "NodeNormalFileData", handle: "loadTextureFrontCross"},
            {name: "DisableBackFileData", handle: "loadTextureBackGroundDisabled"},
            {name: "NodeDisableFileData", handle: "loadTextureFrontCrossDisabled"}
        ];
dataList.forEach(function(data){
var j = it[data.name];
 ?>
<?js if (j.Type == "MarkedSubImage") { ?> 
#{it.Name}.${data.handle}("${j.Path}", 1);
<?js }?>
<?js if (j.Type != "MarkedSubImage") { ?>
#{it.Name}.${data.handle}("res/${j.Path}", 0);
<?js }?>		 
<?js }); ?>
<?js 
        var selectedState = it.CheckedState === undefined ? false : it.CheckedState; ?>
#{it.Name}.setSelected(${selectedState});
<?js 
       var displaystate = it.DisplayState === undefined ? true : it.DisplayState; ?>
#{it.Name}.setBright(${displaystate});
#{it.Name}.setEnabled(${displaystate});
// custom end
// common
#{it.children}
<?js if(it.parent) {?>
#{it.parent}.addChild(#{it.Name});
<?js } ?>
// #{it.Name} end
