import axios from 'axios';

export const GetGuidelines = () => {
  return axios.get(`http://localhost:8080/guidelines`);
};

export const DeleteGuideline = (guidelineId: number) => {
  return axios.delete(`http://localhost:8080/deleteGuideline`, {
    params: { guidelineId },
  });
};

export const CreateGuideline = (guideline: string) => {
  return axios.post(`http://localhost:8080/addGuideline`, null, {
    params: { guideline },
  });
};
