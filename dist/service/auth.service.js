"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/service/auth.service.ts
var auth_service_exports = {};
__export(auth_service_exports, {
  AuthService: () => AuthService
});
module.exports = __toCommonJS(auth_service_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var userDatabase = [];
var JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_super_segura";
var AuthService = class {
  register(_0) {
    return __async(this, arguments, function* ({ name, email, passwordHash }) {
      const userExist = userDatabase.find((u) => u.email === email);
      if (userExist) {
        throw new Error("E-mail j\xE1 cadastrado!");
      }
      const hashPassword = yield import_bcryptjs.default.hash(passwordHash, 10);
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        passwordHash: hashPassword,
        createdAt: /* @__PURE__ */ new Date()
      };
      userDatabase.push(newUser);
      const _a = newUser, { passwordHash: _ } = _a, userWithoutPassword = __objRest(_a, ["passwordHash"]);
      return userWithoutPassword;
    });
  }
  login(email, passwordPlain) {
    return __async(this, null, function* () {
      const user = userDatabase.find((u) => u.email === email);
      if (!user) {
        throw new Error("Credenciais inv\xE1lidas");
      }
      const isPasswordValid = yield import_bcryptjs.default.compare(passwordPlain, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error("Credenciais inv\xE1lidas");
      }
      const token = import_jsonwebtoken.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
      const _a = user, { passwordHash: _ } = _a, userWithoutPassword = __objRest(_a, ["passwordHash"]);
      return { user: userWithoutPassword, token };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthService
});
