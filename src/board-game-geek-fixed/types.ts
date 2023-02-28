export interface IBggRank {
  bayesaverage: number;
  friendlyname: string;
  id: number;
  name: string;
  type: string;
  value: number;
}

export interface IBggRatings {
  average: number;
  averageweight: number;
  bayesaverage: number;
  median: number;
  numcomments: number;
  numweights: number;
  owned: number;
  ranks: IBggRank[];
  stddev: number;
  trading: number;
  usersrated: number;
  wanting: number;
  wishing: number;
}
