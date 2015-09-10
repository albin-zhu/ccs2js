#{it.defineType + it.Name} = new ccui.ScrollView();
<?js if(it.parent) {?>
#{it.parent}.addChild(#{it.Name});
<?js } ?>
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
var layoutComponent = MyLayout.bindLayoutComponent(#{it.Name});

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
<?js
        var clipEnabled = it.ClipAble || false; ?>
        #{it.Name}.setClippingEnabled(${clipEnabled});
<?js     var bgColorOpacity = it.BackColorAlpha === undefined ? 255 : it.BackColorAlpha;
        var backGroundScale9Enabled = it.Scale9Enable;
        if(backGroundScale9Enabled){ ?>
            #{it.Name}.setBackGroundImageScale9Enabled(true);
<?js
            var scale9OriginX = it.Scale9OriginX || 0;
            var scale9OriginY = it.Scale9OriginY || 0;
            var scale9Width = it.Scale9Width || 0;
            var scale9Height = it.Scale9Height || 0; ?>
            #{it.Name}.setBackGroundImageCapInsets(cc.rect(
                ${scale9OriginX},
                ${scale9OriginY},
                ${scale9Width},
                ${scale9Height}
            ));
<?js } ?>
<?js
var getColor = function(json){
        if(!json) return;
        var r = json["R"] != null ? json["R"] : 255;
        var g = json["G"] != null ? json["G"] : 255;
        var b = json["B"] != null ? json["B"] : 255;
        return "cc.color(" +r + "," + g + "," +  b + ")";
    };
var colorType = it.ComboBoxIndex === undefined ? 0 : it.ComboBoxIndex; ?>
#{it.Name}.setBackGroundColorType(${colorType});
<?js if(colorType == 2) {
 var firstColor = it.FirstColor;
var endColor = it.EndColor;
if(firstColor && endColor) { 
    if(endColor["R"] && endColor["G"] && endColor["B"]) {  ?>
        #{it.Name}.setBackGroundColor(${getColor(firstColor)}, ${getColor(endColor)});
<?js    }  ?>
<?js    if (!(endColor["R"] && endColor["G"] && endColor["B"])){   ?>
        #{it.Name}.setBackGroundColor(${getColor(firstColor)});
<?js    }
}
}
if(colorType == 1){ ?>
    #{it.Name}.setBackGroundColor(${getColor(it.SingleColor)});
<?js } ?>

<?js
        var colorVector = it.ColorVector;
        if(colorVector != null && colorVector["ScaleX"] != null && colorVector["ScaleY"] != null) { ?>
            #{it.Name}.setBackGroundColorVector(cc.p(${colorVector["ScaleX"]}, ${colorVector["ScaleY"]}));
        <?js } ?>						     
<?js        if(bgColorOpacity != null) { ?>
            #{it.Name}.setBackGroundColorOpacity(${bgColorOpacity});
<?js } ?>
<?js var fileData = it.FileData;
if(it.FileData) { ?>
<?js if (it.FileData.Type == "MarkedSubImage") { ?> 
#{it.Name}.setBackGroundImage("#{it.FileData.Path}", 1);
<?js }?>
<?js if (it.FileData.Type != "MarkedSubImage") { ?>
#{it.Name}.setBackGroundImage("res/#{it.FileData.Path}", 0);
<?js } ?>
<?js } ?>
<?js
 var innerNodeSize = it.InnerNodeSize;
var w = innerNodeSize["Width"] || 0;
var h = innerNodeSize["Height"] || 0;
?>
#{it.Name}.setInnerContainerSize(cc.size(${w}, ${h}));
<?js  var direction = 0;
        if(it.ScrollDirectionType == "Vertical") direction = 1;
        if(it.ScrollDirectionType == "Horizontal") direction = 2;
        if(it.ScrollDirectionType == "Vertical_Horizontal") direction = 3; ?>
#{it.Name}.setDirection(${direction});
<?js     var bounceEnabled = it.IsBounceEnabled === undefined ? false : it.IsBounceEnabled;  ?>
#{it.Name}.setBounceEnabled(${bounceEnabled});
#{it.Name}.setContentSize(cc.size(#{it.Size.X || 0}, #{it.Size.Y || 0}));
// custom end
// common
#{it.children}
// #{it.Name} end
