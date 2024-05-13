"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAndCreateNewPlayer = exports.UpdatePlayerDataByID = exports.GetPlayersByID = exports.GetAllPlayers = void 0;
const Player_1 = __importDefault(require("../../../models/Player"));
const response_1 = __importDefault(require("../../response"));
const Character_1 = __importDefault(require("../../../models/Character"));
const Reaction_1 = __importDefault(require("../../../models/Reaction"));
const Chat_1 = __importDefault(require("../../../models/Chat"));
const Emoticon_1 = __importDefault(require("../../../models/Emoticon"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const GetAllPlayers = async (req, res) => {
    try {
        const PLAYERS = await Player_1.default.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] }, include: [
                { model: Character_1.default, as: "characters", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Reaction_1.default, as: "reactions", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Chat_1.default, as: "chats", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Emoticon_1.default, as: "emoticons", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Player_1.default, as: "friends", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
            ] });
        (0, response_1.default)(200, "success get all players", PLAYERS, res);
    }
    catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.GetAllPlayers = GetAllPlayers;
const GetPlayersByID = async (req, res) => {
    try {
        const playerId = req.params.id;
        const PLAYER = await Player_1.default.findByPk(playerId, { attributes: { exclude: ["createdAt", "updatedAt"] }, include: [
                { model: Character_1.default, as: "characters", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Reaction_1.default, as: "reactions", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Chat_1.default, as: "chats", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Emoticon_1.default, as: "emoticons", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
                { model: Player_1.default, as: "friends", through: { attributes: [] }, attributes: { exclude: ["createdAt", "updatedAt"] } },
            ] });
        (0, response_1.default)(200, `success get player with id ${playerId}`, PLAYER, res);
    }
    catch (error) {
        console.error("Gagal mengambil data player:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.GetPlayersByID = GetPlayersByID;
const UpdatePlayerDataByID = async (req, res) => {
    const playerId = req.params.id;
    const playerData = req.body;
    try {
        const findPlayer = await Player_1.default.findByPk(playerId);
        if (findPlayer) {
            findPlayer.update(playerData);
            (0, response_1.default)(203, "player berhasil di update", findPlayer, res);
        }
        else {
            (0, response_1.default)(404, "player tidak dapat ditemukan", [], res);
        }
    }
    catch (error) {
        console.error("Gagal membuat player baru:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.UpdatePlayerDataByID = UpdatePlayerDataByID;
const LoginAndCreateNewPlayer = async (req, res) => {
    const playerData = req.body;
    try {
        if (!playerData.email)
            return res.status(400).json({ message: "email field required" });
        const findPlayer = await Player_1.default.findOne({ where: { email: playerData.email }, attributes: { exclude: ["createdAt", "updatedAt"] } });
        if (findPlayer) {
            // const accessToken = sign({
            //     id: findPlayer.id,
            //   },
            //     process.env.ACCESS_TOKEN_SECRET,
            // )
            // let dataWithToken = {
            //   ...findPlayer.dataValues,
            //   accessToken
            // }
            return (0, response_1.default)(200, "success login player", findPlayer, res);
        }
        else {
            const createPlayer = await Player_1.default.create(playerData);
            // const accessToken = sign({
            //   id: createPlayer.id,
            // },
            //   process.env.ACCESS_TOKEN_SECRET, 
            // )
            return (0, response_1.default)(201, "success membuat player baru", createPlayer, res);
        }
    }
    catch (error) {
        console.error("Gagal membuat player baru:", error);
        return res.status(500).json({ error: error.message });
    }
};
exports.LoginAndCreateNewPlayer = LoginAndCreateNewPlayer;
//# sourceMappingURL=playerController.js.map