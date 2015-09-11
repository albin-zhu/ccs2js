#!/usr/bin/env node
// file nmae : test.js
// author : albin
// created at : Mon Jul 13 14:26:58 2015
// Copyright © albin.
//

var tenjin = require('tenjin');
var path = require('path');
require('fs');
var program = require('commander');
var fs = require('fs');
var template = "tenjin";

program
    .version(JSON.parse(fs.readFileSync(path.resolve(__dirname,"package.json"))).version)
    .option('-s, --src <n>', '指定的json文件')
    .option('-d, --dest <n>', '生成文件的路径')
    .parse(process.argv);

cc = {};
cc.size = function (w, h) {
    if (w === undefined)
        return {width: 0, height: 0};
    if (h === undefined)
        return {width: w.width, height: w.height};
    return {width: w, height: h};
};
var ClassManager = {
    id : (0|(Math.random()*998)),
    instanceId : (0|(Math.random()*998)),
    getNewID : function(){
        return this.id++;
    },
    getNewInstanceId : function(){
        return this.instanceId++;
    }
};
cc.Class = function(){};
cc.Class.extend = function (prop) {
    var _super = this.prototype;
    initializing = true;
    var prototype = Object.create(_super);
    initializing = false;
    fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    for (var name in prop) {
        prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function (name, fn) {
                return function () {
                    var tmp = this._super;
                    this._super = _super[name];
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) :
        prop[name];
    }
    function Class() {
        if (!initializing) {
            if (!this.ctor) {
                if (this.__nativeObj)
                    cc.log("No ctor function found! Please check whether `classes_need_extend` section in `ini` file like which in `tools/tojs/cocos2dx.ini`");
            }
            else {
                this.ctor.apply(this, arguments);
            }
        }
    }

    var classId = ClassManager.getNewID();
    ClassManager[classId] = _super;
    var desc = { writable: true, enumerable: false, configurable: true };
    Class.id = classId;
    desc.value = classId;
    Object.defineProperty(prototype, '__pid', desc);
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.extend = arguments.callee;
    return Class;
};

var Scene = cc.Class.extend({
    template : 'scene.js',
    context : null,
    ctor : function(data) {
	this.context = data.Content.Content.ObjectData;
	this.context.resources = data.Content.Content.UsedResources;
	this.context.Name = data.Name;
	this.context.Class = data.Type;
	if(data.Content.Content.AnimationList)
	    this.context.anims = (new Action(data.Content.Content)).render();
	else
	    this.context.anims = "";
	
	var children = this.context.Children;
	if(children){
	    this.context.children = "// children list \n";
	    this.generatChildren(children);
	}
	else{
	    this.context.children = "";
	}
    },

    generatChildren : function(children) {
	var child = null;
	for(var i = 0; i < children.length; i++) {
	    child = children[i];
	    var parser = register[child.ctype];
	    if(parser){
		var t = new parser(child, "this");
		this.context.children += t.render();
	    }
	}
    },
    render : function() {
	var templatePath = path.resolve(__dirname, path.join(template, this.template));
	return tenjin.render(fs.readFileSync(templatePath).toString(), this.context).replace(/\n[\s| ]*\n/g,"\n");
    }
});

Scene.extend = cc.Class.extend;
var Node = Scene.extend({
    ctor : function(data,parent, type) {
	this.context = data;
	if(this.context.Name[0] == '_') 
	{
	    this.context.defineType = "";
	    this.context.Name = "this." + this.context.Name;
	}
	else{
	    this.context.defineType = "var ";
	}
	this.context.parent = parent;
	this.context.parentType = type;
	if(this.context.CColor != null){
	    this.context.color = this.getColor(this.context.CColor)
	}
	var children = this.context.Children;

	if(children){
	    this.context.children = "// children list \n";
	    this.generatChildren(children);
	}
	else{
	    this.context.children = "";
	}
    },
    getColor : function(json){
        if(!json) return "";
        var r = json["R"] != null ? json["R"] : 255;
        var g = json["G"] != null ? json["G"] : 255;
        var b = json["B"] != null ? json["B"] : 255;
        return "cc.color(" + r + "," +  g + "," + b +")";
    },
    generatChildren : function(children) {
	var child = null;
	for(var i = 0; i < children.length; i++) {
	    child = children[i];
	    var parser = register[child.ctype];
	    if(parser){
		var t = new parser(child, this.context.Name, this.context.ctype);
		this.context.children += t.render();
	    }
	}
    },
});
Node.extend = Scene.extend;

var Action = Node.extend({
    template : "action.js",
    ctor : function(data, node) {
	this.context = data.Animation;
	this.context.anims = data.AnimationList;
    }
});

var Sprite = Node.extend({
    ctype : 'ImageViewObjectData',
    template : 'sprite.js'
});

var Particle = Node.extend();
var Panel = Node.extend({
    template : "panel.js"
});
var Text = Node.extend({
    template : "text.js",
    ctor : function(data, p){
	this._super(data, p);
	if(this.context.TextColor != null){
	    this.context.textColor = this.getColor(this.context.TextColor);
	}
    }
});
var Button = Node.extend({
    template : "button.js",
    ctor : function(data, p){
	this._super(data, p);
	if(this.context.TextColor != null){
	    this.context.textColor = this.getColor(this.context.TextColor);
	}
    }
});
var CheckBox = Node.extend({
    template : "checkbox.js"
});
var ScrollView = Node.extend({
    template : "scrollview.js"
});
var ImageView = Node.extend({
    template : 'imageview.js'
});
var LoadingBar = Node.extend({
    template : "loadingbar.js"
});
var Slider = Node.extend({
    template : "slider.js"
});
var PageView = Node.extend({
    template : "pageview.js"
});
var ListView = Node.extend({
    template : "listview.js"
});
var TextAtlas = Node.extend();
var TextBMFont = Node.extend({
    template : "textbmfont.js"
});
var TextField = Node.extend({
    template : "textfield.js"
});
var SimpleAudio = Node.extend();
var GameMap = Node.extend();
var ProjectNode = Node.extend();
var Armature = Node.extend();

var Custom = Node.extend({
    template : "custom.js",
    ctor : function(data, parent) {
        this._super(data, parent);
        var p = path.basename(data.FileData.Path).split('.')[0];
        this.context.classType = p;
        genNode(data.FileData.Path, program.dest);
    }
});

var register = {
    "SingleNodeObjectData" : Node,
    "LayerObjectData" : Node,
    "SpriteObjectData": Sprite,
    "ParticleObjectData": Particle,
    "PanelObjectData": Panel,
    "TextObjectData": Text,
    "ButtonObjectData": Button,
    "CheckBoxObjectData": CheckBox,
    "ScrollViewObjectData": ScrollView,
    "ImageViewObjectData": ImageView,
    "LoadingBarObjectData": LoadingBar,
    "SliderObjectData": Slider,
    "PageViewObjectData": PageView,
    "ListViewObjectData": ListView,
    "TextAtlasObjectData": TextAtlas,
    "TextBMFontObjectData": TextBMFont,
    "TextFieldObjectData": TextField,
    "SimpleAudioObjectData": SimpleAudio,
    "GameMapObjectData": GameMap,
    "ProjectNodeObjectData": Custom,
    "ArmatureNodeObjectData": Armature
}

var genNode = function(src, dest) {
    var pathToSceneJson = path.resolve(src);
    var data = JSON.parse(fs.readFileSync(pathToSceneJson).toString());
    var timelines = data.Content.Content.Animation.Timelines;
    timelines.forEach(function(t){
        console.log(t.ActionTag);
    });
    var n = new Scene(data);
    fs.writeFileSync(path.join(dest, n.context.Name + ".js"),n.render());
}

if(!program.src || !program.dest) {
    console.log("Please define the json path and export path, read more http://albin.ga/cocos/ccs2js/");
    require('openurl').open("http://albin.ga/cocos/ccs2js/");
}else{
    var src = program.src;
    if(src.match(/\w+\.json/))
    {
	console.log("generate " + src);
	genNode(src, program.dest);
    }
    else {
	files = fs.readdirSync(src);
	files.forEach(function(item) {
	    if(item.match(/\w+\.json/))
	    {
		console.log("generate " + src);
		genNode(path.join(src, item), program.dest);
	    }
	});
    }
}
