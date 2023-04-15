export function truncateWithEllipsis(
  text: string = '0x0000000000000000',
  preserve: number = 4
) {
  return (
    text.substring(0, preserve) + '...' + text.substring(text.length - preserve)
  );
}
