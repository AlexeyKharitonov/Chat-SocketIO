export interface IRule {
  value: number;
  message: string;
}

export interface INicknameFormRules {
  required: string;
  minLength: IRule;
  maxLength: IRule;
}
