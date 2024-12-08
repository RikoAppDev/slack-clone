export const isTaggedCurrentUser = (text: string, username: string) => {
  const mentionRegex = /(@\w+)/g;
  const mentions = text.match(mentionRegex);

  if (mentions) {
    return mentions.some((mention) => mention.substring(1) === username);
  }

  return false;
};
