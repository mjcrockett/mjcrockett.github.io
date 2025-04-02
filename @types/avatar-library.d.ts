declare module "constants" {
    export let id: string;
    export let CANVAS_WIDTH: number;
    export let CANVAS_HEIGHT: number;
    export let BODY_WIDTH: number;
    export let BODY_HEIGHT: number;
    export let EYES_SPRITE_IMG: string;
    export let HEAD_IMG: string;
    export let HEAD_LOOK_LEFT_IMG: string;
    export let HEAD_LOOK_RIGHT_IMG: string;
    export let HIPS_IMG: string;
    export let LEFT_FOOT_IMG: string;
    export let LEFT_FOREARM_IMG: string;
    export let LEFT_HAND_IMG: string;
    export let LEFT_LOWERLEG_IMG: string;
    export let LEFT_THIGH_IMG: string;
    export let LEFT_UPPERARM_IMG: string;
    export let MOUTH_SPRITE_IMG: string;
    export let NECK_IMG: string;
    export let RIGHT_FOOT_IMG: string;
    export let RIGHT_FOREARM_IMG: string;
    export let RIGHT_HAND_IMG: string;
    export let RIGHT_LOWERLEG_IMG: string;
    export let RIGHT_THIGH_IMG: string;
    export let RIGHT_UPPERARM_IMG: string;
    export let TORSO_IMG: string;
    export let CHAIR: string;
}
declare module "head" {
    export = Head;
    function Head(upperBody: any, _head: any, _eyes: any, _mouth: any, _neck: any, _lookLeft: any, _lookRight: any): void;
    class Head {
        constructor(upperBody: any, _head: any, _eyes: any, _mouth: any, _neck: any, _lookLeft: any, _lookRight: any);
        shrugVal: number;
        neckContainer: createjs.Container;
        headContainer: createjs.Container;
        lookLeftContainer: createjs.Container;
        lookRightContainer: createjs.Container;
        mouth: createjs.Sprite;
        eyes: createjs.Sprite;
        _upperBody: any;
        openMouth(open: any): void;
        eyesClose(open: any): void;
        eyesLookFront(): void;
        eyesLookRight(): void;
        eyesLookLeft(): void;
        eyesMove(eyes: any): void;
        headLookFront(): void;
        headLookLeft(): void;
        headLookRight(): void;
        headTurn(headTurn: any): void;
        rotateHeadLookLeft(degrees: any): void;
        rotateHeadLookRight(degrees: any): void;
        rotateHead(degrees: any): void;
        rotateNeck(degrees: any): void;
        shrug(amount: any): void;
        instruction(mouthOpen: any, headTurn: any, eyes: any, headRotate: any, neckRotate: any, headShrug: any): void;
    }
}
declare module "upperbody" {
    export = UpperBody;
    function UpperBody(upperBody: any, torso: any): void;
    class UpperBody {
        constructor(upperBody: any, torso: any);
        _upperBody: any;
        rotate(degrees: any): void;
    }
}
declare module "lowerbody" {
    export = LowerBody;
    function LowerBody(lowerBody: any, _hips: any): void;
    class LowerBody {
        constructor(lowerBody: any, _hips: any);
        _lowerBody: any;
        rotate(degrees: any): void;
    }
}
declare module "rightleg" {
    export = RightLeg;
    function RightLeg(lowerBody: any, _rThigh: any, _rLowerLeg: any, _rFoot: any): void;
    class RightLeg {
        constructor(lowerBody: any, _rThigh: any, _rLowerLeg: any, _rFoot: any);
        rThighContainer: createjs.Container;
        rLowerContainer: createjs.Container;
        rFootContainer: createjs.Container;
        _lowerBody: any;
        rotateRightFoot(degrees: any): void;
        rotateRightLower(degrees: any): void;
        rotateRightThigh(degrees: any): void;
        instruction(footRotate: any, lowerRotate: any, upperRotate: any): void;
    }
}
declare module "leftleg" {
    export = LeftLeg;
    function LeftLeg(lowerBody: any, _lThigh: any, _lLowerLeg: any, _lFoot: any): void;
    class LeftLeg {
        constructor(lowerBody: any, _lThigh: any, _lLowerLeg: any, _lFoot: any);
        lThighContainer: createjs.Container;
        lLowerContainer: createjs.Container;
        lFootContainer: createjs.Container;
        _lowerBody: any;
        rotateLeftFoot(degrees: any): void;
        rotateLeftLower(degrees: any): void;
        rotateLeftThigh(degrees: any): void;
        instruction(footRotate: any, lowerRotate: any, upperRotate: any): void;
    }
}
declare module "rightarm" {
    export = RightArm;
    function RightArm(upperBody: any, _rUpper: any, _rLower: any, _rHand: any): void;
    class RightArm {
        constructor(upperBody: any, _rUpper: any, _rLower: any, _rHand: any);
        shrugVal: number;
        rUpperContainer: createjs.Container;
        rLowerContainer: createjs.Container;
        rHandContainer: createjs.Container;
        _upperBody: any;
        rotateRightHand(degrees: any): void;
        rotateRightLower(degrees: any): void;
        rotateRightUpper(degrees: any): void;
        shrug(amount: any): void;
        instruction(handRotate: any, lowerRotate: any, upperRotate: any, shrug: any): void;
    }
}
declare module "leftarm" {
    export = LeftArm;
    function LeftArm(upperBody: any, _lUpper: any, _lLower: any, _lHand: any): void;
    class LeftArm {
        constructor(upperBody: any, _lUpper: any, _lLower: any, _lHand: any);
        shrugVal: number;
        lUpperContainer: createjs.Container;
        lLowerContainer: createjs.Container;
        lHandContainer: createjs.Container;
        _upperBody: any;
        rotateLeftHand(degrees: any): void;
        rotateLeftLower(degrees: any): void;
        rotateLeftUpper(degrees: any): void;
        shrug(amount: any): void;
        instruction(handRotate: any, lowerRotate: any, upperRotate: any, shrug: any): void;
    }
}
declare module "@/public/assets/scripts/avatar-library" {
    export = Avatar;
    function Avatar(): void;
    class Avatar {
        _stage: createjs.Stage;
        _hips: any;
        _chest: any;
        _rightLeg: any;
        _leftLeg: any;
        _head: any;
        _rightArm: any;
        _leftArm: any;
        /**
        * Adjusts the size of the set.
        * @param {number} percent - percent to transform.
        * @returns {void}
        */
        transformSet(percent: number): void;
        /**
        * Updates the stage with latest changes
        * @returns {void}
        */
        updateStage(): void;
        /**
        * Gives instructions to the avatar.
        * @param {AvatarInstructions} instrux - The instructions to the avatar.
        * @returns {void}
        */
        go(instrux: AvatarInstructions): void;
        /**
        * Opens and closes the mouth
        * @param {boolean} open - is open
        * @returns {void}
        */
        mouthOpen(open: boolean): void;
        /**
        * Turns the head a direction
        * @param {string} headTurn - must be one of the following: "front", "left", "right"
        * @returns {void}
        */
        headTurn(headTurn: string): void;
        /**
        * Turns the eyes a direction
        * @param {string} headTurn - must be one of the following: "front", "left", "right", "close"
        * @returns {void}
        */
        eyes(eyes: any): void;
        /**
        * Rotates the head
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        rotateHead(degrees: number): void;
        /**
        * Rotates the neck
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        neckRotate(degrees: number): void;
        /**
        * Rotates the hips
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        hipsRotate(degrees: number): void;
        /**
        * Rotates the chest
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        chestRotate(degrees: number): void;
        /**
        * Rotates the left foot
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        footLeftRotate(degrees: number): void;
        /**
        * Rotates the lower left leg
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        legLeftLowerRotate(degrees: number): void;
        /**
        * Rotates the upper left leg
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        legLeftUpperRotate(degrees: number): void;
        /**
        * Rotates the right foot
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        footRightRotate(degrees: number): void;
        /**
        * Rotates the lower right leg
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        legRightLowerRotate(degrees: number): void;
        /**
        * Rotates the upper right leg
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        legRightUpperRotate(degrees: number): void;
        /**
        * Rotates the left hand
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        handLeftRotate(degrees: number): void;
        /**
        * Rotates the lower left arm
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        armLeftLowerRotate(degrees: number): void;
        /**
        * Rotates the upper left arm
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        armLeftUpperRotate(degrees: number): void;
        /**
        * Shrugs the left shoulder
        * @param {number} leftShrug - amount to shrug
        * @returns {void}
        */
        leftShrug(leftShrug: number): void;
        /**
        * Rotates the hright hand
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        handRightRotate(degrees: number): void;
        /**
        * Rotates the lower right arm
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        armRightLowerRotate(degrees: number): void;
        /**
        * Rotates the upper right arm
        * @param {number} degrees - degrees to rotate
        * @returns {void}
        */
        armRightUpperRotate(degrees: number): void;
        /**
        * Shrugs the right shoulder
        * @param {number} degrees - amount to shrug
        * @returns {void}
        */
        rightShrug(rightShrug: any): void;
        /**
        * Shrugs the head
        * @param {number} degrees - amount to shrug
        * @returns {void}
        */
        headShrug(headShrug: any): void;
        /**
        * Destroy the canvas
        * @returns {void}
        */
        destroy(): void;
    }
    namespace Avatar {
        export { AvatarInstructions };
    }
    /**
     * Represents a AvatarInstructions.
     */
    type AvatarInstructions = {
        /**
         * - Opens or closes the mouth
         */
        mouthOpen: boolean;
        /**
         * - Turns the head, can be "front", "left", or "right"
         */
        headTurn: string;
        /**
         * - Controls the eyes, can be "front", "left", "right", or "close"
         */
        eyes: string;
        /**
         * - Rotate the head
         */
        headRotate: number;
        /**
         * - Rotate the neck
         */
        neckRotate: number;
        /**
         * - Rotate the hips
         */
        hipsRotate: number;
        /**
         * - Rotate the chest
         */
        chestRotate: number;
        /**
         * - Rotate the left foot
         */
        footLeftRotate: number;
        /**
         * - Rotate the lower left leg
         */
        legLeftLowerRotate: number;
        /**
         * - Rotate the upper left leg
         */
        legLeftUpperRotate: number;
        /**
         * - Rotate the right foot
         */
        footRightRotate: number;
        /**
         * - Rotate the right lower leg
         */
        legRightLowerRotate: number;
        /**
         * - Rotate the right upper leg
         */
        legRightUpperRotate: number;
        /**
         * - Rotate the left hand
         */
        handLeftRotate: number;
        /**
         * - Rotate the left lower arm
         */
        armLeftLowerRotate: number;
        /**
         * - Rotate the left upper arm
         */
        armLeftUpperRotate: number;
        /**
         * - Rotate the right hand
         */
        handRightRotate: number;
        /**
         * - Rotate the right lower arm
         */
        armRightLowerRotate: number;
        /**
         * - Rotate the right upper arm
         */
        armRightUpperRotate: number;
        /**
         * - Shrug the right shoulder
         */
        rightShrug: number;
        /**
         * - Shrug the left shoulder
         */
        leftShrug: number;
        /**
         * - Shrug the head
         */
        headShrug: number;
    };
}
//# sourceMappingURL=avatar-library.d.ts.map