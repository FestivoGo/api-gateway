import { DataTypes, Model,Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, ModelDefined, Optional,
  Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, } from "sequelize";
import { sequelize } from "."; // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
import Character from "./Character";
import Emoticon from "./Emoticon";
import Chat from "./Chat";
import Reaction from "./Reaction";

class Player extends Model {
  declare id: CreationOptional<number>;
  declare username: string;
  declare nur: number;
  declare dinar_raya: number;
  declare premium: boolean;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Player.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: DataTypes.STRING,
    nur: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dinar_raya: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    // timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "player", // Nama tabel di database
    sequelize, // Instance Sequelize yang digunakan
  }
);

Player.belongsToMany(Character, {
  sourceKey: 'id',
  as: 'characters', // this determines the name in `associations`!
  constraints:false,
  through: "PlayerCharacter"
})
Player.belongsToMany(Emoticon, {
  sourceKey: 'id',
  as: 'emoticons', // this determines the name in `associations`!
  constraints:false,
  through: "PlayerEmoticons"
})
Player.belongsToMany(Chat, {
  sourceKey: 'id',
  as: 'chats', // this determines the name in `associations`!
  constraints:false,
  through: "PlayerChats"
})
Player.belongsToMany(Reaction, {
  sourceKey: 'id',
  as: 'reactions', // this determines the name in `associations`!
  constraints:false,
  through: "PlayerReactions"
})
Player.belongsToMany(Player, {
  sourceKey: 'id',
  as: 'friends', // this determines the name in `associations`!
  constraints:false,
  through: "PlayerFriends"
})

export default Player;