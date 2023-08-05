export const isUnary = <Els>(
  _el: Els | undefined,
  argLength: number
): _el is undefined => argLength === 1
