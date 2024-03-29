import { Request, Response } from "express";
import Player from "../../models/Player";
import response from "../response";
import Character from "../../models/Character";
import Reaction from "../../models/Reaction";
import Chat from "../../models/Chat";
import Emoticon from "../../models/Emoticon";
  

export const GetAllPlayers = async (req: Request, res: Response) => {
  try {
    const PLAYERS = await Player.findAll({attributes:{exclude:["createdAt","updatedAt"]}, include:[
      {model:Character, as:"characters", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Reaction, as:"reactions", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Chat, as:"chats", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Emoticon, as:"emoticons", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Player, as:"friends", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
    ]});
    response(200, "success get all players", PLAYERS, res);
  } catch (error) {
    console.error("Gagal mengambil data pengguna:", error);
    res.status(500).json({ error: error.message });
  }
};

export const GetPlayersByID = async (req: Request, res: Response) => {
  try {
    const playerId = req.params.id
    const PLAYER = await Player.findByPk(playerId,{attributes:{exclude:["createdAt","updatedAt"]}, include:[
      {model:Character, as:"characters", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Reaction, as:"reactions", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Chat, as:"chats", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Emoticon, as:"emoticons", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
      {model:Player, as:"friends", through:{attributes:[]}, attributes:{exclude:["createdAt","updatedAt"]}},
    ]});
    response(200, `success get player with id ${playerId}`, PLAYER, res);
  } catch (error) {
    console.error("Gagal mengambil data player:", error);
    res.status(500).json({ error: error.message });
  }
};

export const UpdatePlayerDataByID = async (req: Request, res: Response) => {
  const playerId = req.params.id
  const playerData = req.body
  try {
    const findPlayer = await Player.findByPk(playerId)
    if(findPlayer){
      findPlayer.update(playerData)
      response(203, "player berhasil di update", findPlayer, res);
    }else{
      response(404, "player tidak dapat ditemukan", [], res);
    }
  } catch (error) {
      console.error("Gagal membuat player baru:", error);
      res.status(500).json({ error: error.message });
  }
};

export const CreateNewPlayer = async (req: Request, res: Response) => {
  const playerData = req.body
  try {
    const findPlayer = await Player.findOne({where: {email: playerData.email}})
    if(findPlayer) {
      response(200, "success login player", findPlayer, res)
    }else{
      const createPlayer = await Player.create(playerData)
      response(201, "success membuat player baru", createPlayer, res)
    }
  } catch (error) {
      console.error("Gagal membuat player baru:", error);
      res.status(500).json({ error: error.message });
  }
};