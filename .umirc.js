export default {
  plugins: [
    ['umi-plugin-dva', { immer: true }],
    ['umi-plugin-routes', {
      exclude: [
        /models/,
        /services/,
        /components/,
      ],
    }],
    // ['umi-plugin-dva'],
  ],
  exportStatic: true,
  // outputPath: 'E:/temp/test-chess/',
  // hashHistory:true, //加上这个是在地址栏#
  publicPath: '/static',
  // exportStatic: {},
};
