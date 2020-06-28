import avatars from "./avatars";

function getRandomAvatar() {
  const keys = Object.keys(avatars);
  const pos = Math.floor(Math.random() * keys.length);
  return keys[pos];
}

export default getRandomAvatar;
