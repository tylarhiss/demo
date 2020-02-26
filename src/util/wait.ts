export function wait(timems: number) {
  return new Promise(resolve => {
    window.setTimeout(resolve, timems);
  });
}
