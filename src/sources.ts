import avatarModel from "./assets/models/avatar.glb";
import labModel from "./assets/models/lab.glb";
import roomModel from "./assets/models/room.glb";
import contactModel from "./assets/models/contact.glb";

import contactTexture from "./media/textures/contact.webp";
import contactShadowTexture from "./media/textures/contact-shadow.webp";
import desktopsTexture from "./media/textures/desktops.webp";
import diffuseMap from "./media/textures/diffuse-map.png";
import faceTexture from "./media/textures/face-spritesheet.png";
import headTexture from "./media/textures/head.webp";
import iconSpritesheet from "./media/textures/icon-spritesheet.webp";
import matcapBlack from "./media/textures/matcap-black.webp";
import matcapGray from "./media/textures/matcap-gray.webp";
import matcapSkin from "./media/textures/matcap-skin.webp";
import matcapWhite from "./media/textures/matcap-white.webp";
import numbersBitmap from "./media/textures/numbers-bitmap.webp";
import roomTexture from "./media/textures/room.webp";
import roomShadowTexture from "./media/textures/room-shadow.webp";
import hologramPlaneTexture from "./media/textures/hologram-plane.webp";

type Source = {
  name: string;
  type: "gltfModel" | "texture";
  path: string;
};

export const sources = [
  //models
  { name: "avatar-model", type: "gltfModel", path: avatarModel },
  { name: "lab-model", type: "gltfModel", path: labModel },
  { name: "room-model", type: "gltfModel", path: roomModel },
  { name: "contact-model", type: "gltfModel", path: contactModel },

  //textures
  { name: "contact-texture", type: "texture", path: contactTexture },
  { name: "contact-shadow-texture", type: "texture", path: contactShadowTexture },
  { name: "desktops-texture", type: "texture", path: desktopsTexture },
  { name: "diffuse-map", type: "texture", path: diffuseMap },
  { name: "face-texture", type: "texture", path: faceTexture },
  { name: "head-texture", type: "texture", path: headTexture },
  { name: "hologram-plane-texture", type: "texture", path: hologramPlaneTexture },
  { name: "icon-spritesheet", type: "texture", path: iconSpritesheet },
  { name: "matcap-black", type: "texture", path: matcapBlack },
  { name: "matcap-gray", type: "texture", path: matcapGray },
  { name: "matcap-skin", type: "texture", path: matcapSkin },
  { name: "matcap-white", type: "texture", path: matcapWhite },
  { name: "numbers-bitmap", type: "texture", path: numbersBitmap },
  { name: "room-texture", type: "texture", path: roomTexture },
  { name: "room-shadow-texture", type: "texture", path: roomShadowTexture },
] as const satisfies Source[];
