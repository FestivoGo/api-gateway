"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require("."); // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
const Character_1 = __importDefault(require("./Character"));
const Emoticon_1 = __importDefault(require("./Emoticon"));
const Chat_1 = __importDefault(require("./Chat"));
const Reaction_1 = __importDefault(require("./Reaction"));
class Player extends sequelize_1.Model {
}
Player.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: sequelize_1.DataTypes.STRING,
    nur: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    dinar_raya: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    premium: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    // timestamps
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: "player",
    sequelize: // Nama tabel di database
    _1.sequelize, // Instance Sequelize yang digunakan
});
Player.belongsToMany(Character_1.default, {
    sourceKey: 'id',
    as: 'characters',
    constraints: false,
    through: "PlayerCharacter"
});
Player.belongsToMany(Emoticon_1.default, {
    sourceKey: 'id',
    as: 'emoticons',
    constraints: false,
    through: "PlayerEmoticons"
});
Player.belongsToMany(Chat_1.default, {
    sourceKey: 'id',
    as: 'chats',
    constraints: false,
    through: "PlayerChats"
});
Player.belongsToMany(Reaction_1.default, {
    sourceKey: 'id',
    as: 'reactions',
    constraints: false,
    through: "PlayerReactions"
});
Player.belongsToMany(Player, {
    sourceKey: 'id',
    as: 'friends',
    constraints: false,
    through: "PlayerFriends"
});
exports.default = Player;
//# sourceMappingURL=Player.js.map