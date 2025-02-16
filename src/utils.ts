export function wait(value) {
  return new Promise(resolve => setTimeout(resolve, value));
}
