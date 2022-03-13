import { Job, Sponsor, Stage, Speaker, Talk } from '@lib/types';

import * as storyblokApi from './cms-providers/storyblok';

let cmsApi: {
  getAllSpeakers: () => Promise<Speaker[]>;
  getAllStages: () => Promise<Stage[]>;
  getAllSponsors: () => Promise<Sponsor[]>;
  getAllJobs: () => Promise<Job[]>;
  getAllTalks: () => Promise<Talk[]>;
};

if (process.env.STORYBLOK_PREVIEW_TOKEN) {
  cmsApi = storyblokApi;
} else {
  cmsApi = {
    getAllSpeakers: () => Promise.resolve([]),
    getAllStages: () => Promise.resolve([]),
    getAllTalks: () => Promise.resolve([]),
    getAllSponsors: () => Promise.resolve([]),
    getAllJobs: () => Promise.resolve([])
  };
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  return cmsApi.getAllSpeakers();
}

export async function getallTalks(): Promise<Talk[]> {
  return await cmsApi.getAllTalks();
}

export async function getAllStages(): Promise<Stage[]> {
  return cmsApi.getAllStages();
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  return cmsApi.getAllSponsors();
}

export async function getAllJobs(): Promise<Job[]> {
  return cmsApi.getAllJobs();
}
