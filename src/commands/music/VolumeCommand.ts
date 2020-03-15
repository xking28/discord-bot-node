import {CommandoMessage} from "discord.js-commando";
import {Bot} from "../../Bot";
import {SafeCommand} from "../SafeCommand";

export class VolumeCommand extends SafeCommand {

  public constructor(private bot: Bot) {
    super(bot.client, {
      name: "volume",
      group: "music",
      memberName: "volume",
      description: "Set the volume (0 - 200)",
      examples: ["volume 10", "volume 50"],
      args: [
        {
          key: "volume",
          prompt: "What volume do you want to set?",
          type: "integer",
          min: 0,
          max: 200,
          default: -1
        },
      ]
    });
  }

  public runSafe(message: CommandoMessage, args: any, fromPattern: boolean): Promise<any> | void {
    if (args.volume === -1) {
      return message.reply("Current Volume: " + this.bot.getGuildMusicManager(message.guild).getVolume() * 100);
    }
    this.bot.getGuildMusicManager(message.guild).setVolume(args.volume / 100);
  }
}