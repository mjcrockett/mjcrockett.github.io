(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Avatar = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
	// var _ = require('underscore');
	var C = require('./constants.js');
	
	var Head = require('./head.js');
	
	var UpperBody = require('./upperbody.js');
	
	var LowerBody = require('./lowerbody.js');
	
	var RightLeg = require('./rightleg.js');
	
	var LeftLeg = require('./leftleg.js');
	
	var RightArm = require('./rightarm.js');
	
	var LeftArm = require('./leftarm.js');
	
	module.exports = Avatar;
	
	function Avatar() {
	  //globally available to Avatar
	  this._stage = null;
	  this._hips = null;
	  this._chest = null;
	  this._rightLeg = null;
	  this._leftLeg = null;
	  this._head = null;
	  this._rightArm = null;
	  this._leftArm = null; //private inside this constructor
	
	  var that = this;
	
	  var _fullBody = new createjs.Container();
	
	  var _upperBody = new createjs.Container();
	
	  var _lowerBody = new createjs.Container();
	
	  var _images = {};
	  var numResourcesLoaded = 0;
	  var totalResources = 21;
	  var stageElement = document.getElementById(C.id);
	
	  var resourceLoaded = function () {
		numResourcesLoaded += 1;
	
		if (numResourcesLoaded === totalResources) {
		  this._hips = new LowerBody(_lowerBody, _images['hips']);
		  this._chest = new UpperBody(_upperBody, _images['torso']);
		  this._rightLeg = new RightLeg(_lowerBody, _images['rightthigh'], _images['rightlowerleg'], _images['rightfoot']);
		  this._leftLeg = new LeftLeg(_lowerBody, _images['leftthigh'], _images['leftlowerleg'], _images['leftfoot']);
		  this._head = new Head(_upperBody, _images['head'], _images['eyesprite'], _images['mouthsprite'], _images['neck'], _images['headlookleft'], _images['headlookright']);
		  this._rightArm = new RightArm(_upperBody, _images['rightupperarm'], _images['rightforearm'], _images['righthand']);
		  this._leftArm = new LeftArm(_upperBody, _images['leftupperarm'], _images['leftforearm'], _images['lefthand']);
	
		  let _background = new createjs.Bitmap(_images['chair']);
	
		  this._stage.addChild(_background);
	
		  _background.scaleX = .6;
		  _background.scaleY = .6;
		  _background.x = 300;
		  _background.y = 320;
	
		  _fullBody.addChild(_lowerBody);
	
		  _fullBody.addChild(_upperBody);
	
		  this._stage.addChild(_fullBody);
	
		  _fullBody.x = 200;
		  _fullBody.y = 225;
	
		  this._stage.update(); // createjs.Ticker.addEventListener("tick", createjs.proxy(this._tick, this));
	
	
		  var event = new CustomEvent('avataronready', {
			detail: "I'm good to go!"
		  });
		  window.dispatchEvent(event);
		  stageElement.setAttribute('avatar-attached', true);
		}
	  };
	
	  var loadImage = function (name, address) {
		_images[name] = new Image();
	
		_images[name].onload = function () {
		  resourceLoaded.call(that);
		};
	
		_images[name].src = address;
	  };
	
	  if (!stageElement) {
		var canvas = document.createElement('canvas');
		canvas.width = C.CANVAS_WIDTH;
		canvas.height = C.CANVAS_HEIGHT;
		canvas.id = C.id;
		document.body.appendChild(canvas);
	  }
	
	  this._stage = new createjs.Stage(C.id);
	  createjs.Ticker.framerate = 30;
	  loadImage('eyesprite', C.EYES_SPRITE_IMG);
	  loadImage('head', C.HEAD_IMG);
	  loadImage('headlookleft', C.HEAD_LOOK_LEFT_IMG);
	  loadImage('headlookright', C.HEAD_LOOK_RIGHT_IMG);
	  loadImage('hips', C.HIPS_IMG);
	  loadImage('leftfoot', C.LEFT_FOOT_IMG);
	  loadImage('leftforearm', C.LEFT_FOREARM_IMG);
	  loadImage('lefthand', C.LEFT_HAND_IMG);
	  loadImage('leftlowerleg', C.LEFT_LOWERLEG_IMG);
	  loadImage('leftthigh', C.LEFT_THIGH_IMG);
	  loadImage('leftupperarm', C.LEFT_UPPERARM_IMG);
	  loadImage('mouthsprite', C.MOUTH_SPRITE_IMG);
	  loadImage('neck', C.NECK_IMG);
	  loadImage('rightfoot', C.RIGHT_FOOT_IMG);
	  loadImage('rightforearm', C.RIGHT_FOREARM_IMG);
	  loadImage('righthand', C.RIGHT_HAND_IMG);
	  loadImage('rightlowerleg', C.RIGHT_LOWERLEG_IMG);
	  loadImage('rightthigh', C.RIGHT_THIGH_IMG);
	  loadImage('rightupperarm', C.RIGHT_UPPERARM_IMG);
	  loadImage('torso', C.TORSO_IMG);
	  loadImage('chair', C.CHAIR);
	}
	/**
	* Adjusts the size of the set.
	* @param {number} percent - percent to transform.
	* @returns {void}
	*/
	
	
	Avatar.prototype.transformSet = function (percent) {
	  this._stage.setTransform(0, 0, percent, percent);
	};
	/**
	* Updates the stage with latest changes
	* @returns {void}
	*/
	
	
	Avatar.prototype.updateStage = function () {
	  this._stage.update();
	};
	/**
	* Gives instructions to the avatar.
	* @param {AvatarInstructions} instrux - The instructions to the avatar.
	* @returns {void}
	*/
	
	
	Avatar.prototype.go = function (instrux) {
	  var mouthOpen = instrux.mouthOpen;
	  var headTurn = instrux.headTurn;
	  var eyes = instrux.eyes;
	  var headRotate = instrux.headRotate;
	  var neckRotate = instrux.neckRotate;
	  var headShrug = instrux.headShrug;
	  var hipsRotate = instrux.hipsRotate;
	  var chestRotate = instrux.chestRotate;
	  var footLeftRotate = instrux.footLeftRotate;
	  var legLeftLowerRotate = instrux.legLeftLowerRotate;
	  var legLeftUpperRotate = instrux.legLeftUpperRotate;
	  var footRightRotate = instrux.footRightRotate;
	  var legRightLowerRotate = instrux.legRightLowerRotate;
	  var legRightUpperRotate = instrux.legRightUpperRotate;
	  var handLeftRotate = instrux.handLeftRotate;
	  var armLeftLowerRotate = instrux.armLeftLowerRotate;
	  var armLeftUpperRotate = instrux.armLeftUpperRotate;
	  var leftShrug = instrux.leftShrug;
	  var handRightRotate = instrux.handRightRotate;
	  var armRightLowerRotate = instrux.armRightLowerRotate;
	  var armRightUpperRotate = instrux.armRightUpperRotate;
	  var rightShrug = instrux.rightShrug;
	
	  this._head.instruction(mouthOpen, headTurn, eyes, headRotate, neckRotate, headShrug);
	
	  this._hips.rotate(hipsRotate);
	
	  this._chest.rotate(chestRotate);
	
	  this._leftLeg.instruction(footLeftRotate, legLeftLowerRotate, legLeftUpperRotate);
	
	  this._rightLeg.instruction(footRightRotate, legRightLowerRotate, legRightUpperRotate);
	
	  this._leftArm.instruction(handLeftRotate, armLeftLowerRotate, armLeftUpperRotate, leftShrug);
	
	  this._rightArm.instruction(handRightRotate, armRightLowerRotate, armRightUpperRotate, rightShrug);
	
	  this._stage.update();
	};
	/**
	* Opens and closes the mouth
	* @param {boolean} open - is open
	* @returns {void}
	*/
	
	
	Avatar.prototype.mouthOpen = function (open) {
	  this._head.openMouth(open);
	
	  this._stage.update();
	};
	/**
	* Turns the head a direction
	* @param {string} headTurn - must be one of the following: "front", "left", "right"
	* @returns {void}
	*/
	
	
	Avatar.prototype.headTurn = function (headTurn) {
	  this._head.headTurn(headTurn);
	
	  this._stage.update();
	};
	/**
	* Turns the eyes a direction
	* @param {string} headTurn - must be one of the following: "front", "left", "right", "close"
	* @returns {void}
	*/
	
	
	Avatar.prototype.eyes = function (eyes) {
	  this._head.eyesMove(eyes);
	
	  this._stage.update();
	};
	/**
	* Rotates the head
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.rotateHead = function (degrees) {
	  this._head.rotateHead(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the neck
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.neckRotate = function (degrees) {
	  this._head.rotateNeck(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the hips
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.hipsRotate = function (degrees) {
	  this._hips.rotate(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the chest
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.chestRotate = function (degrees) {
	  this._chest.rotate(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the left foot
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.footLeftRotate = function (degrees) {
	  this._leftLeg.rotateLeftFoot(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the lower left leg
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.legLeftLowerRotate = function (degrees) {
	  this._leftLeg.rotateLeftLower(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the upper left leg
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.legLeftUpperRotate = function (degrees) {
	  this._leftLeg.rotateLeftThigh(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the right foot
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.footRightRotate = function (degrees) {
	  this._rightLeg.rotateRightFoot(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the lower right leg
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.legRightLowerRotate = function (degrees) {
	  this._rightLeg.rotateRightLower(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the upper right leg
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.legRightUpperRotate = function (degrees) {
	  this._rightLeg.rotateRightThigh(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the left hand
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.handLeftRotate = function (degrees) {
	  this._leftArm.rotateLeftHand(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the lower left arm
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.armLeftLowerRotate = function (degrees) {
	  this._leftArm.rotateLeftLower(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the upper left arm
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.armLeftUpperRotate = function (degrees) {
	  this._leftArm.rotateLeftUpper(degrees);
	
	  this._stage.update();
	};
	/**
	* Shrugs the left shoulder
	* @param {number} leftShrug - amount to shrug
	* @returns {void}
	*/
	
	
	Avatar.prototype.leftShrug = function (leftShrug) {
	  this._leftArm.shrug(leftShrug);
	
	  this._stage.update();
	};
	/**
	* Rotates the hright hand
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.handRightRotate = function (degrees) {
	  this._rightArm.rotateRightHand(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the lower right arm
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.armRightLowerRotate = function (degrees) {
	  this._rightArm.rotateRightLower(degrees);
	
	  this._stage.update();
	};
	/**
	* Rotates the upper right arm
	* @param {number} degrees - degrees to rotate
	* @returns {void}
	*/
	
	
	Avatar.prototype.armRightUpperRotate = function (degrees) {
	  this._rightArm.rotateRightUpper(degrees);
	
	  this._stage.update();
	};
	/**
	* Shrugs the right shoulder
	* @param {number} degrees - amount to shrug
	* @returns {void}
	*/
	
	
	Avatar.prototype.rightShrug = function (rightShrug) {
	  this._rightArm.shrug(rightShrug);
	
	  this._stage.update();
	};
	/**
	* Shrugs the head
	* @param {number} degrees - amount to shrug
	* @returns {void}
	*/
	
	
	Avatar.prototype.headShrug = function (headShrug) {
	  this._head.shrug(headShrug);
	
	  this._stage.update();
	};
	/**
	* Destroy the canvas
	* @returns {void}
	*/
	
	
	Avatar.prototype.destroy = function () {
	  this._stage.removeAllChildren();
	
	  this._stage.update();
	
	  this._stage = null;
	  this._hips = null;
	  this._chest = null;
	  this._rightLeg = null;
	  this._leftLeg = null;
	  this._head = null;
	  this._rightArm = null;
	  this._leftArm = null;
	  createjs.Ticker.reset(); // createjs = null;
	
	  Avatar = null;
	  var stageElement = document.getElementById(C.id);
	  stageElement.setAttribute('avatar-attached', false);
	};
	/**
	* Represents a AvatarInstructions.
	* @typedef AvatarInstructions
	* @property {boolean} mouthOpen - Opens or closes the mouth
	* @property {string} headTurn - Turns the head, can be "front", "left", or "right"
	* @property {string} eyes - Controls the eyes, can be "front", "left", "right", or "close"
	* @property {number} headRotate - Rotate the head
	* @property {number} neckRotate - Rotate the neck
	* @property {number} hipsRotate - Rotate the hips
	* @property {number} chestRotate - Rotate the chest
	* @property {number} footLeftRotate - Rotate the left foot
	* @property {number} legLeftLowerRotate - Rotate the lower left leg
	* @property {number} legLeftUpperRotate - Rotate the upper left leg
	* @property {number} footRightRotate - Rotate the right foot
	* @property {number} legRightLowerRotate - Rotate the right lower leg
	* @property {number} legRightUpperRotate - Rotate the right upper leg
	* @property {number} handLeftRotate - Rotate the left hand
	* @property {number} armLeftLowerRotate - Rotate the left lower arm
	* @property {number} armLeftUpperRotate - Rotate the left upper arm
	* @property {number} handRightRotate - Rotate the right hand
	* @property {number} armRightLowerRotate - Rotate the right lower arm
	* @property {number} armRightUpperRotate - Rotate the right upper arm
	* @property {number} rightShrug - Shrug the right shoulder
	* @property {number} leftShrug - Shrug the left shoulder
	* @property {number} headShrug - Shrug the head
	*/
	
	},{"./constants.js":2,"./head.js":3,"./leftarm.js":4,"./leftleg.js":5,"./lowerbody.js":6,"./rightarm.js":7,"./rightleg.js":8,"./upperbody.js":9}],2:[function(require,module,exports){
	module.exports = {
	  id: 'cnvs',
	  CANVAS_WIDTH: 933,
	  CANVAS_HEIGHT: 935,
	  // createjs
	  // cjs: createjs,
	  BODY_WIDTH: 600,
	  BODY_HEIGHT: 600,
	  // images
	  EYES_SPRITE_IMG: 'images/eyeSprite.png',
	  HEAD_IMG: 'images/head.png',
	  //97 X 132
	  HEAD_LOOK_LEFT_IMG: 'images/headLookLeft.png',
	  HEAD_LOOK_RIGHT_IMG: 'images/headLookRight.png',
	  HIPS_IMG: 'images/hips.png',
	  LEFT_FOOT_IMG: 'images/leftFoot.png',
	  LEFT_FOREARM_IMG: 'images/leftForearm.png',
	  LEFT_HAND_IMG: 'images/leftHand.png',
	  LEFT_LOWERLEG_IMG: 'images/leftLowerLeg.png',
	  LEFT_THIGH_IMG: 'images/leftThigh.png',
	  LEFT_UPPERARM_IMG: 'images/leftUpperArm.png',
	  MOUTH_SPRITE_IMG: 'images/mouthSprite.png',
	  NECK_IMG: 'images/neck.png',
	  //52 X 68
	  RIGHT_FOOT_IMG: 'images/rightFoot.png',
	  RIGHT_FOREARM_IMG: 'images/rightForearm.png',
	  RIGHT_HAND_IMG: 'images/rightHand.png',
	  RIGHT_LOWERLEG_IMG: 'images/rightLowerLeg.png',
	  RIGHT_THIGH_IMG: 'images/rightThigh.png',
	  RIGHT_UPPERARM_IMG: 'images/rightUpperArm.png',
	  TORSO_IMG: 'images/torso.png',
	  CHAIR: 'images/chair.png'
	};
	
	},{}],3:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = Head;
	
	function Head(upperBody, _head, _eyes, _mouth, _neck, _lookLeft, _lookRight) {
	  this.shrugVal = 0; //neck 60 X 84
	
	  this.neckContainer = new createjs.Container();
	  var neck = new createjs.Bitmap(_neck);
	  this.neckContainer.addChild(neck);
	  upperBody.addChildAt(this.neckContainer, 0);
	  this.neckContainer.x = 44 + 26;
	  this.neckContainer.y = -40 + 60;
	  this.neckContainer.regX = 26;
	  this.neckContainer.regY = 60; //head 118 X 166
	
	  this.headContainer = new createjs.Container();
	  var head = new createjs.Bitmap(_head);
	  this.headContainer.addChild(head);
	  this.neckContainer.addChild(this.headContainer);
	  this.headContainer.x = -28 + 59;
	  this.headContainer.y = -123 + 135;
	  this.headContainer.regX = 59;
	  this.headContainer.regY = 135; //See http://jsfiddle.net/ZnWuP/ for a great registration point example
	  //headLookLeft 125 X 162
	
	  this.lookLeftContainer = new createjs.Container();
	  var left = new createjs.Bitmap(_lookLeft);
	  this.lookLeftContainer.addChild(left);
	  this.neckContainer.addChild(this.lookLeftContainer);
	  this.lookLeftContainer.visible = false; //default is hidden
	
	  this.lookLeftContainer.x = -18 + 50;
	  this.lookLeftContainer.y = -110 + 90;
	  this.lookLeftContainer.regX = 50;
	  this.lookLeftContainer.regY = 90; //headLookRight 127 X 160
	
	  this.lookRightContainer = new createjs.Container();
	  var right = new createjs.Bitmap(_lookRight);
	  this.lookRightContainer.addChild(right);
	  this.neckContainer.addChild(this.lookRightContainer);
	  this.lookRightContainer.visible = false; //default is hidden
	
	  this.lookRightContainer.x = -45 + 85;
	  this.lookRightContainer.y = -110 + 90;
	  this.lookRightContainer.regX = 85;
	  this.lookRightContainer.regY = 90;
	  var data = {
		images: [_mouth],
		frames: {
		  width: 65,
		  height: 60
		},
		animations: {
		  open: 0,
		  closed: 1
		}
	  };
	  this.mouth = new createjs.Sprite(new createjs.SpriteSheet(data), "closed");
	  this.headContainer.addChild(this.mouth);
	  this.mouth.x = 23;
	  this.mouth.y = 93;
	  data = {
		images: [_eyes],
		frames: {
		  width: 84,
		  height: 30
		},
		animations: {
		  front: 0,
		  closed: 1,
		  right: 2,
		  left: 3
		}
	  };
	  this.eyes = new createjs.Sprite(new createjs.SpriteSheet(data), "front");
	  this.headContainer.addChild(this.eyes);
	  this.eyes.x = 15;
	  this.eyes.y = 56;
	  this._upperBody = upperBody;
	} // Head.prototype = (function () {
	// 	return {
	// 		constuctor: Head,
	//         //public functions go here
	// 	}
	// })();
	
	
	Head.prototype.openMouth = function (open) {
	  if (open) {
		this.mouth.gotoAndStop("open");
	  } else {
		this.mouth.gotoAndStop("closed");
	  }
	};
	
	Head.prototype.eyesClose = function (open) {
	  this.eyes.gotoAndStop("closed");
	};
	
	Head.prototype.eyesLookFront = function () {
	  this.eyes.gotoAndStop("front");
	};
	
	Head.prototype.eyesLookRight = function () {
	  this.eyes.gotoAndStop("right");
	};
	
	Head.prototype.eyesLookLeft = function () {
	  this.eyes.gotoAndStop("left");
	};
	
	Head.prototype.eyesMove = function (eyes) {
	  if (eyes == "left") {
		this.eyesLookLeft();
	  } else if (eyes == "right") {
		this.eyesLookRight();
	  } else if (eyes == "close") {
		this.eyesClose();
	  } else {
		this.eyesLookFront();
	  }
	};
	
	Head.prototype.headLookFront = function () {
	  this.headContainer.visible = true;
	  this.lookLeftContainer.visible = false;
	  this.lookRightContainer.visible = false;
	};
	
	Head.prototype.headLookLeft = function () {
	  this.headContainer.visible = false;
	  this.lookLeftContainer.visible = true;
	  this.lookRightContainer.visible = false;
	};
	
	Head.prototype.headLookRight = function () {
	  this.headContainer.visible = false;
	  this.lookLeftContainer.visible = false;
	  this.lookRightContainer.visible = true;
	};
	
	Head.prototype.headTurn = function (headTurn) {
	  if (headTurn == "left") {
		this.headLookLeft();
	  } else if (headTurn == "right") {
		this.headLookRight();
	  } else {
		this.headLookFront();
	  }
	};
	
	Head.prototype.rotateHeadLookLeft = function (degrees) {
	  this.lookLeftContainer.rotation = degrees;
	};
	
	Head.prototype.rotateHeadLookRight = function (degrees) {
	  this.lookRightContainer.rotation = degrees;
	};
	
	Head.prototype.rotateHead = function (degrees) {
	  this.headContainer.rotation = degrees;
	  this.rotateHeadLookLeft(degrees);
	  this.rotateHeadLookRight(degrees);
	};
	
	Head.prototype.rotateNeck = function (degrees) {
	  this.neckContainer.rotation = degrees;
	};
	
	Head.prototype.shrug = function (amount) {
	  this.headContainer.y -= this.shrugVal;
	  this.shrugVal = amount;
	  this.headContainer.y += this.shrugVal;
	};
	/*
		parameters must follow the convention:
		headTurn - one of the following strings, "front", "left", "right"
		headRotate - any number,
		mouthOpen - a boolean value,
		eyes - one of the following strings, "front", "left", "right", "close"
		neckRotate - any number,
	*/
	
	
	Head.prototype.instruction = function (mouthOpen, headTurn, eyes, headRotate, neckRotate, headShrug) {
	  headRotate = !headRotate ? 0 : headRotate;
	  neckRotate = !neckRotate ? 0 : neckRotate;
	  this.headTurn(headTurn);
	  this.rotateHead(headRotate);
	  this.eyesMove(eyes);
	  this.openMouth(mouthOpen);
	  this.rotateNeck(neckRotate);
	  this.shrug(headShrug);
	};
	
	},{"./constants.js":2}],4:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = LeftArm;
	
	function LeftArm(upperBody, _lUpper, _lLower, _lHand) {
	  this.shrugVal = 0; //Upper 115 X 191
	
	  this.lUpperContainer = new createjs.Container();
	  var lUpper = new createjs.Bitmap(_lUpper);
	  this.lUpperContainer.addChild(lUpper);
	  upperBody.addChild(this.lUpperContainer);
	  this.lUpperContainer.x = 112 + 20;
	  this.lUpperContainer.y = 12 + 12;
	  this.lUpperContainer.regX = 20;
	  this.lUpperContainer.regY = 12; //lower 93 X 111
	
	  this.lLowerContainer = new createjs.Container();
	  var lLower = new createjs.Bitmap(_lLower);
	  this.lLowerContainer.addChild(lLower);
	  this.lUpperContainer.addChild(this.lLowerContainer);
	  this.lLowerContainer.x = 30 + 65;
	  this.lLowerContainer.y = 145 + 25;
	  this.lLowerContainer.regX = 65;
	  this.lLowerContainer.regY = 25; //hand 82 X 101
	
	  this.lHandContainer = new createjs.Container();
	  var lHand = new createjs.Bitmap(_lHand);
	  this.lHandContainer.addChild(lHand);
	  this.lLowerContainer.addChildAt(this.lHandContainer, 0);
	  this.lHandContainer.x = -30 + 65;
	  this.lHandContainer.y = 56 + 20;
	  this.lHandContainer.regX = 65;
	  this.lHandContainer.regY = 20;
	  this._upperBody = upperBody;
	}
	
	LeftArm.prototype.rotateLeftHand = function (degrees) {
	  this.lHandContainer.rotation = degrees;
	};
	
	LeftArm.prototype.rotateLeftLower = function (degrees) {
	  this.lLowerContainer.rotation = degrees;
	};
	
	LeftArm.prototype.rotateLeftUpper = function (degrees) {
	  this.lUpperContainer.rotation = degrees;
	};
	
	LeftArm.prototype.shrug = function (amount) {
	  this.lUpperContainer.y -= this.shrugVal;
	  this.shrugVal = amount;
	  this.lUpperContainer.y += this.shrugVal;
	};
	/*
		parameters must follow the convention:
		footRotate - any number,
		lowerRotate - any number,
		upperRotate - any number,
		shrug - any number
	*/
	
	
	LeftArm.prototype.instruction = function (handRotate, lowerRotate, upperRotate, shrug) {
	  handRotate = !handRotate ? 0 : handRotate;
	  lowerRotate = !lowerRotate ? 0 : lowerRotate;
	  upperRotate = !upperRotate ? 0 : upperRotate;
	  this.rotateLeftHand(handRotate);
	  this.rotateLeftLower(lowerRotate);
	  this.rotateLeftUpper(upperRotate);
	  this.shrug(shrug);
	};
	
	},{"./constants.js":2}],5:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = LeftLeg;
	
	function LeftLeg(lowerBody, _lThigh, _lLowerLeg, _lFoot) {
	  //thigh 138 X 117
	  this.lThighContainer = new createjs.Container();
	  var lThigh = new createjs.Bitmap(_lThigh);
	  this.lThighContainer.addChild(lThigh);
	  lowerBody.addChild(this.lThighContainer);
	  this.lThighContainer.x = 80 + 15;
	  this.lThighContainer.y = 2 + 30;
	  this.lThighContainer.regX = 15;
	  this.lThighContainer.regY = 30; //lower 91 X 235
	
	  this.lLowerContainer = new createjs.Container();
	  var lLower = new createjs.Bitmap(_lLowerLeg);
	  this.lLowerContainer.addChild(lLower);
	  this.lThighContainer.addChild(this.lLowerContainer);
	  this.lLowerContainer.x = 64 + 50;
	  this.lLowerContainer.y = 37 + 28;
	  this.lLowerContainer.regX = 50;
	  this.lLowerContainer.regY = 28; //foot 135 X 130
	
	  this.lFootContainer = new createjs.Container();
	  var lFoot = new createjs.Bitmap(_lFoot);
	  this.lFootContainer.addChild(lFoot);
	  this.lLowerContainer.addChildAt(this.lFootContainer, 0);
	  this.lFootContainer.x = 5 + 30;
	  this.lFootContainer.y = 185 + 15;
	  this.lFootContainer.regX = 30;
	  this.lFootContainer.regY = 15;
	  this._lowerBody = lowerBody;
	} // Head.prototype = (function () {
	// 	return {
	// 		constuctor: Head,
	//         //public functions go here
	// 	}
	// })();
	
	
	LeftLeg.prototype.rotateLeftFoot = function (degrees) {
	  this.lFootContainer.rotation = degrees;
	};
	
	LeftLeg.prototype.rotateLeftLower = function (degrees) {
	  this.lLowerContainer.rotation = degrees;
	};
	
	LeftLeg.prototype.rotateLeftThigh = function (degrees) {
	  this.lThighContainer.rotation = degrees;
	};
	/*
		parameters must follow the convention:
		footRotate - any number,
		lowerRotate - any number,
		upperRotate - any number,
	*/
	
	
	LeftLeg.prototype.instruction = function (footRotate, lowerRotate, upperRotate) {
	  footRotate = !footRotate ? 0 : footRotate;
	  lowerRotate = !lowerRotate ? 0 : lowerRotate;
	  upperRotate = !upperRotate ? 0 : upperRotate;
	  this.rotateLeftFoot(footRotate);
	  this.rotateLeftLower(lowerRotate);
	  this.rotateLeftThigh(upperRotate);
	};
	
	},{"./constants.js":2}],6:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = LowerBody;
	
	function LowerBody(lowerBody, _hips) {
	  //hips 116 X 87
	  var hips = new createjs.Bitmap(_hips);
	  lowerBody.addChild(hips);
	  var b = lowerBody.getBounds();
	  lowerBody.x = (C.BODY_WIDTH - b.width) / 2 + 58;
	  lowerBody.y = 310 + 15;
	  lowerBody.regX = 58;
	  lowerBody.regY = 15;
	  this._lowerBody = lowerBody;
	}
	
	LowerBody.prototype.rotate = function (degrees) {
	  this._lowerBody.rotation = degrees;
	};
	
	},{"./constants.js":2}],7:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = RightArm;
	
	function RightArm(upperBody, _rUpper, _rLower, _rHand) {
	  this.shrugVal = 0; //Upper 93 X 197
	
	  this.rUpperContainer = new createjs.Container();
	  var rUpper = new createjs.Bitmap(_rUpper);
	  this.rUpperContainer.addChild(rUpper);
	  upperBody.addChild(this.rUpperContainer);
	  this.rUpperContainer.x = -55 + 65;
	  this.rUpperContainer.y = 14 + 15;
	  this.rUpperContainer.regX = 65;
	  this.rUpperContainer.regY = 15; //lower 96 X 110
	
	  this.rLowerContainer = new createjs.Container();
	  var rLower = new createjs.Bitmap(_rLower);
	  this.rLowerContainer.addChild(rLower);
	  this.rUpperContainer.addChild(this.rLowerContainer);
	  this.rLowerContainer.x = -2 + 19;
	  this.rLowerContainer.y = 148 + 25;
	  this.rLowerContainer.regX = 19;
	  this.rLowerContainer.regY = 25; //hand 72 X 110
	
	  this.rHandContainer = new createjs.Container();
	  var rHand = new createjs.Bitmap(_rHand);
	  this.rHandContainer.addChild(rHand);
	  this.rLowerContainer.addChildAt(this.rHandContainer, 0);
	  this.rHandContainer.x = 43 + 18;
	  this.rHandContainer.y = 53 + 28;
	  this.rHandContainer.regX = 18;
	  this.rHandContainer.regY = 28;
	  this._upperBody = upperBody;
	}
	
	RightArm.prototype.rotateRightHand = function (degrees) {
	  this.rHandContainer.rotation = degrees;
	};
	
	RightArm.prototype.rotateRightLower = function (degrees) {
	  this.rLowerContainer.rotation = degrees;
	};
	
	RightArm.prototype.rotateRightUpper = function (degrees) {
	  this.rUpperContainer.rotation = degrees;
	};
	
	RightArm.prototype.shrug = function (amount) {
	  this.rUpperContainer.y -= this.shrugVal;
	  this.shrugVal = amount;
	  this.rUpperContainer.y += this.shrugVal;
	};
	/*
		parameters must follow the convention:
		footRotate - any number,
		lowerRotate - any number,
		upperRotate - any number,
		shrug - any number
	*/
	
	
	RightArm.prototype.instruction = function (handRotate, lowerRotate, upperRotate, shrug) {
	  handRotate = !handRotate ? 0 : handRotate;
	  lowerRotate = !lowerRotate ? 0 : lowerRotate;
	  upperRotate = !upperRotate ? 0 : upperRotate;
	  this.rotateRightHand(handRotate);
	  this.rotateRightLower(lowerRotate);
	  this.rotateRightUpper(upperRotate);
	  this.shrug(shrug);
	};
	
	},{"./constants.js":2}],8:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = RightLeg;
	
	function RightLeg(lowerBody, _rThigh, _rLowerLeg, _rFoot) {
	  //thigh 134 X 117
	  this.rThighContainer = new createjs.Container();
	  var rThigh = new createjs.Bitmap(_rThigh);
	  this.rThighContainer.addChild(rThigh);
	  lowerBody.addChild(this.rThighContainer);
	  this.rThighContainer.x = 109 - 95;
	  this.rThighContainer.y = 10 + 30;
	  this.rThighContainer.regX = 95;
	  this.rThighContainer.regY = 30; //lower 95 X 232
	
	  this.rLowerContainer = new createjs.Container();
	  var rLower = new createjs.Bitmap(_rLowerLeg);
	  this.rLowerContainer.addChild(rLower);
	  this.rThighContainer.addChild(this.rLowerContainer);
	  this.rLowerContainer.x = -12 + 33;
	  this.rLowerContainer.y = 31 + 30;
	  this.rLowerContainer.regX = 33;
	  this.rLowerContainer.regY = 30; //foot 139 X 123
	
	  this.rFootContainer = new createjs.Container();
	  var rFoot = new createjs.Bitmap(_rFoot);
	  this.rFootContainer.addChild(rFoot);
	  this.rLowerContainer.addChildAt(this.rFootContainer, 0);
	  this.rFootContainer.x = -50 + 95;
	  this.rFootContainer.y = 190 + 17;
	  this.rFootContainer.regX = 95;
	  this.rFootContainer.regY = 17;
	  this._lowerBody = lowerBody;
	}
	
	RightLeg.prototype.rotateRightFoot = function (degrees) {
	  this.rFootContainer.rotation = degrees;
	};
	
	RightLeg.prototype.rotateRightLower = function (degrees) {
	  this.rLowerContainer.rotation = degrees;
	};
	
	RightLeg.prototype.rotateRightThigh = function (degrees) {
	  this.rThighContainer.rotation = degrees;
	};
	/*
		parameters must follow the convention:
		footRotate - any number,
		lowerRotate - any number,
		upperRotate - any number,
	*/
	
	
	RightLeg.prototype.instruction = function (footRotate, lowerRotate, upperRotate) {
	  footRotate = !footRotate ? 0 : footRotate;
	  lowerRotate = !lowerRotate ? 0 : lowerRotate;
	  upperRotate = !upperRotate ? 0 : upperRotate;
	  this.rotateRightFoot(footRotate);
	  this.rotateRightLower(lowerRotate);
	  this.rotateRightThigh(upperRotate);
	};
	
	},{"./constants.js":2}],9:[function(require,module,exports){
	var C = require('./constants.js');
	
	module.exports = UpperBody;
	
	function UpperBody(upperBody, torso) {
	  //torso 132 X 193 
	  var torso = new createjs.Bitmap(torso);
	  upperBody.addChild(torso);
	  var b = upperBody.getBounds();
	  upperBody.x = (C.BODY_WIDTH - b.width) / 2 + 80;
	  upperBody.y = 85 + 200;
	  upperBody.regX = 80;
	  upperBody.regY = 200;
	  this._upperBody = upperBody;
	}
	
	UpperBody.prototype.rotate = function (degrees) {
	  this._upperBody.rotation = degrees;
	};
	
	},{"./constants.js":2}]},{},[1])(1)
	});