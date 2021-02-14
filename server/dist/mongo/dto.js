"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**This is the class for Data transfer Object that is being used to filter and validate the incoming object */
var codehash_1 = __importDefault(require("../codehash"));
var UserDTO = /** @class */ (function () {
    function UserDTO(obj) {
        this.output = obj.output;
        this.code = obj.code;
        this.input = obj.input;
        this.language = obj.language;
        this.hashcode = codehash_1.default(this.code, this.input);
    }
    UserDTO.prototype.validate = function () {
        if (typeof (this.code) !== "string") {
            return new Error("code should be inside a string.");
        }
        if (typeof (this.input) !== "string") {
            return new Error("input should be inside a string.");
        }
        return null;
    };
    return UserDTO;
}());
exports.default = UserDTO;
