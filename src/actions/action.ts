import { Game, Types } from "../types";

export abstract class Action<Parsed extends {} = {}, LogType extends {} = {}> {
  protected constructor (public name: string) {
  }

  public abstract valid (action: Game.Action): Types.Nullable<Parsed>;

  public abstract parse (parsed: Parsed): Game.Log<LogType>;
}
