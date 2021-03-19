import { addWebrtcListener } from "./addWebrtcListener/addWebrtcListener";

import { initializeWebRTC } from "./initializeWebRTC/initializeWebRTC.js";

import { sendOffer } from "./sendOffer/sendOffer";

import { createDataChannel } from "./createDataChannel/createDataChannel";

import { settingUpDatachannels } from "./settingUpDatachannels/settingUpDatachannels";

import { createFileDataChannels } from "./createFileDataChannels/createFileDataChannels";

import { saveChunkInMemory } from "./saveChunkInMemory/saveChunkInMemory";

export const alivaWebRTC = {
  peerConnection: null,
  dataChannels: {},
  addWebrtcListener,
  initializeWebRTC,
  sendOffer,
  createDataChannel,
  settingUpDatachannels,
  createFileDataChannels,
  chunks: {},
  saveChunkInMemory,
  chunkSize: 40000,
  numberOfBatchesInMemory: 5000,
};
