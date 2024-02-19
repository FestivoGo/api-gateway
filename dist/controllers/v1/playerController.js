"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginWithGoogle = exports.UpdatePlayerDataByID = exports.GetPlayersByID = exports.GetAllPlayers = void 0;
const Player_1 = __importDefault(require("../../models/Player"));
const response_1 = __importDefault(require("../response"));
const Character_1 = __importDefault(require("../../models/Character"));
const Reaction_1 = __importDefault(require("../../models/Reaction"));
const Chat_1 = __importDefault(require("../../models/Chat"));
const Emoticon_1 = __importDefault(require("../../models/Emoticon"));
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
const LoginWithGoogle = async (req, res) => {
    try {
        return res.json({
            ResultCode: 1,
            UserId: req.user.id,
            Data: req.user
        });
    }
    catch (error) {
        console.error("Gagal login player", error);
        res.status(500).json({ error: error.message });
    }
};
exports.LoginWithGoogle = LoginWithGoogle;
//# sourceMappingURL=playerController.js.map