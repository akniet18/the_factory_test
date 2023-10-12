import { createApi } from 'unsplash-js';


export const unsplash  = createApi({
  accessKey: 'ZYN61LLwBmS3Hkm_NA8mItQbmsnVpAv5pt1W4QAi9ug',
  headers: { 'X-Custom-Header': 'foo' }
});