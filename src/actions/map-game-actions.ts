import { Game, Types } from "../types";
import { Action } from "./action";
import { Kill } from "./kill";

type Input = { name: string; actions: Game.Match };

const map = new Map<string, Action> (
  [Kill].map ((Action) => {
    const instance = new Action ();
    return [instance.name, instance];
  }),
);

export const actionMapper = (action: Game.Action): Types.Nullable<Action> => {
  const [command] = action.split (/:/);
  const hasCommand = map.has (command);
  return hasCommand ? map.get (command)! : null;
};

export const mapGameActions = (arg: Input): Game.Log[] =>
  arg.actions.reduce<Game.Log[]> ((acc, action) => {
    const mapper = actionMapper (action.line);
    if (mapper === null) {
      return acc;
    }
    const data = mapper.valid (action.line);
    if (data === null) {
      return acc;
    }
    const result = mapper.parse (data);
    return acc.concat (result);
  }, []);
