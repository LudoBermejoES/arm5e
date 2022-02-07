function getActorsFromTargetedTokens() {
  const targets = game.user.targets;
  if (!targets?.size) {
    return false;
  }

  return Array.from(targets).map((target) => target.document._actor);
}

function getActorFromToken() {
  const tokensControlled = canvas.tokens.controlled;
  if (tokensControlled.length !== 1) {
    ui.notifications.warn(
      game.i18n.localize("arm5e.notification.onlyOneToken")
    );
  }
  return tokensControlled[0].actor;
}

export { getActorsFromTargetedTokens, getActorFromToken };
