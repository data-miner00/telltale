export function truncateWithEllipsis(text: string, preserve: number = 4) {
  return (
    text.substring(0, preserve) + '...' + text.substring(text.length - preserve)
  );
}
